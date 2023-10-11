import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AppRoutingConstantes } from 'src/app/app-routing.constantes';
import { AuthConstantes } from '../constantes/auth.constantes';
import { Identifiants } from '../interfaces/identifiants.interface';
import { AuthService } from './auth.service';

// Classe de test du AuthService
describe('AuthService', () => {
  // Service à tester
  let service: AuthService;

  // Espion du service Router
  // NOTE: il est aussi possible d'utiliser le RouterTestingModule (voir Angular Testing)
  let routerSpy: jasmine.SpyObj<Router>;

  // Avant chaque TU (avant chaque it)
  beforeEach(() => {
    // On définit l'espion du router
    routerSpy = jasmine.createSpyObj<Router>(['navigate']);

    // On configure le module de test
    TestBed.configureTestingModule({
      // Quand le Router est appelé dans le service testé,
      // on le remplace par notre espion
      // NOTE: il est également possible d'utiliser le RouterTestingModule
      providers: [{provide: Router, useValue: routerSpy}]
    });

    // On injecte le service à tester pour pouvoir le tester
    service = TestBed.inject(AuthService);
  });

  // Tests de l'initialisation du service
  describe('init', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  // Tests de la méthode seConnecter
  describe('seConnecter', () => {
    it(`
      doit actualiser le booléen estConnecte et naviguer vers utilisateurs
      quand les identifiants passés sont valides
    `, () => {
      // GIVEN
      const identifiants: Identifiants = {
        email: AuthConstantes.EMAIL_VALIDE,
        motDePasse: AuthConstantes.MOT_DE_PASSE_VALIDE,
      };

      // WHEN
      service.seConnecter(identifiants);
      
      // THEN
      expect(service.estConnecte).toBeTrue();
      expect(routerSpy.navigate).toHaveBeenCalledOnceWith([AppRoutingConstantes.ROUTE_UTILISATEURS]);
    });

    it(`
      ne doit ni actualiser le booléen estConnecte ni naviguer vers utilisateurs
      quand l'email passé est invalide et que le mot de passe est valide
    `, () => {
      // GIVEN
      const identifiants: Identifiants = {
        email: 'invalide@mail.fr',
        motDePasse: AuthConstantes.MOT_DE_PASSE_VALIDE,
      };

      // WHEN
      service.seConnecter(identifiants);
      
      // THEN
      expect(service.estConnecte).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
    });

    it(`
      ne doit ni actualiser le booléen estConnecte ni naviguer vers utilisateurs
      quand l'email passé est valide et que le mot de passe passé est invalide
    `, () => {
      // GIVEN
      const identifiants: Identifiants = {
        email: AuthConstantes.EMAIL_VALIDE,
        motDePasse: 'Invalide123456*',
      };

      // WHEN
      service.seConnecter(identifiants);
      
      // THEN
      expect(service.estConnecte).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
    });

  });
});
