import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ArbitrageComponent } from './components/arbitrage/arbitrage.component';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { AppRoutingModule } from './modules/routes/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ExchangesComponent,
    ArbitrageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
