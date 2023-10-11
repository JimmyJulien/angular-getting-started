import { TestBed } from '@angular/core/testing';

import { FormControl } from '@angular/forms';
import { of, tap, throwError } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur.interface';
import { UtilisateursService } from '../services/utilisateurs.service';
import { NomUtilisateurUniqueValidator } from './nom-utilisateur-unique.validator';

// Tests du validateur NomUtilisateurUniqueValidator
describe('NomUtilisateurUniqueValidator', () => {
  // On déclare le validateur à tester
  let validator: NomUtilisateurUniqueValidator;

  // On déclare l'espion du service UtilisateursService
  let utilisateursServiceSpy: jasmine.SpyObj<UtilisateursService>;
  
  // On définit des utilisateurs réutilisables
  let UTILISATEURS: Utilisateur[] = [
    {id: 1, nom: 'Lovelace', prenom: 'Ada', email: 'ada.lovelace@mail.com'},
    {id: 2, nom: 'Gosling', prenom: 'James', email: 'james.gosling@mail.com'},
    {id: 3, nom: 'Gates', prenom: 'Bill', email: 'bill.gates@mail.com'},
  ];

  // Avant chaque test (avant chaque it)
  beforeEach(() => {
    // On définit l'espion du service UtilisateursService
    utilisateursServiceSpy = jasmine.createSpyObj(['getUtilisateurs']);

    // On configure le module de test
    TestBed.configureTestingModule({
      providers: [{provide: UtilisateursService, useValue: utilisateursServiceSpy}]
    });

    // On injecte le validateur à tester
    validator = TestBed.inject(NomUtilisateurUniqueValidator);
  });

  // Tests d'initialisation
  describe('init', () => {
    it('doit créer le service', () => {
      expect(validator).toBeTruthy();
    });
  });

  // Tests de la méthode validate
  describe('validate', () => {
    it(`
      doit renvoyer null
      quand la valeur du controle est null
    `, () => {
      // GIVEN
      const controle: FormControl = new FormControl();

      // WHEN
      validator.validate(controle)
      .pipe(
        tap(validation => {
          // THEN
          expect(validation).toBeNull();
        })
      )
      .subscribe();
    });

    it(`
      doit renvoyer null
      quand la valeur du controle n'existe pas
    `, () => {
      // GIVEN
      const controle: FormControl = new FormControl('test');
      utilisateursServiceSpy.getUtilisateurs.and.returnValue(of(UTILISATEURS));
  
      // WHEN
      validator.validate(controle)
      .pipe(
        tap(validation => {
          // THEN
          expect(validation).toBeNull();
        })
      )
      .subscribe();
    });
    
    it(`
      doit renvoyer {erreur: true}
      quand la valeur du controle n'existe pas
    `, () => {
      // GIVEN
      const controle: FormControl = new FormControl('test');
      utilisateursServiceSpy.getUtilisateurs.and.returnValue(throwError(() => 'Erreur'));
  
      // WHEN
      validator.validate(controle)
      .pipe(
        tap(validation => {
          // THEN
          expect(validation).toEqual({erreur: true});
        })
      )
      .subscribe();
    });

    it(`
      doit renvoyer {nomUnique: true}
      quand la valeur du controle existe déjà
    `, () => {
      // GIVEN
      const controle: FormControl = new FormControl('Lovelace');
      utilisateursServiceSpy.getUtilisateurs.and.returnValue(of(UTILISATEURS));

      // WHEN
      validator.validate(controle)
      .pipe(
        tap(validation => {
          // THEN
          expect(validation).toEqual({nomUnique: true});
        })
      )
      .subscribe();
    });

  });
});
