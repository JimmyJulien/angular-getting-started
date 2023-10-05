import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreationUtilisateurComponent } from './components/creation-utilisateur/creation-utilisateur.component';
import { PageUtilisateursComponent } from './components/page-utilisateurs/page-utilisateurs.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { FormatUtilisateurPipe } from './pipes/format-utilisateur.pipe';
import { TestPipe } from './pipes/test.pipe';

@NgModule({
  declarations: [
    CreationUtilisateurComponent,
    PageUtilisateursComponent,
    UtilisateurComponent,
    TestPipe,
    FormatUtilisateurPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class UtilisateursModule { }
