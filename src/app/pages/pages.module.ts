import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { JustgageModule } from 'angular2-justgage';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


// Componentes
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { Monitor2Component } from './monitor2/monitor2.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LimitesComponent } from './limites/limites.component';
import { TagsComponent } from './tags/tags.component';
import { AlarmasComponent } from './alarmas/alarmas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RouterModule } from '@angular/router';
import { GaugeComponent } from '../componentes/gauge/gauge.component';
import { ChartComponent } from '../componentes/chart/chart.component';
import { ChartWideComponent } from '../componentes/chart-wide/chart-wide.component';




@NgModule({
    declarations: [
        PagesComponent,
        HeaderComponent,
        SidebarComponent,
        GaugeComponent,
        ChartComponent,
        ChartWideComponent,
        AlarmasComponent,
        UsuariosComponent,
        TagsComponent,
        LimitesComponent,
        ReportesComponent,
        MonitorComponent,
        Monitor2Component,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        JustgageModule,
        ChartsModule,
        BrowserModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: []
  })
  export class PagesModule { }