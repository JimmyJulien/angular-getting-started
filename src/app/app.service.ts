import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, mergeMap, of, tap } from 'rxjs';
import { Utilisateur } from './utilisateur.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly URL_API = 'api/utilisateurs';

  private _utilisateurs: Utilisateur[] = [
    {id: 1, nom: 'Lovelace', prenom: 'Ada', email: 'ada.lovelace@mail.com'},
    {id: 2, nom: 'Gosling', prenom: 'James', email: 'james.gosling@mail.com'},
    {id: 3, nom: 'Gates', prenom: 'Bill', email: 'bill.gates@mail.com'},
    {id: 4, nom: 'Liskov', prenom: 'Barbara', email: 'barbara.liskov@mail.com'},
    {id: 5, nom: 'Musk', prenom: 'Elon', email: null},
    {id: 6, nom: null, prenom: null, email: null}
  ];

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

  getUtilisateurs(): Utilisateur[] {
    return this._utilisateurs;
  }

  direCoucou(coucou: string | null) {
    alert(`Bonjour ${coucou} !`);
  }

  ajouterUtilisateur(utilisateur: Utilisateur) {
    this._utilisateurs.push(utilisateur);
  }
}
