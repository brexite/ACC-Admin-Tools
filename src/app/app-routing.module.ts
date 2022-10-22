import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RaceResultsToolComponent } from './race-results-tool/race-results-tool.component';
import { EntrylistEditorComponent } from './entrylist-editor/entrylist-editor.component';
import { RaceCreationToolComponent } from './race-creation-tool/race-creation-tool.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'race-results', component: RaceResultsToolComponent },
  { path: 'race-results-tool', redirectTo: '/race-results', pathMatch: 'full' },
  { path: 'race-creation', component: RaceCreationToolComponent },
  { path: 'entrylist-editor', component: EntrylistEditorComponent }
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
