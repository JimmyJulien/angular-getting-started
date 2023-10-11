import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutingConstantes } from 'src/app/app-routing.constantes';
import { AuthService } from '../services/auth.service';

/**
 * Guard qui autorise la navigation vers un écran si l'utilisateur est connecté,
 * redirige vers l'écran de login si ce n'est pas le cas
 * NOTE: cette écriture est dépréciée depuis la version 14 d'Angular
 * (pour avoir la nouvelle version voir doc Angular)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // On injecte les services d'authentification et de routing
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Autorise la navigation vers un écran si l'utilisateur est connecté
   * @returns true si l'utilisateur est connecté, redirige vers l'écran de login sinon
   */
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login,
    // sinon on autorise la navigation
    return this.authService.estConnecte ? true: this.router.parseUrl(AppRoutingConstantes.ROUTE_LOGIN);
  }
}
