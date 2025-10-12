export interface Page<T> {
  items: T[];
  nextCursor: string | null; // or pageNumber/pageSize if you choose those
}
