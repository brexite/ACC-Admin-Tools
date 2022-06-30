import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EntrylistToolComponent } from '../entrylist-tool/entrylist-tool.component';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    HomeComponent,
    EntrylistToolComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    RouterModule,
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
