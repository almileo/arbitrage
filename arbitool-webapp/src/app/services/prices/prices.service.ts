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
    return this.http.get(ConstantURL.binance.url);
  }

  public getKucoinPrices() {
    return this.http.get(ConstantURL.kucoin.url);
  }

  public getBybitPrices() {
    return this.http.get(ConstantURL.bybit.url);
  }

  public getPoloniexPrices() {
    return this.http.get(ConstantURL.poloniex.url);
  }

  public getFTXPrices() {
    return this.http.get(ConstantURL.ftx.url);
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
  