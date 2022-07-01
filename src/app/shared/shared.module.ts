import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RaceResultsToolComponent } from '../race-results-tool/race-results-tool.component';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { EntrylistEditorComponent } from '../entrylist-editor/entrylist-editor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    HomeComponent,
    RaceResultsToolComponent,
    EntrylistEditorComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    RouterModule,
    DragDropModule,
  ],
  exports: [
    CommonModule,
    FormsModule,  
    ReactiveFormsModule,
    HeaderComponent,
  ],
  providers: [
  ]
})
export class SharedModule { }
