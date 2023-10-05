import { Component } from '@angular/core';
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
  
  constructor(private utilisateursService: UtilisateursService) {}

  ngOnInit(): void {
    this.utilisateursService.getUtilisateurs()
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
    this.utilisateursService.direCoucou(coucou);
  }

  ajouterUtilisateur(utilisateur: Utilisateur) {
    this.executeEtRefresh(
      this.utilisateursService.ajouterUtilisateur(utilisateur)
    )
    .subscribe();
  }

  modifierUtilisateur(utilisateurAModifier: Utilisateur) {
    this.executeEtRefresh(
      this.utilisateursService.modifierUtilisateur(utilisateurAModifier)
    )
    .subscribe();
  }

  selectionnerUtilisateur(utilisateur: Utilisateur) {
    this.utilisateurSelectionne = utilisateur;
  }

  supprimerUtilisateur(id: number) {
    this.executeEtRefresh(
      this.utilisateursService.supprimerUtilisateur(id)
    )
    .subscribe();
  }

  private executeEtRefresh(source$: Observable<Utilisateur | void>): Observable<Utilisateur[]> {
    return source$
    .pipe(
      mergeMap(() => this.utilisateursService.getUtilisateurs()),
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
