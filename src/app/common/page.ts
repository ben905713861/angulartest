export type PageQuery = {
  page: number,
  limit: number,
}

export type PageReqult<T> = {
  rows: T[],
  total: number,
}
