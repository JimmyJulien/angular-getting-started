import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { CreationModificationUtilisateurComponent } from './creation-modification-utilisateur.component';

// Tests du composant de création d'utilisateur
describe('CreationModificationUtilisateurComponent', () => {
  // Composant à tester
  let component: CreationModificationUtilisateurComponent;

  // Wrapper du composant à tester
  let fixture: ComponentFixture<CreationModificationUtilisateurComponent>;

  // Avant chaque TU (avant chaque it)
  beforeEach(() => {
    // On configure le module de test
    TestBed.configureTestingModule({
      declarations: [CreationModificationUtilisateurComponent],
      imports: [ReactiveFormsModule]
    });

    // On définit le wrapper du composant à tester
    fixture = TestBed.createComponent(CreationModificationUtilisateurComponent);

    // on définit le composant à tester
    component = fixture.componentInstance;

    // On lance un cycle de détection pour initialiser le composant à tester
    fixture.detectChanges();
  });

  // Tests de l'initialisation du composant
  describe('init', () => {
    it('doit créer le composant', () => {
      expect(component).toBeTruthy();
    });
  });

  // Tests de la méthode soumettreFormulaire
  describe('soumettreFormulaire', () => {
    it(`
      doit émettre un évènement modifierUtilisateur et reset le formulaire
      quand un utilisateur est défini
    `, () => {
      // GIVEN
      component.utilisateur = {
        id: 0,
        nom: 'nomTest',
        prenom: 'prenomTest',
        email: 'test@mail.fr',
      };

      component.formulaire.setValue({
        nom: 'nom',
        prenom: 'prenom',
        email: 'nom.prenom@mail.fr',
      });
  
      const modifierUtilisateurEmitSpy = spyOn(component.modifierUtilisateur, 'emit')
      
      // WHEN
      component.soumettreFormulaire();
      
      // THEN
      expect(modifierUtilisateurEmitSpy).toHaveBeenCalledOnceWith({
        id: 0,
        nom: 'nom',
        prenom: 'prenom',
        email: 'nom.prenom@mail.fr',
      });
      expect(component.formulaire.controls.nom.value).toBeNull();
      expect(component.formulaire.controls.prenom.value).toBeNull();
      expect(component.formulaire.controls.email.value).toBeNull();
    })

    it(`
    doit émettre un évènement creerUtilisateur et reset le formulaire
    quand aucun utilisateur n'est défini
    `, () => {
      // GIVEN
      const creerUtilisateurEmitSpy = spyOn(component.creerUtilisateur, 'emit')
      
      // WHEN
      component.soumettreFormulaire();
      
      // THEN
      expect(creerUtilisateurEmitSpy).toHaveBeenCalledTimes(1);
      expect(component.formulaire.controls.nom.value).toBeNull();
      expect(component.formulaire.controls.prenom.value).toBeNull();
      expect(component.formulaire.controls.email.value).toBeNull();
    });
  });
});
