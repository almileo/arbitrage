import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArbitrageComponent } from '../../components/arbitrage/arbitrage.component';
import { ExchangesComponent } from '../../components/exchanges/exchanges.component';

const routes = [
  { path: '', component: ArbitrageComponent},
  { path: 'exchanges', component: ExchangesComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
