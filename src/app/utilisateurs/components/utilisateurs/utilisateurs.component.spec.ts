import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Utilisateur } from '../../interfaces/utilisateur.interface';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { UtilisateursComponent } from './utilisateurs.component';

// Tests du composant UtilisateursComposant
describe('UtilisateursComponent', () => {
  // Le composant à tester
  let component: UtilisateursComponent;

  // Le wrapper du composant à tester
  let fixture: ComponentFixture<UtilisateursComponent>;

  // L'espion du service UtilisateursService
  let utilisateursServiceSpy: jasmine.SpyObj<UtilisateursService>;

  // Avant chaque test (avant chaque it)
  beforeEach(() => {
    // On définit l'espion du service UtilisateursService
    utilisateursServiceSpy = jasmine.createSpyObj(['getUtilisateurs', 'ajouterUtilisateur', 'modifierUtilisateur', 'supprimerUtilisateur']);

    // On configure le module de test
    TestBed.configureTestingModule({
      // On déclare le composant à tester
      declarations: [UtilisateursComponent],
      providers: [
        // On remplace le service UtilisateursService par l'espion lorsque celui-ci est 
        // injecté dans le constructeur du composant à tester
        {provide: UtilisateursService, useValue: utilisateursServiceSpy}
      ],
      // On utilise le CUSTOM_ELEMENTS_SCHEMA pour éviter de devoir mocker tous les composants
      // enfants du composant à tester
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    // On définit le wrapper du composant à tester
    fixture = TestBed.createComponent(UtilisateursComponent);

    // On définit le composant à tester
    component = fixture.componentInstance;
  });

  // Tests d'initialisation
  describe('init', () => {
    it('doit créer le composant', () => {
      initialiser();
      expect(component).toBeTruthy();
    });
  });

  // Tests de la méthode selectionnerUtilisateur
  describe('selectionnerUtilisateur', () => {
    it(`
      doit mettre à jour l'utilisateur sélectionné
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateurSelectionne: Utilisateur = {
        id: 4,
        nom: 'test',
        prenom: 'test',
        email: null
      };
      
      // WHEN
      component.selectionnerUtilisateur(utilisateurSelectionne);
      
      // THEN
      expect(component.utilisateurSelectionne).toEqual(utilisateurSelectionne);
    });
  });

  // Tests de la méthode ajouterUtilisateur
  describe('ajouterUtilisateur', () => {
    it(`
      doit ajouter un utilisateur puis actualiser les utilisateurs
      quand la méthode est appelée
    `,
    () => {
      // GIVEN
      initialiser();
      const utilisateurACreer: Utilisateur = {id: 0, nom: '', prenom: '', email: ''};
      utilisateursServiceSpy.ajouterUtilisateur.and.returnValue(of(utilisateurACreer));
      utilisateursServiceSpy.getUtilisateurs.and.returnValue(of([...component.utilisateurs, utilisateurACreer]));
      
      // WHEN
      component.ajouterUtilisateur(utilisateurACreer);
      
      // THEN
      expect(utilisateursServiceSpy.ajouterUtilisateur).toHaveBeenCalledOnceWith(utilisateurACreer);
      expect(utilisateursServiceSpy.getUtilisateurs).toHaveBeenCalledTimes(2);// Une fois pour l'init + une fois pour l'appel
      expect(component.utilisateurs.length).toBe(1);
    });
  });

  // Tests de la méthode modifierUtilisateur
  describe('modifierUtilisateur', () => {
    it(`
      doit modifier un utilisateur, reset l'utilisateur sélectionné et actualiser les utilisateurs
      quand la méthode est appelée
    `, () => {
      // GIVEN
      initialiser([{id: 1, nom: 'nom', prenom: 'prenom', email: 'test@mail.com'}]);
      const utilisateurAModifier: Utilisateur = {id: 1, nom: 'nomModifie', prenom: 'prenom', email: 'test@mail.com'};
      utilisateursServiceSpy.modifierUtilisateur.and.returnValue(of(utilisateurAModifier));
      utilisateursServiceSpy.getUtilisateurs.and.returnValue(of([utilisateurAModifier]));
      
      // WHEN
      component.modifierUtilisateur(utilisateurAModifier);
      
      // THEN
      expect(utilisateursServiceSpy.modifierUtilisateur).toHaveBeenCalledOnceWith(utilisateurAModifier);
      expect(component.utilisateurSelectionne).toBeUndefined();
      expect(utilisateursServiceSpy.getUtilisateurs).toHaveBeenCalledTimes(2);// Une fois pour l'init + une fois pour l'appel
      expect(component.utilisateurs.length).toBe(1);
    });
  });

  // Tests de la méthode supprimerUtilisateurs
  describe('supprimerUtilisateur', () => {
    it(`
      doit supprimer l'utilisateur puis actualiser les utilisateur
      quand la méthode est appelée
    `, () => {
      // GIVEN
      initialiser([{id: 1, nom: 'nom', prenom: 'prenom', email: 'test@mail.com'}]);
      utilisateursServiceSpy.supprimerUtilisateur.and.returnValue(of({suppressionOk: true}));
      utilisateursServiceSpy.getUtilisateurs.and.returnValue(of([]));
      
      // WHEN
      component.supprimerUtilisateur(1);
      
      // THEN
      expect(utilisateursServiceSpy.supprimerUtilisateur).toHaveBeenCalledOnceWith(1);
      expect(utilisateursServiceSpy.getUtilisateurs).toHaveBeenCalledTimes(2);// Une fois pour l'init + une fois pour l'appel
      expect(component.utilisateurs.length).toBe(0);
    });
  })

  // NOTE: On ne teste pas la méthode executerActionEtRechargerUtilisateurs car c'est une méthode privée
  // Elle est testée indirectement par les tests qui utilisent cette méthode

  /**
   * Fonction utilisée pour initialiser le composant
   */
  function initialiser(utilisateurs: Utilisateur[] = []) {
    utilisateursServiceSpy.getUtilisateurs.and.returnValue(of(utilisateurs));
    fixture.detectChanges();
  }
});
