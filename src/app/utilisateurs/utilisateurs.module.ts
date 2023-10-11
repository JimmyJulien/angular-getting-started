import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreationModificationUtilisateurComponent } from './components/creation-modification-utilisateur/creation-modification-utilisateur.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { CouleurUtilisateurPipe } from './pipes/couleur-utilisateur.pipe';
import { FormatUtilisateurPipe } from './pipes/format-utilisateur.pipe';

/**
 * Module de la fonctionnalités des Utilisateurs
 */
@NgModule({
  // Composants, directives et pipes utilisés par le module Utilisateurs
  declarations: [
    CreationModificationUtilisateurComponent,
    UtilisateursComponent,
    UtilisateurComponent,
    CouleurUtilisateurPipe,
    FormatUtilisateurPipe
  ],
  // Modules importés (ici le SHaredModule qui donne accès au CommonModule
  // et au ReactiveFormsModule)
  imports: [SharedModule]
})
export class UtilisateursModule { }
