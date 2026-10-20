/**
 * Pagination helpers for SpatialFlow SDK.
 *
 * Provides async iterators for paginated API responses.
 */

export interface PaginateOptions<T, R> {
  fetchPage: (offset: number, limit: number) => Promise<R>;

  /**
   * @default the response body's array, or its `results`, `geofences`,
   * `workflows`, `webhooks` or `deliveries` array
   */
  extractItems?: (response: R) => T[];

  /**
   * @default the body's `count`, `total_count` or `total`
   */
  extractCount?: (response: R) => number;

  /**
   * A falsy return ends the loop. The default reads `next`,
   * `pagination.has_more`, `page * page_size < total` or the `x-has-more`
   * header, whichever the response has, and otherwise relies on a short page
   * ending the loop.
   */
  extractNext?: (response: R) => string | null | undefined;

  /**
   * @default 100
   */
  limit?: number;
}

/**
 * Async iterator that automatically paginates through all results.
 *
 * @example
 * ```typescript
 * import { paginate } from "@spatialflow/sdk";
 *
 * // Iterate through all geofences
 * for await (const geofence of paginate({
 *   fetchPage: (offset, limit) =>
 *     client.geofences.appsGeofencesApiListGeofences(limit, offset),
 * })) {
 *   console.log(geofence.name);
 * }
 * ```
 */
export async function* paginate<T, R = unknown>(
  options: PaginateOptions<T, R>
): AsyncGenerator<T, void, undefined> {
  const {
    fetchPage,
    extractItems = defaultExtractItems,
    extractCount = defaultExtractCount,
    extractNext = defaultExtractNext,
    limit = 100,
  } = options;

  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchPage(offset, limit);
    const items = extractItems(response);
    const nextUrl = extractNext(response);

    for (const item of items) {
      yield item;
    }

    // Use falsy check to handle null, undefined, and empty string
    if (!nextUrl || items.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }
}

/**
 * Collect all items from a paginated endpoint into an array.
 *
 * @example
 * ```typescript
 * import { collectAll } from "@spatialflow/sdk";
 *
 * const allGeofences = await collectAll({
 *   fetchPage: (offset, limit) =>
 *     client.geofences.appsGeofencesApiListGeofences(limit, offset),
 * });
 * console.log(`Found ${allGeofences.length} geofences`);
 * ```
 */
export async function collectAll<T, R = unknown>(
  options: PaginateOptions<T, R>
): Promise<T[]> {
  const items: T[] = [];
  for await (const item of paginate(options)) {
    items.push(item);
  }
  return items;
}

const LIST_KEYS = ["results", "geofences", "workflows", "webhooks", "deliveries"];

// A response is an Axios response ({ data, headers }) or the bare body.
function bodyOf(response: unknown): unknown {
  const r = response as Record<string, unknown> | null;
  return r && typeof r === "object" && "data" in r ? r.data : response;
}

function defaultExtractItems<T>(response: unknown): T[] {
  const body = bodyOf(response);
  if (Array.isArray(body)) return body as T[];
  const record = (body ?? {}) as Record<string, unknown>;
  for (const key of LIST_KEYS) {
    if (Array.isArray(record[key])) return record[key] as T[];
  }
  return [];
}

function defaultExtractCount(response: unknown): number {
  const record = (bodyOf(response) ?? {}) as Record<string, unknown>;
  for (const key of ["count", "total_count", "total"]) {
    if (typeof record[key] === "number") return record[key] as number;
  }
  return 0;
}

/**
 * The list endpoints signal the end differently: a `next` link, a
 * `pagination.has_more` flag, `page`/`page_size`/`total`, or an `X-Has-More`
 * header. Geofences signal nothing, so a full page is taken to mean more.
 */
function defaultExtractNext(response: unknown): string | null {
  const body = bodyOf(response);
  const record = (body ?? {}) as Record<string, unknown>;

  if (typeof record.next === "string") return record.next;
  if (record.next === null) return null;

  const pagination = record.pagination as Record<string, unknown> | undefined;
  if (typeof pagination?.has_more === "boolean") {
    return pagination.has_more ? "more" : null;
  }

  if (
    typeof record.page === "number" &&
    typeof record.page_size === "number" &&
    typeof record.total === "number"
  ) {
    return record.page * record.page_size < record.total ? "more" : null;
  }

  const headers = (response as { headers?: Record<string, unknown> }).headers;
  const hasMore = headers?.["x-has-more"];
  if (hasMore !== undefined) return String(hasMore) === "true" ? "more" : null;

  return "more";
}
