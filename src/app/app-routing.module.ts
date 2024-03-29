import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RaceResultsToolComponent } from './race-results-tool/race-results-tool.component';
import { EntrylistEditorComponent } from './entrylist-editor/entrylist-editor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'race-results-tool', component: RaceResultsToolComponent },
  { path: 'entrylist-editor', component: EntrylistEditorComponent }
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
