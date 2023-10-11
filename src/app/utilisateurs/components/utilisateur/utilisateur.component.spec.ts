import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CouleurUtilisateurPipe } from '../../pipes/couleur-utilisateur.pipe';
import { FormatUtilisateurPipe } from '../../pipes/format-utilisateur.pipe';
import { UtilisateurComponent } from './utilisateur.component';

// Tests du composant UtilisateurComponent
// NOTE: Il n'y a rien à tester dans cette classe mais on peut quand même
// laisser le TU de création par sécurité
describe('UtilisateurComponent', () => {
  // Composant à tester
  let component: UtilisateurComponent;

  // Wrapper du composant à tester
  let fixture: ComponentFixture<UtilisateurComponent>;

  // AVant chaque TU (à chaque it)
  beforeEach(() => {
    // On configure le module de test
    TestBed.configureTestingModule({
      // On déclare le composant à tester et les pipes utilisés dans le template
      declarations: [UtilisateurComponent, CouleurUtilisateurPipe, FormatUtilisateurPipe],
      // On utilise le schema CUSTOM_ELEMENTS_SCHEMA pour éviter de devoir déclarer
      // tous les composants fils du composant à tester
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    // On définit le wrapper du composant à tester
    fixture = TestBed.createComponent(UtilisateurComponent);

    // On définit le composant à tester
    component = fixture.componentInstance;

    // On lance un cycle de détection pour que le composant s'initialise
    fixture.detectChanges();
  });

  // Test d'initialisation du composant
  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });
});
