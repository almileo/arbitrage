export interface ArbitrageInterface {
    symbol: string,
    prices:
      {
        binance: number,
        ftx: number,
        poloniex: number,
        kucoin: number,
        bybit: number
      },
    profit: number
}