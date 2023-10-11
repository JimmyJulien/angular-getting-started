import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Classe statique contenant les validateurs custom
 */
export class CustomValidators {
  
  /**
   * Validateur qui vérifie si le champ contient le texte 'coucou'
   * NOTE: ce validateur sert à montrer l'écriture d'un validateur qui n'a pas besoin d'argument
   * @param controle le contrôle à vérifier
   * @returns null si le champ contient 'coucou', un object contenant un booléen coucou à true sinon
   */
  static coucou = (controle: AbstractControl): ValidationErrors | null => {
    // On récupère la valeur du champ
    const valeurControle = controle.value;
  
    // S'il n'y en a pas, on estime que la validateur passe
    if(!valeurControle) return null;
  
    // Sinon on vérifie si la valeur du champ contient 'coucou'
    return valeurControle.includes('coucou') ? null : { coucou: true };
  };

  /**
   * Validateur qui vérifie si un champ contient le texte passé en paramètre
   * NOTE: ce validateur sert à montrer l'écriture d'un validateur qui a besoin d'argument
   * @param contient le texte que le champ doit contenir
   * @returns null si le champ contient le texte, un object contenant un booléen contient à true sinon
   */
  static contient(contient: string): ValidatorFn {
    // Un validateur doit renvoyer une ValidationErrors ou null pour fonctionner
    return (controle: AbstractControl): ValidationErrors | null => {
      // On récupère la valeur du champ
      const valeurControle = controle.value;
  
      // S'il n'y en a pas, on estime que la validateur passe
      if(!valeurControle) return null;
  
      // Sinon on vérifie si la valeur du champ contient le texte passé en paramètre
      return valeurControle.includes(contient) ? null : { contient: true };
    };
  }

}

