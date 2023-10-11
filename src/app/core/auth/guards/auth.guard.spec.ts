import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppRoutingConstantes } from 'src/app/app-routing.constantes';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

/**
 * Mock du AuthService
 * NOTE: on utilise un mock et pas un spy ici 
 * pour pouvoir manipuler l'attribut estConnecte facilement
 */
class AuthServiceMock {
  estConnecte = false;
}

// Tests du guard AuthGuard
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock: AuthServiceMock;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj(['parseUrl']);
    authServiceMock = new AuthServiceMock();

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerSpy},
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  // Tests d'initialisation
  describe('init', () => {
    it('doit créer le guard', () => {
      expect(guard).toBeTruthy();
    });
  });

  // Tests de la méthode canActivate
  describe('canActivate', () => {
    it(`
      doit renvoyer true
      quand l'utilisateur est connecté
    `, () => {
      // GIVEN
      authServiceMock.estConnecte = true;
      
      // WHEN
      const resultat = guard.canActivate();
      
      // THEN
      expect(resultat).toBeTrue();
    });

    it(`
      doit rediriger vers la page de login
      quand l'utilisateur n'est pas connecté
    `, () => {
      // GIVEN
      authServiceMock.estConnecte = false;
      
      // WHEN
      guard.canActivate();
      
      // THEN
      expect(routerSpy.parseUrl).toHaveBeenCalledOnceWith(AppRoutingConstantes.ROUTE_LOGIN);
    });
  });
});
