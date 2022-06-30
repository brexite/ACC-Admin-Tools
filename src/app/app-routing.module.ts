import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EntrylistToolComponent } from './entrylist-tool/entrylist-tool.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'entrylist-tool', component: EntrylistToolComponent }
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
