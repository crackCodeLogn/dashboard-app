export interface IMarketData {
  name: string,
  symbol: string,
  data?: IData[];
}

export interface IData {
  date: string,
  price: string
}
