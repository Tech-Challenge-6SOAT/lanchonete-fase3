export type HttpRequest<T = any> = {
  body: T
  params?: T
  query?: T
}
