import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

  static contient(contient: string): ValidatorFn {
    return (controle: AbstractControl): ValidationErrors | null => {
      const valeurControle = controle.value;
  
      if(!valeurControle) return null;
  
      return valeurControle.includes(contient) ? null : { contient: true };
    };
  }
  
  static coucou = (controle: AbstractControl): ValidationErrors | null => {
    const valeurControle = controle.value;
  
    if(!valeurControle) return null;
  
    return valeurControle.includes('coucou') ? null : { coucou: true };
  };

}

