import { FormControl, ValidationErrors } from "@angular/forms";
import { CustomValidators } from "./custom-validators";

// Tests de la classe statique CustomValidators
describe('CustomValidators', () => {

  // Tests du validateur coucou
  describe('coucou', () => {
    it(`
      doit renvoyer null
      quand la valeur du contrôle est null
    `, () => {
      // GIVEN
      const controle = new FormControl();
      
      // WHEN
      const resultat: ValidationErrors | null = CustomValidators.coucou(controle);
      
      // THEN
      expect(resultat).toBeNull();
    });

    it(`
      doit renvoyer null
      quand la valeur du contrôle contient 'coucou'
    `, () => {
      // GIVEN
      const controle = new FormControl('azertycoucouazerty');
      
      // WHEN
      const resultat: ValidationErrors | null = CustomValidators.coucou(controle);
      
      // THEN
      expect(resultat).toBeNull();
    });

    it(`
      doit renvoyer {coucou: true}
      quand la valeur du contrôle ne contient pas 'coucou'
    `, () => {
      // GIVEN
      const controle = new FormControl('azerty');
      
      // WHEN
      const resultat: ValidationErrors | null = CustomValidators.coucou(controle);
      
      // THEN
      expect(resultat).toEqual({coucou: true});
    });
  });

  // Tests du validateur contient
  describe('contient', () => {
    it(`
      doit renvoyer null
      quand la valeur du contrôle est null
    `, () => {
      // GIVEN
      const controle = new FormControl();
      const texte: string = 'texte';
      
      // WHEN
      const resultat: ValidationErrors | null = CustomValidators.contient(texte).call(this, controle);
      
      // THEN
      expect(resultat).toBeNull();
    });

    it(`
      doit renvoyer null
      quand la valeur du contrôle contient le texte passé en paramètre
    `, () => {
      // GIVEN
      const controle = new FormControl('azerty');
      const texte: string = 'testazertytest'; 
      
      // WHEN
      const resultat: ValidationErrors | null = CustomValidators.contient(texte).call(this, controle);
      
      // THEN
      expect(resultat).toEqual({contient: true});
    });

    it(`
      doit renvoyer {contient: true}
      quand la valeur du contrôle ne contient pas le texte passé en paramètre
    `, () => {
      // GIVEN
      const controle = new FormControl('azerty');
      const texte: string = 'test'; 
      
      // WHEN
      const resultat: ValidationErrors | null = CustomValidators.contient(texte).call(this, controle);
      
      // THEN
      expect(resultat).toEqual({contient: true});
    });
  });

});