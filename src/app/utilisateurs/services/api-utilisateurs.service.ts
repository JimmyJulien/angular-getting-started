import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilisateursService {

  /** URL de l'API utilisées pour récupérer les utilisateurs */
  private readonly API_URL = 'api/utilisateurs';

  // On injecte le HttpClient pour pouvoir faire des requêtes HTTP
  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les utilisateurs en base de données
   * @returns tous les utilisateurs en base de données
   */
  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.API_URL);
  }

  /**
   * Créer un nouvel utilisateur à partir de l'utilisateur passé en paramètre
   * @param utilisateur l'utilisateur à créer
   * @returns l'utilisateur créé
   */
  create(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.API_URL, utilisateur);
  }

  /**
   * Met à jour l'utilisateur passé en paramètre
   * @param utilisateur l'utilisateur à mettre à jour
   * @returns l'utilisateur mis à jour
   */
  update(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(this.API_URL, utilisateur);
  }

  /**
   * Supprime l'utilisateur dont l'id est passé en paramètre
   * @param id l'id de l'utilisateur à supprimer
   * @returns un objet de retour indiquant si la suppression a été effectuée
   */
  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
