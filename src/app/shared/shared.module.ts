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
import { ResetConfirmationComponent } from './modals/reset-confirmation/reset-confirmation.component';
import { TextareaModalComponent } from './modals/textarea-modal/textarea-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    RaceResultsToolComponent,
    EntrylistEditorComponent,
    HeaderComponent,
    ResetConfirmationComponent,
    TextareaModalComponent
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
    ResetConfirmationComponent,
    TextareaModalComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
