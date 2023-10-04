import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class TestValidators {

  static test1(): ValidatorFn {
    return (controle: AbstractControl) : ValidationErrors | null => {
      const valeurControle = controle.value;
      if(!valeurControle) return null;
      return valeurControle.includes('test1') ? null : { testKo: true };
    };
  }
  
  static test2(controle: AbstractControl): ValidationErrors | null {
    const valeurControle = controle.value;
    if(!valeurControle) return null;
    return valeurControle.includes('test2') ? null : { testKo: true };
  };
}
