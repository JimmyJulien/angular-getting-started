import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingConstantes } from 'src/app/app-routing.constantes';
import { AuthConstantes } from '../constantes/auth.constantes';
import { Identifiants } from '../interfaces/identifiants.interface';

/**
 * Service d'authentification
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Booléen indiquant si l'utilisateur est connecté */
  private _estConnecte: boolean = false;

  /** Getter du booléen indiquant si l'utilisateur est connecté */
  get estConnecte(): boolean {
    return this._estConnecte;
  }

  // On injecte le router pour pouvoir naviguer vers la page utilisateurs
  constructor(private router: Router) { }

  /**
   * Méthode de connexion d'un utilisateur à partir des identifiants passés en paramètres
   * @param identifiants les identifiants permettant la connexion
   */
  seConnecter(identifiants: Identifiants): void {
    // NOTE : il est toujours préférable de créer des constantes pour donner un nom clair à chaque condition,
    // plutôt que de tout mettre dans le if (meilleure lisibilité et maintenabilité)
    const estEmailValide: boolean = identifiants.email === AuthConstantes.EMAIL_VALIDE;
    const estMotDePasseValide: boolean = identifiants.motDePasse === AuthConstantes.MOT_DE_PASSE_VALIDE;

    // Si les identifiants sont valides
    if(estEmailValide && estMotDePasseValide) {
      // On met à jour le booléen indiquant que l'utilisateur est connecté
      this._estConnecte = true;

      // On navigue vers la page des utilisateurs
      this.router.navigate([AppRoutingConstantes.ROUTE_UTILISATEURS]);
    }
    else {
      // Sinon on affiche un message d'erreur
      alert(AuthConstantes.MSG_ERREUR_LOGIN);
    }
  }
}
