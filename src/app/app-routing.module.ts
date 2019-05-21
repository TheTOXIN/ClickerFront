import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
    { path: '', component: AppComponent, pathMatch: 'full' },
    { path: 'clicker', loadChildren: './clicker/clicker.module#ClickerPageModule' },
    { path: 'connect', loadChildren: './connect/connect.module#ConnectPageModule' },
    { path: 'start', loadChildren: './start/start.module#StartPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
