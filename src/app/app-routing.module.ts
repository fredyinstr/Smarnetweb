import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MainComponent } from './pages/main/main.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { AlarmasComponent } from './pages/alarmas/alarmas.component';
import { TagsComponent } from './pages/tags/tags.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LimitesComponent } from './pages/limites/limites.component';
import { Monitor2Component } from './pages/monitor2/monitor2.component';

const app_routes: Routes = [
    { path: '', component: MonitorComponent},
    { path: 'monitor', component: MonitorComponent},
    { path: 'monitor2', component: Monitor2Component},
    { path: 'alarmas', component: AlarmasComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'reportes', component: ReportesComponent},
    { path: 'tags', component: TagsComponent},
    { path: 'limites', component: LimitesComponent},
    { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
