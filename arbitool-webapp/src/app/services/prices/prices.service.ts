import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantURL } from 'src/assets/constants/url';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(
    private http: HttpClient
  ) { }
  
  public getBinancePrices() {
    return this.http.get(ConstantURL.binance.url).toPromise();
  }

  public getKucoinPrices() {
    return this.http.get(ConstantURL.kucoin.url).toPromise();
  }

  public getBybitPrices() {
    return this.http.get(ConstantURL.bybit.url).toPromise();
  }

  public getPoloniexPrices() {
    return this.http.get(ConstantURL.poloniex.url).toPromise();
  }

  public getFTXPrices() {
    return this.http.get(ConstantURL.ftx.url).toPromise();
  }

  public getKrakenPrices() {
    return this.http.get(ConstantURL.kraken.url).toPromise();
  }

  public getCoinbasePrices() {
    return this.http.get(ConstantURL.coinbase.url).toPromise();
  }

  public getCexPrices() {
    return this.http.get(ConstantURL.cex.url).toPromise();
  }

  public getGateIoPrices() {
    return this.http.get(ConstantURL.gate_io.url).toPromise();
  }

  public getHuobiPrices() {
    return this.http.get(ConstantURL.houbi.url).toPromise();
  }

  public getHitbtcPrices() {
    return this.http.get(ConstantURL.hitbtc.url).toPromise();
  }

  public getBitfinexPrices() {
    return this.http.get(ConstantURL.bitfinex.url).toPromise();
  }

  public getBittrexPrices() {
    return this.http.get(ConstantURL.bittrex.url).toPromise();
  }

  public getUpbitPrices() {
    return this.http.get(ConstantURL.upbit.url).toPromise();
  }

  public getMexcPrices() {
    return this.http.get(ConstantURL.mexc.url).toPromise();
  }

  public getCoinexrices() {
    return this.http.get(ConstantURL.coinex.url).toPromise();
  }
  

}




// const  = async (auth, googleSheets, spreadsheetId) => {
//   await fetch()
//   .then((res) => {
//       return res.json();
//   })
//   .then(async (data) => {
//       const googleData = [];

//       // console.log('binance: ', data);
//       data.forEach((e) => {
//           googleData.push([e.symbol, e.price]);
//           console.log('e: ', e);
//       })
//       console.log('googleData: ', googleData);
//       await googleSheets.spreadsheets.values.append({
//           auth,
//           spreadsheetId,
//           range: "Binance",
//           valueInputOption: "USER_ENTERED",
//           resource: {
//               values: [googleData]
//           }
//       })
//   })
  
// }

// const getKucoinPrices = async () => {
//   await fetch()
//   .then((res) => {
//       return res.json();
//   })
//   .then((data) => {
//       console.log('Kucoin: ', data);
//   })
// }

// const getBybitPrices = async () => {
//   await fetch()
//   .then((res) => {
//       return res.json();
//   })
//   .then((data) => {
//       console.log('Bybit: ', data.result); 
//   })
  