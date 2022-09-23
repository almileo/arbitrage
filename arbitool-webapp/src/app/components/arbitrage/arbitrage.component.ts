  // Para comprobar el margen de ganancia, lo único que debes hacer es dividir la utilidad entre el precio de venta, así que en tu hoja de Excel colócate en la celda F2 e ingresa la fórmula: =E2/D2 da clic y arrastra la fórmula, te darás cuenta de que saldrá la misma cantidad que en la columna C,
  // ETHBEARUSDT quitar este tipo de pares de la lista

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PricesService } from 'src/app/services/prices/prices.service';
import { RoutingService } from 'src/app/services/routing/routing.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.css']
})
export class ArbitrageComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public data: Array<any> = [];
  displayedColumns: string[] = [
    'symbol', 'binance', 'kucoin', 'bybit', 'poloniex', 'ftx', 'hitbtc','huobi','coinex','kraken','gateio', 'bittrex', 'bitfinex', 'mexc', 'profit'
  ];
  dataSource: MatTableDataSource<any>

  profit: number = 0;
  binanceData: any;
  ftxData: any;
  poloniexData: any;
  bybitdata: any;
  kucoinData: any;
  dataBaseCreated: boolean = false;
  isDataExchangeLoaded: boolean = false;

  constructor(
    public routing: RoutingService,
    private priceService: PricesService
  ) {
    this.dataSource = new MatTableDataSource(this.data);
   }

  async ngOnInit() {
    const exchangeData:any = await Promise.all([
      this.priceService.getBinancePrices(),
      this.priceService.getKucoinPrices(),
      this.priceService.getBybitPrices(),
      this.priceService.getFTXPrices(),
      this.priceService.getPoloniexPrices(),
      this.priceService.getBittrexPrices(),
      this.priceService.getCoinbasePrices(),
      this.priceService.getCoinexrices(),
      this.priceService.getGateIoPrices(),
      this.priceService.getHitbtcPrices(),
      this.priceService.getHuobiPrices(),
      this.priceService.getKrakenPrices(),
      this.priceService.getMexcPrices(),
      this.priceService.getUpbitPrices(),
      this.priceService.getBitfinexPrices(),
      // this.priceService.getCexPrices(),
    ]);
    console.log('exchangeData: ', exchangeData);
    
    const binanceDataArr = exchangeData[0] as any[];
    const kucoinDataArr = exchangeData[1].data.ticker as any[];
    const bybitDataArr = exchangeData[2].result as any[];
    const ftxDataArr = exchangeData[3].result as any[];
    const poloniexDataArr = exchangeData[4] as any[];
    const bittrexDataArr = exchangeData[5] as any[];
    const coinbaseDataArr = exchangeData[6] as any[];
    const coinexResponse = exchangeData[7].data.ticker as any[];
    const gateIoDataArr = exchangeData[8] as any[];
    const hitbtcDataArr = exchangeData[9] as any[];
    const huobiDataArr = exchangeData[10].data as any[];
    const krakenDataArr = exchangeData[11].result as any[];
    const mexcDataArr = exchangeData[12].data as any[];
    const upbitDataArr = exchangeData[13] as any[];

    // console.log('krakenDataArr: ', krakenDataArr);
    // console.log('upbitDataArr: ', upbitDataArr);
    
    kucoinDataArr.forEach(e => {
      e.symbol = e.symbol.replace(/-/, '');
      e.price = e.last;
    })
    bybitDataArr.forEach(e => e.price = e.last_price);
    ftxDataArr.forEach(i => i.symbol = i.name.replace(/\//g, ""));
    poloniexDataArr.forEach(e => e.symbol = e.symbol.replace(/_/, ''))
    bittrexDataArr.forEach(e => {
      e.symbol = e.symbol.replace(/-/, '');
      e.price = e.lastTradeRate
    })
    gateIoDataArr.forEach(e => {
      e.symbol = e.currency_pair.replace(/_/, '');
      e.price = e.last
    })
    hitbtcDataArr.forEach(e => e.price = e.last);
    huobiDataArr.forEach(e => {
      e.symbol = e.symbol.toUpperCase();
      e.price = e.close;
    })
    mexcDataArr.forEach(e => {
      e.symbol = e.symbol.replace(/_/, '');
      e.price = e.last
    })
    const coinexDataArr = Object.entries(coinexResponse).map(entry =>{
      entry[1].symbol = entry[0];
      entry[1].price = entry[1].last;
      return entry[1]
    });
    

    const binanceObj = {};
    const kucoinObj = {};
    const bybitObj = {};
    const ftxObj = {};
    const poloniexObj = {};
    const bittrexObj = {};
    const gateIoObj = {};
    const hitbtcObj = {};
    const houbiObj = {};
    const mexcObj = {};
    const coinexObj = {};

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
    for(const key of bittrexDataArr){
      bittrexObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of gateIoDataArr){
      gateIoObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of hitbtcDataArr){
      hitbtcObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of huobiDataArr){
      houbiObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of mexcDataArr){
      mexcObj[key.symbol] = parseFloat(key.price);
    }
    for(const key of coinexDataArr){
      coinexObj[key.symbol] = parseFloat(key.price);
    }
    
    this.data = [];
    binanceDataArr.forEach((elem) => {
      const s = elem.symbol;
      const p = { 
        binance: binanceObj[s], 
        kucoin: kucoinObj[s] ? kucoinObj[s] : null, 
        bybit: bybitObj[s] ? bybitObj[s] : null, 
        ftx: ftxObj[s] ? ftxObj[s] : null, 
        poloniex: poloniexObj[s] ? poloniexObj[s] : null,
        bittrex: bittrexObj[s] ? bittrexObj[s] : null,
        gateIo: gateIoObj[s] ? gateIoObj[s] : null,
        hitbtc: hitbtcObj[s] ? hitbtcObj[s] : null,
        huobi: houbiObj[s] ? houbiObj[s] : null,
        mexc: mexcObj[s] ? mexcObj[s] : null,
        coinex: coinexObj[s] ? coinexObj[s] : null
      }
      this.data.push({symbol: s, prices: p})
      this.isDataExchangeLoaded = true;
    })
    this.getProfit();

    this.dataSource.data = this.data

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public navigate(path: string) {
    this.routing.navigate(path);
  }

  public getProfit() {
    let values:Array<number> = []
    this.data.map((e) => {
      values = Object.values(e.prices)
      let max = Math.max(...values);
      let min = Math.min(...values.filter(e => e != null))
      // (price difference / selling price)*100
      const profit = ((max - min) / max) * 100 
      console.log('profit: ', profit + ' ' + typeof(profit));
      
      e.profit = parseFloat(profit.toFixed(2))
    })
    console.log('this.data: ', typeof(this.data[0].profit));
    
    const result = this.data.filter(e => e.profit >= 0.01 && e.profit <= 55);
    this.data = result;
    this.data.sort((a,b) => b.profit - a.profit);
    console.log('result: ', result);
  }
    
      
  





 


}
