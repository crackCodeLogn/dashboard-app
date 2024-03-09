import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LineChartComponent } from './charting/line-chart/line-chart.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgApexchartsModule } from "ng-apexcharts";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { MarketComponent } from "./market/market.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorComponent } from './tutor/tutor.component';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule, TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseSimulatorComponent } from './expense-simulator/expense-simulator.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'market/:ticker', component: MarketComponent },
  { path: 'tutor', component: TutorComponent },
  { path: 'expense-simulator', component: ExpenseSimulatorComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    NavBarComponent,
    MarketComponent,
    DashboardComponent,
    TutorComponent,
    ExpenseSimulatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
  ],
  providers: [BsDatepickerConfig, TimepickerConfig, {
    provide: LocationStrategy, useClass: PathLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
