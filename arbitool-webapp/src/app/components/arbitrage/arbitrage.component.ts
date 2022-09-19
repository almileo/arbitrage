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

  private dataMap: any;
  public data: any = [{ symbol: '', prices: { binance: 0, bybit: 0, kucoin: 0, ftx: 0, poloniex: 0 }, profit: 0 }];
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
    this.crearBase();
 

   }

  ngOnInit() {
    setTimeout(() => {
      if(this.dataBaseCreated) {
        this.getBinance();
        this.getFTX();
        this.getPoloniex();
        this.getBybit();
        this.getKucoin();
      } else {
        console.log('Not Yet');
      }
    }, 5000);

    setTimeout(() => {
      // this.getProfit();
    }, 10000);

  }

  public navigate(path: string) {
    this.routing.navigate(path);
  }

  public getProfit() {
    let values:Array<number> = []
    this.data.map((e) => {
      values = Object.values(e.prices)
      let max = Math.max(...values);
      let min = Math.min(...values)
      // (diferencia precio / precio venta)*100
      const profit = ((max - min) / max) * 100 
      e.profit = profit.toFixed(2)
    })
  }

  getBinance() {
    this.priceService.getBinancePrices().subscribe((res) => {      
      this.binanceData = res;
      const symbolArr = this.binanceData.map(i => i.symbol)
      console.log('symbolArr: ', symbolArr);
      this.formatData(this.binanceData, symbolArr, 'binance')

    });    
  }
  
  getFTX() {
    this.priceService.getFTXPrices().subscribe((res) => {
      let arr: any = res;
      const filtered = arr.result.filter(e => e.type === 'spot')
      filtered.forEach(i => i.symbol = i.name.replace(/\//g, "")); //remove slash from name property and create symbol key
      this.ftxData = filtered ;
      const symbolArr = this.ftxData.map(i => i.symbol)
      this.formatData(this.ftxData, symbolArr, 'ftx');
    })
  }

  getPoloniex() {
    this.priceService.getPoloniexPrices().subscribe((res) => {
      const array: any = res;
      array.forEach(e => e.symbol = e.symbol.replace(/_/, ''));
      this.poloniexData = array;
      const symbolArr = this.poloniexData.map(i => i.symbol)
      this.formatData(this.poloniexData, symbolArr, 'poloniex');
    })
  }
  
  getBybit() {
    this.priceService.getBybitPrices().subscribe((res) => {
      const obj: any = res;
      let arr = obj.result;
      arr.forEach(e => e.price = e.mark_price);
      this.bybitdata = arr;
      const symbolArr = this.bybitdata.map(i => i.symbol)
      this.formatData(this.bybitdata, symbolArr, 'bybit');
    })
  }

  getKucoin() {
    this.priceService.getKucoinPrices().subscribe((res) => {
      const obj: any = res;
      const arr = obj.data.ticker;
      arr.forEach(e => {
        e.symbol = e.symbol.replace(/-/, '');
        e.price = e.last;
      });
      this.kucoinData = arr;
      const symbolArr = this.kucoinData.map(i => i.symbol)
      this.formatData(this.kucoinData, symbolArr, 'kucoin');
    });
  }

  // data.forEach((item) => {
  //   const name = item.name.toString();
  //   const sys_id = item.sys_id.toString();
    
  //   // Check if there's already an entry for this `sys_id` and do nothing in that case:
  //   if (arr.find(cursor => cursor.sys_id === sys_id)) return;
    
  //   // Here we are not reusing a single object, but creating a new one on each iteration:
  //   arr.push({ name, sys_id });
  // });

  creaMap(symbolArr: string[]) {
    let obk = {binance: null, kucoin:null, bybit:null, ftx:null, poloniex:null}
    let map = new Map()
    symbolArr.forEach((i) => {
      map.set(i, obk)
    })
    let array = new Array();
    this.dataMap = map;
    map.forEach((val, key) => {      
      array.push({symbol: key, prices: val})
    })
    this.data = array
    console.log('map: ', map);
    console.log('array: ', array);
    
  }

  crearBase() {
    this.priceService.getBinancePrices().subscribe((res) => {
      let data: any = res;
      const symbolArr = data.map(i => i.symbol)
      this.creaMap(symbolArr);
      this.dataBaseCreated = true;
    })

  }
  formatData(array: Array<any>, symbolArr: string[], exchange: string) {
    
    symbolArr.forEach(i => {
      console.log('i', i)
      let modify = this.data.find((e) => e.symbol === i)
      console.log(`modify ${exchange}`, modify)
      if(modify) {
        let found = array.find((c) => c.symbol === i)
        console.log('found', found)
        let price = parseFloat(found.price)
        console.log('price', price)

          switch (exchange) {
            case 'binance':
              modify.prices.binance = price
              break;
            case 'kucoin':
              modify.prices.kucoin = price
              break;
            case 'ftx':
              modify.prices.ftx = price
              break;
            case 'bybit':
              modify.prices.bybit = price
              break;
            case 'poloniex':
              modify.prices.poloniex = price
              break;
            case 'huobi':
              modify.prices.houbi = price
              break;
          
            // default:
            //   break;
          }
      } else {
        console.log(`PAIR NOT FOUNDED - ${i} at ${exchange}`);
      }
    })

    console.log('this.data: ', this.data);
    
      
  }





 


}
