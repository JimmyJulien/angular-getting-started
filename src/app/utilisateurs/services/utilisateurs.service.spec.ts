import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur.interface';
import { ApiUtilisateursService } from './api-utilisateurs.service';
import { UtilisateursService } from './utilisateurs.service';

// Tests du service UtilisateursService
describe('UtilisateursService', () => {
  // On déclare le service à tester
  let service: UtilisateursService;

  // On déclare l'espion du service ApiUtilisateursService
  let apiUtilisateursServiceSpy: jasmine.SpyObj<ApiUtilisateursService>;

  // Avant chaque test (avant chaque it)
  beforeEach(() => {
    // On définit l'espion du service ApiUtilisateursService
    apiUtilisateursServiceSpy = jasmine.createSpyObj(['getAll', 'create', 'update', 'delete']);

    // On configure le module de test
    TestBed.configureTestingModule({
      providers: [{provide: ApiUtilisateursService, useValue: apiUtilisateursServiceSpy}]
    });

    // On injecte le service à tester
    service = TestBed.inject(UtilisateursService);
  });

  // Test d'initialisation
  describe('init', () => {
    it('doit créer le service', () => {
      expect(service).toBeTruthy();
    });
  });

  // Tests de la méthode getUtilisateurs
  describe('getUtilisateurs', () => {
    it(`
      doit appeler la méthode getAll du ApiUtilisateursService
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateurRetourne: Utilisateur = {
        id: 0,
        nom: 'nomtest',
        prenom: 'prenomtest',
        email: 'test@mail.com',
      };
      const utilisateursRetournes: Utilisateur[] = [utilisateurRetourne];
      apiUtilisateursServiceSpy.getAll.and.returnValue(of(utilisateursRetournes));
      
      // WHEN
      service.getUtilisateurs().subscribe(utilisateurs => {
        // THEN
        expect(apiUtilisateursServiceSpy.getAll).toHaveBeenCalledTimes(1);
        expect(utilisateurs.length).toBe(1);
        expect(utilisateurs[0]).toEqual(utilisateurRetourne);
      });
    });
  });

  // Tests de la méthode ajouterUtilisateur
  describe('ajouterUtilisateur', () => {
    it(`
      doit appeler la méthode create du ApiUtilisateursService avec l'utilisateur à créer comme argument
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateurACreer: Utilisateur = {
        id: 1,
        nom: 'nouveauNom',
        prenom: 'nouveauPrenom',
        email: 'nouveau@mail.com',
      };
      apiUtilisateursServiceSpy.create.and.returnValue(of(utilisateurACreer));
      
      // WHEN
      service.ajouterUtilisateur(utilisateurACreer).subscribe(utilisateur => {
        // THEN
        expect(apiUtilisateursServiceSpy.create).toHaveBeenCalledOnceWith(utilisateurACreer);
        expect(utilisateur).toEqual(utilisateurACreer);
      });
    });
  });

  // Tests de la méthode modifierUtilisateur
  describe('modifierUtilisateur', () => {
    it(`
      doit appeler la méthode update du ApiUtilisateursService avec l'utilisateur à modifier comme paramètre
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateurAModifier: Utilisateur = {
        id: 1,
        nom: 'nomModifie',
        prenom: 'prenomModifie',
        email: 'modifie@mail.com',
      };
      apiUtilisateursServiceSpy.update.and.returnValue(of(utilisateurAModifier));
            
      // WHEN
      service.modifierUtilisateur(utilisateurAModifier).subscribe(utilisateur => {
        // THEN
        expect(apiUtilisateursServiceSpy.update).toHaveBeenCalledOnceWith(utilisateur);
        expect(utilisateur).toEqual(utilisateurAModifier);
      });
    });
  });

  // Tests de la méthode supprimerUtilisateur
  describe('supprimerUtilisateur', () => {
    it(`
      doit appeler la méthode delete du ApiUtilisateursService avec l'id de l'utilisateur à supprimer en paramètre
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const idUtilisateurASupprimer: number = 42;
      const objetRetourne = {suppressionOk: true};
      apiUtilisateursServiceSpy.delete.and.returnValue(of(objetRetourne));
      
      // WHEN
      service.supprimerUtilisateur(idUtilisateurASupprimer).subscribe(objet => {
        // THEN
        expect(apiUtilisateursServiceSpy.delete).toHaveBeenCalledOnceWith(idUtilisateurASupprimer);
        expect(objet).toEqual(objetRetourne);
      });
    });
  });
});
