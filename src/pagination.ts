/**
 * Pagination helpers for SpatialFlow SDK.
 *
 * Provides async iterators for paginated API responses.
 */

export interface PaginateOptions<T, R> {
  fetchPage: (offset: number, limit: number) => Promise<R>;

  /**
   * @default (r) => r.data?.results ?? r.results ?? []
   */
  extractItems?: (response: R) => T[];

  /**
   * @default (r) => r.data?.count ?? r.count ?? 0
   */
  extractCount?: (response: R) => number;

  /**
   * @default (r) => r.data?.next ?? r.next ?? null
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
 *     client.geofences.appsGeofencesApiListGeofences({ offset, limit }),
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
 *     client.geofences.appsGeofencesApiListGeofences({ offset, limit }),
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

function defaultExtractItems<T>(response: unknown): T[] {
  const r = response as Record<string, unknown>;
  // Handle axios response shape (data.results) or direct shape (results)
  if (r.data && typeof r.data === "object") {
    const data = r.data as Record<string, unknown>;
    if (Array.isArray(data.results)) return data.results as T[];
  }
  if (Array.isArray(r.results)) return r.results as T[];
  return [];
}

function defaultExtractCount(response: unknown): number {
  const r = response as Record<string, unknown>;
  if (r.data && typeof r.data === "object") {
    const data = r.data as Record<string, unknown>;
    if (typeof data.count === "number") return data.count;
  }
  if (typeof r.count === "number") return r.count;
  return 0;
}

function defaultExtractNext(response: unknown): string | null | undefined {
  const r = response as Record<string, unknown>;
  if (r.data && typeof r.data === "object") {
    const data = r.data as Record<string, unknown>;
    if (typeof data.next === "string" || data.next === null) {
      return data.next as string | null;
    }
  }
  if (typeof r.next === "string" || r.next === null) {
    return r.next as string | null;
  }
  return undefined;
}
