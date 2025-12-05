import { describe, it, expect } from "vitest";
import { paginate, collectAll } from "../src/pagination";

describe("paginate", () => {
  it("should yield all items across pages", async () => {
    let pageIndex = 0;
    const pages = [
      { data: { results: [{ id: 1 }, { id: 2 }], count: 5, next: "?offset=2" } },
      { data: { results: [{ id: 3 }, { id: 4 }], count: 5, next: "?offset=4" } },
      { data: { results: [{ id: 5 }], count: 5, next: null } },
    ];

    const fetchPage = async (offset: number, limit: number) => {
      return pages[pageIndex++];
    };

    const items: Array<{ id: number }> = [];
    for await (const item of paginate<{ id: number }>({ fetchPage, limit: 2 })) {
      items.push(item);
    }

    expect(items).toHaveLength(5);
    expect(items[0].id).toBe(1);
    expect(items[4].id).toBe(5);
  });

  it("should handle empty results", async () => {
    const fetchPage = async () => ({
      data: { results: [], count: 0, next: null },
    });

    const items: unknown[] = [];
    for await (const item of paginate({ fetchPage })) {
      items.push(item);
    }

    expect(items).toHaveLength(0);
  });

  it("should handle single page", async () => {
    const fetchPage = async () => ({
      data: { results: [{ id: 1 }, { id: 2 }], count: 2, next: null },
    });

    const items: Array<{ id: number }> = [];
    for await (const item of paginate<{ id: number }>({ fetchPage })) {
      items.push(item);
    }

    expect(items).toHaveLength(2);
  });

  it("should respect provided limit", async () => {
    const capturedLimits: number[] = [];

    const fetchPage = async (offset: number, limit: number) => {
      capturedLimits.push(limit);
      return { data: { results: [], count: 0, next: null } };
    };

    for await (const _ of paginate({ fetchPage, limit: 50 })) {
      // consume iterator
    }

    expect(capturedLimits).toEqual([50]);
  });

  it("should use default limit of 100", async () => {
    const capturedLimits: number[] = [];

    const fetchPage = async (offset: number, limit: number) => {
      capturedLimits.push(limit);
      return { data: { results: [], count: 0, next: null } };
    };

    for await (const _ of paginate({ fetchPage })) {
      // consume iterator
    }

    expect(capturedLimits).toEqual([100]);
  });

  it("should stop when next is empty string", async () => {
    let callCount = 0;
    const fetchPage = async () => {
      callCount++;
      return {
        data: {
          results: [{ id: callCount }],
          count: 10,
          next: callCount === 1 ? "" : "should_not_reach",
        },
      };
    };

    const items: Array<{ id: number }> = [];
    for await (const item of paginate<{ id: number }>({ fetchPage })) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
    expect(callCount).toBe(1);
  });

  it("should handle direct response shape (no data wrapper)", async () => {
    const fetchPage = async () => ({
      results: [{ id: 1 }],
      count: 1,
      next: null,
    });

    const items: Array<{ id: number }> = [];
    for await (const item of paginate<{ id: number }>({ fetchPage })) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(1);
  });

  it("should allow custom extractors", async () => {
    const fetchPage = async () => ({
      items: [{ name: "custom" }],
      hasMore: false,
    });

    const items: Array<{ name: string }> = [];
    for await (const item of paginate<{ name: string }>({
      fetchPage,
      extractItems: (r) => (r as { items: Array<{ name: string }> }).items,
      extractNext: () => null,
    })) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("custom");
  });
});

describe("collectAll", () => {
  it("should collect all items into an array", async () => {
    let pageIndex = 0;
    const pages = [
      { data: { results: [{ id: 1 }, { id: 2 }], next: "?offset=2" } },
      { data: { results: [{ id: 3 }], next: null } },
    ];

    const fetchPage = async () => pages[pageIndex++];

    const items = await collectAll<{ id: number }>({ fetchPage, limit: 2 });

    expect(items).toHaveLength(3);
    expect(items.map((i) => i.id)).toEqual([1, 2, 3]);
  });

  it("should return empty array for no results", async () => {
    const fetchPage = async () => ({
      data: { results: [], next: null },
    });

    const items = await collectAll({ fetchPage });

    expect(items).toEqual([]);
  });
});
