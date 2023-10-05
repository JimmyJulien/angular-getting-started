import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, mergeMap, tap } from 'rxjs';
import { Utilisateur } from '../../interfaces/utilisateur.interface';
import { UtilisateursService } from '../../services/utilisateurs.service';

@Component({
  selector: 'app-page-utilisateurs',
  templateUrl: './page-utilisateurs.component.html',
  styleUrls: ['./page-utilisateurs.component.scss']
})
export class PageUtilisateursComponent {
  
  utilisateurs: Utilisateur[] = [];
  utilisateurSelectionne: Utilisateur | undefined = undefined;
  
  constructor(private appService: UtilisateursService, private router: Router) {}

  ngOnInit(): void {
    this.appService.getUtilisateurs()
    .pipe(
      catchError((erreur: Error) => {
        console.error(erreur.message);
        alert('Y a un problème !!!');
        return EMPTY;
      }),
    )
    .subscribe(utilisateurs => this.utilisateurs = utilisateurs);
  }

  direCoucou(coucou: string | null) {
    this.appService.direCoucou(coucou);
  }

  ajouterUtilisateur(utilisateur: Utilisateur) {
    this.executeEtRefresh(
      this.appService.ajouterUtilisateur(utilisateur)
    )
    .subscribe();
  }

  modifierUtilisateur(utilisateurAModifier: Utilisateur) {
    this.executeEtRefresh(
      this.appService.modifierUtilisateur(utilisateurAModifier)
    )
    .subscribe();
  }

  selectionnerUtilisateur(utilisateur: Utilisateur) {
    this.utilisateurSelectionne = utilisateur;
  }

  supprimerUtilisateur(id: number) {
    this.executeEtRefresh(
      this.appService.supprimerUtilisateur(id)
    )
    .subscribe();
  }

  private executeEtRefresh(source$: Observable<Utilisateur | void>): Observable<Utilisateur[]> {
    return source$
    .pipe(
      mergeMap(() => this.appService.getUtilisateurs()),
      tap(utilisateurs => {
        if(!utilisateurs) throw new Error('Tap a un problème !!!');
        this.utilisateurs = utilisateurs;
        alert('Les utilisateurs sont à jour !');
      }),
      catchError((erreur: Error) => {
        console.error(erreur.message);
        alert('Y a un problème !!!');
        return EMPTY;
      }),
    );
  }
}
