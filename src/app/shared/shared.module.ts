import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Module partagé par plusieurs modules
 */
@NgModule({
  imports: [
    CommonModule,// Module contenant les directives de base d'Angular
    ReactiveFormsModule,// Module contenant les directives des reactive forms
  ],
  // Les modules sont exportés donc tout module qui importe le SharedModule
  // n'aura pas besoin d'importer ces modules
  exports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
