import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JustgageModule } from 'angular2-justgage';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { AlarmasComponent } from './pages/alarmas/alarmas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TagsComponent } from './pages/tags/tags.component';
import { AppRoutingModule } from './app-routing.module';
import { GaugeComponent } from './componentes/gauge/gauge.component';
import { ChartComponent } from './componentes/chart/chart.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LimitesComponent } from './pages/limites/limites.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { Monitor2Component } from './pages/monitor2/monitor2.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    MainComponent,
    MonitorComponent,
    AlarmasComponent,
    UsuariosComponent,
    TagsComponent,
    GaugeComponent,
    ChartComponent,
    ReportesComponent,
    LimitesComponent,
    Monitor2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JustgageModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
