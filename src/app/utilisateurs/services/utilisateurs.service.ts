import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, mergeMap, of, tap } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private readonly URL_API = 'api/utilisateurs';

  constructor(private http: HttpClient) { }

  getTest(): Observable<any> {
    return of(1, 2, 3, 4).pipe(
      // map(valeur => {
      //   return valeur * 3;
      // }),
      mergeMap(id => {
        return this.http.get(`${this.URL_API}/${id}`);
      }),
      tap(valeur => {
        // throw new Error('Cassé !!!');
        console.log(valeur);
      }),
      catchError(erreur => {
        console.error(erreur);
        alert('Y a un problème');
        return EMPTY;
      })
    );

  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.URL_API);
  }

  direCoucou(coucou: string | null) {
    alert(`Bonjour ${coucou} !`);
  }

  ajouterUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.URL_API, utilisateur);
  }

  modifierUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(this.URL_API, utilisateur);
  }

  supprimerUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/${id}`);
  }
}
