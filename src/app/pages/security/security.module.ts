import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  { path: '', component: SecurityComponent }
];

@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecurityModule { }
