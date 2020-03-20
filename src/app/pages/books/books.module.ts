import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { Select2Module } from 'ng2-select2';
import { ModalModule } from 'ngx-bootstrap';

import { BooksComponent } from './books.component';
import { BooksSearchComponent } from './books-search/books-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksFormComponent } from './books-form/books-form.component';

const routes: Routes = [
  { path: '', component: BooksComponent }
];

@NgModule({
  declarations: [
    BooksComponent,
    BooksSearchComponent,
    BooksFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    Select2Module,
    ModalModule.forRoot()
  ],
  exports: [
    ModalModule
  ]
})
export class BooksModule { }
