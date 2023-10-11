import { Component } from '@angular/core';
import { Observable, catchError, mergeMap, tap } from 'rxjs';
import { Utilisateur } from '../../interfaces/utilisateur.interface';
import { UtilisateursService } from '../../services/utilisateurs.service';

/**
 * Composant affichant tous les utilisateurs
 * NOTE : l'architecture de ce composant est fonctionnelle mais elle ne respecte pas les meilleures pratiques.
 * Pour cela, il faut que les données et la logique métier soit dans le service utilisateurs.
 * Pour que tout fonctionne de manière réactive, il faut utiliser des objets RxJS particuliers : les Subjects
 * (voir Angular Project et Angular Advanced)
 */
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent {
  
  /** Utilisateurs à afficher */
  utilisateurs: Utilisateur[] = [];

  /** Utilisateur sélectionné (utilisé pour la modification/suppression) */
  utilisateurSelectionne: Utilisateur | undefined = undefined;
  
  // On injecte le service utilisateurs
  constructor(private utilisateursService: UtilisateursService) {}

  /**
   * Lifecycle hook d'initialisation du composant
   */
  ngOnInit(): void {
    this.initialiserUtilisateurs();
  }

  /**
   * Initialise les utilisateurs
   */
  private initialiserUtilisateurs(): void {
    // On récupère les utilisateurs
    this.utilisateursService.getUtilisateurs()
    .pipe(
      tap(utilisateurs => {
        // Si la liste d'utilisateur renvoyée n'est pas définie, on lance une exception
        if(!utilisateurs) throw new Error('Les utilisateurs doivent être définis !');

        // Sinon on actualise les utilisateurs
        this.utilisateurs = utilisateurs;
      }),
      // Si une erreur survient pendant le flux
      // NOTE: catchError(this.utilisateursService.gererErreur) est un raccourci de :
      // catchError((erreur: Error) => this.utilisateursService.gererErreur(erreur))
      catchError(this.utilisateursService.gererErreur)
    )
    .subscribe();
  }

  /**
   * Sélectionne un utilisateur
   * @param utilisateurSelectionne l'utilisateur sélectionné
   */
  selectionnerUtilisateur(utilisateurSelectionne: Utilisateur) {
    this.utilisateurSelectionne = utilisateurSelectionne;
  }

  /**
   * Ajoute l'utilisateur passé en paramètre
   * @param utilisateurACreer l'utilisateur à ajouter
   */
  ajouterUtilisateur(utilisateurACreer: Utilisateur): void {
    // On exécute l'ajout puis on refresh les utilisateurs
    this.executerActionEtRechargerUtilisateurs(
      this.utilisateursService.ajouterUtilisateur(utilisateurACreer)
    )
    .subscribe();
  }

  /**
   * Modifie un utilisateur à partir des informations contenues dans l'utilisateur passé en paramètre
   * @param utilisateurAModifier l'utilisateur à modifier
   */
  modifierUtilisateur(utilisateurAModifier: Utilisateur): void {
    // On exécute la modification puis on refresh les utilisateurs
    this.executerActionEtRechargerUtilisateurs(
      this.utilisateursService.modifierUtilisateur(utilisateurAModifier)
      .pipe(
        // On reset l'utilisateur sélectionné pour masquer le bloc de modification
        tap(() => this.utilisateurSelectionne = undefined)
      )
    )
    .subscribe();
  }

  /**
   * Supprime l'utilisateur dont l'id est passé en paramètre
   * @param idUtilisateurASupprimer l'id de l'utilisateur à supprimer
   */
  supprimerUtilisateur(idUtilisateurASupprimer: number) {
    // On exécute la suppression puis on refresh les utilisateurs
    this.executerActionEtRechargerUtilisateurs(
      this.utilisateursService.supprimerUtilisateur(idUtilisateurASupprimer)
    )
    .subscribe();
  }

  /**
   * Méthode qui permet d'exécuter une action puis de recharger les utilisateurs
   * pour actualiser la vue
   * @param source$ la source observable
   * @returns les utilisateurs mis à jour sous forme d'Observable
   */
  private executerActionEtRechargerUtilisateurs(source$: Observable<Utilisateur | Object>): Observable<Utilisateur[]> {
    return source$
    .pipe(
      // On transforme la source reçue en appel HTTP permettant de récupérer tous les utilisateurs
      mergeMap(() => this.utilisateursService.getUtilisateurs()),
      tap(utilisateurs => {
        // Si la liste d'utilisateur renvoyée n'est pas définie, on lance une exception
        if(!utilisateurs) throw new Error('Les utilisateurs doivent être définis !');

        // Sinon on actualise les utilisateurs
        this.utilisateurs = utilisateurs;

        // On notifie le succès de l'ajout
        alert('Action réalisée avec succès !');
      }),
      // Si une erreur survient pendant le flux, on gère l'erreur
      // NOTE: catchError(this.utilisateursService.gererErreur) est un raccourci de :
      // catchError((erreur: Error) => this.utilisateursService.gererErreur(erreur))
      catchError(this.utilisateursService.gererErreur)
    );
  }
}
