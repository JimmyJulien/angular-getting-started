import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilisateurService {

  readonly API_URL = 'api/utilisateurs';

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.API_URL);
  }

  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.API_URL}/${id}`);
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.API_URL, utilisateur);
  }

  updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(this.API_URL, utilisateur);
  }

  deleteUtilisateur(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
