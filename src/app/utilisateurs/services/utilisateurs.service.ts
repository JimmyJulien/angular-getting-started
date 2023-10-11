import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur.interface';
import { ApiUtilisateursService } from './api-utilisateurs.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  // On injecte le service api des utilisateurs qui gère les appels HTTP
  constructor(private apiUtilisateursService: ApiUtilisateursService) { }

  /**
   * Récupère les utilisateurs de l'API via une méthode HTTP GET
   * @returns la liste des utilisateurs sous forme d'Observable
   */
  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.apiUtilisateursService.getAll();
  }

  /**
   * Ajoute un utilisateur via une méthode HTTP POST
   * @param utilisateur l'utilisateur à créer
   * @returns l'utilisateur créé sous forme d'Observable
   */
  ajouterUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.apiUtilisateursService.create(utilisateur);
  }

  /**
   * Modifie un utilisateur via une méthode HTTP PUT
   * @param utilisateur l'utilisateur à modifier
   * @returns l'utilisateur modifié sous forme d'Observable
   */
  modifierUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.apiUtilisateursService.update(utilisateur);
  }

  /**
   * Supprime un utilisateur via une méthode HTTP DELETE
   * @param idUtilisateur l'id de l'utilisateur à supprimer
   * @returns l'utilisateur créé sous forme d'Observable
   */
  supprimerUtilisateur(idUtilisateur: number): Observable<Object> {
    return this.apiUtilisateursService.delete(idUtilisateur);
  }

  /**
   * Factorise la gestion d'une erreur
   * @param erreur l'erreur à gérer
   */
  gererErreur(erreur: Error): Observable<never> {
    // On log l'erreur
    console.error(erreur.message);

    // On notifie l'erreur
    alert('Une erreur est survenue !');

    // On arrête le flux avec l'Observable utilitaire EMPTY
    return EMPTY;
  }

}
