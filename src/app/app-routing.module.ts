import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
    { path: '', component: AppComponent, pathMatch: 'full' },
    { path: 'clicker', loadChildren: './pages/clicker/clicker.module#ClickerPageModule' },
    { path: 'connect', loadChildren: './pages/connect/connect.module#ConnectPageModule' },
    { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
