import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { UtilisateursService } from '../services/utilisateurs.service';

/**
 * Validateur asynchrone vérifiant l'unicité du nom saisi dans le contrôle passé en paramètre
 */
@Injectable({
  providedIn: 'root'
})
export class NomUtilisateurUniqueValidator implements AsyncValidator {

  // On injecte le UtilisateursService pour récupérer la liste d'utilisateurs en base de données
  constructor(private utilisateursService: UtilisateursService) { }

  /**
   * Validateur qui vérifie si un champ contient le texte passé en paramètre
   * NOTE: ce validateur sert à montrer l'écriture d'un validateur qui a besoin d'argument
   * @param nom le texte que le champ doit contenir
   * @returns null si le champ contient le texte, un object contenant un booléen contient à true sinon
   */
  validate(controle: AbstractControl): Observable<ValidationErrors | null> {
    // On récupère la valeur du champ
    const valeurControle = controle.value;
    
    // S'il n'y en a pas, on estime que la validateur passe
    if(!valeurControle) return of(null);
    
    // Sinon on vérifie si le nom existe déjà parmi les utilisateurs existants
    // NOTE : ce validateur n'est pas très optimisé car il récupère tous les utilisateurs à chaque fois,
    // il serait plus performant d'utiliser un endpoint spécifique pour cette vérification
    return this.utilisateursService.getUtilisateurs()
    .pipe(
      map(utilisateurs => {
        // On vérifie si l'un des noms contient le nom recherché
        // NOTE : some est une méthode native JS qui permet de vérifier si un des objets de la liste
        // respecte la condition passée dans l'arrow function
        const nomExisteDeja: boolean = utilisateurs
          .map(utilisateur => utilisateur.nom)
          .some(nomUtilisateur => nomUtilisateur?.includes(valeurControle));
        
        // Si c'est le cas, on renvoie l'objet avec le booléen existe à true, sinon null
        return nomExisteDeja ? { nomUnique: true } : null;
      }),
      catchError(erreur => {
        // Si une erreur lors de la récupération survient,
        // On log l'erreur
        console.error(erreur);
        
        // On renvoie un objet d'erreur
        return of({ erreur: true });
      })
    );
  }
}
