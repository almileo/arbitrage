import { Component, OnInit, ViewChild } from '@angular/core';
import { PricesService } from 'src/app/services/prices/prices.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoutingService } from 'src/app/services/routing/routing.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {
  public binanceData: any;
  public kucoinData: any;
  public bybitData: any;
  public poloniexData: any;
  public ftxData: any;
  
  displayedColumns: string[] = ['symbol', 'price'];
 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  constructor(
    private priceService: PricesService,
    public routing: RoutingService
  ) {   }

  ngOnInit() {
    // this.updatePrices();
    // this.getBinance();
    // this.getKucoin();
    // this.getBybit();
    // this.getPoloniex();
    // this.getFTX();
  }

  updatePrices() {
    
    setInterval(() => {
      // this.getBinance();
      // this.getKucoin();
      // this.getBybit();
      // this.getPoloniex();
      // this.getFTX();
    }, 5000);
  }

  public navigate(path: string) {
    this.routing.navigate(path);
  }


  // getBinance() {
  //   this.priceService.getBinancePrices().subscribe((res) => {      
  //     this.binanceData = res;
  //     console.log('binance: ', this.binanceData);
      
  //   });    
  // }

  // getKucoin() {
  //   this.priceService.getKucoinPrices().subscribe((res) => {      
  //     this.kucoinData = res
  //     console.log('kucoin: ', this.kucoinData.data.ticker);      
  //   });    
  // }

  // getBybit() {
  //   this.priceService.getBybitPrices().subscribe((res) => {      
  //     this.bybitData = res
  //     console.log('bybit: ', this.bybitData.result);
  //   });    
  // }

  // getPoloniex() {
  //   this.priceService.getPoloniexPrices().subscribe((res) => {      
  //     this.poloniexData = res
  //     console.log('poloniex: ', this.poloniexData);
  //   });    
  // }
  
  // getFTX() {
  //   this.priceService.getFTXPrices().subscribe((res) => {
  //     this.ftxData = res;
  //     console.log('FTX: ', this.ftxData.result);
      
  //   })
  // }


}
