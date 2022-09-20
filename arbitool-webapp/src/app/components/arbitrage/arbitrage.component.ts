  // Para comprobar el margen de ganancia, lo único que debes hacer es dividir la utilidad entre el precio de venta, así que en tu hoja de Excel colócate en la celda F2 e ingresa la fórmula: =E2/D2 da clic y arrastra la fórmula, te darás cuenta de que saldrá la misma cantidad que en la columna C,

import { Component, OnInit } from '@angular/core';
import { PricesService } from 'src/app/services/prices/prices.service';
import { RoutingService } from 'src/app/services/routing/routing.service';

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.css']
})
export class ArbitrageComponent implements OnInit {

  public data: Array<any> = [];
  displayedColumns: string[] = ['symbol', 'binance', 'kucoin', 'bybit', 'poloniex', 'ftx', 'profit'];
  profit: number = 0;
  binanceData: any;
  ftxData: any;
  poloniexData: any;
  bybitdata: any;
  kucoinData: any;
  dataBaseCreated: boolean = false;

  constructor(
    public routing: RoutingService,
    private priceService: PricesService
  ) {
 

   }

  async ngOnInit() {
    const exchangeData:any = await Promise.all([
      this.priceService.getBinancePrices(),
      this.priceService.getKucoinPrices(),
      this.priceService.getBybitPrices(),
      this.priceService.getFTXPrices(),
      this.priceService.getPoloniexPrices(),
    ]);
    console.log('exchangeData: ', exchangeData);
    
    const binanceDataArr = exchangeData[0] as any[];
    const kucoinDataArr = exchangeData[1].data.ticker as any[];
    const bybitDataArr = exchangeData[2].result as any[];
    const ftxDataArr = exchangeData[3].result as any[];
    const poloniexDataArr = exchangeData[4] as any[];

    kucoinDataArr.forEach(e => {
            e.symbol = e.symbol.replace(/-/, '');
            e.price = e.last;
          })
    ftxDataArr.forEach(i => i.symbol = i.name.replace(/\//g, ""));
    poloniexDataArr.forEach(e => e.symbol = e.symbol.replace(/_/, ''))
    bybitDataArr.forEach(e => {
      e.price = e.last_price
    })
    console.log('bybitDataArr: ', bybitDataArr);
    const binanceObj = {};
    const kucoinObj = {};
    const bybitObj = {};
    const ftxObj = {};
    const poloniexObj = {};
    const houbiObj = {};
    for(const key of binanceDataArr){
      binanceObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of kucoinDataArr){
      kucoinObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of bybitDataArr){
      bybitObj[key.symbol] ? bybitObj[key.symbol]= 0 : bybitObj[key.symbol]= parseFloat(key.price);
    }
    for(const key of ftxDataArr){
      ftxObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of poloniexDataArr){
      poloniexObj[key.symbol] = parseFloat(key.price);
    }
    
    this.data = [];
    binanceDataArr.forEach((elem) => {
      const s = elem.symbol;
      const p = { 
        binance: binanceObj[s], 
        kucoin: kucoinObj[s] ? kucoinObj[s] : null, 
        bybit: bybitObj[s] ? bybitObj[s] : null, 
        ftx: ftxObj[s] ? ftxObj[s] : null , 
        poloniex: poloniexObj[s] ? poloniexObj[s] : null 
      }
      this.data.push({symbol: s, prices: p})
    })
    this.getProfit();
    console.log('this.data: ', this.data);
    // this.data.sort((a,b) => console.log('a: a'))

  }

  public navigate(path: string) {
    this.routing.navigate(path);
  }

  public getProfit() {
    let values:Array<number> = []
    this.data.map((e) => {
      values = Object.values(e.prices)
      console.log('values: ', values);
      let max = Math.max(...values);
      console.log('max: ', max);
      let min = Math.min(...values.filter(e => e != null))
      console.log('min: ', min);
      // (price difference / selling price)*100
      const profit = ((max - min) / max) * 100 
      e.profit = profit.toFixed(2)
    })

    this.data.sort((a,b) => b.profit - a.profit)
  }
    
      
  





 


}
