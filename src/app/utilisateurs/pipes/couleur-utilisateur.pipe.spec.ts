import { Utilisateur } from '../interfaces/utilisateur.interface';
import { CouleurUtilisateurPipe } from './couleur-utilisateur.pipe';

// Tests du pipe CouleurUtilisateurPipe
describe('CouleurUtilisateurPipe', () => {

  // Tests d'initialisation
  describe('init', () => {
    it('créer le pipe', () => {
      const pipe = new CouleurUtilisateurPipe();
      expect(pipe).toBeTruthy();
    });
  });

  // Tests de la méthode transform
  describe('transform', () => {
    it(`
      doit renvoyer 'rouge'
      quand l'utilisateur n'est pas défini
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = undefined;
      const pipe = new CouleurUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('rouge');
    });

    it(`
      doit renvoyer 'rouge'
      quand l'utilisateur n'a pas de nom
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: null,
        prenom: null,
        email: null,
      };
      const pipe = new CouleurUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('rouge');
    });

    it(`
      doit renvoyer 'rouge'
      quand l'utilisateur a un nom dont le nombre de caractères est inférieur à 6
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: 'test',
        prenom: null,
        email: null,
      };
      const pipe = new CouleurUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('rouge');
    });

    it(`
      doit renvoyer 'rouge'
      quand l'utilisateur a un nom dont le nombre de caractères est égal à 6
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: 'coucou',
        prenom: null,
        email: null,
      };
      const pipe = new CouleurUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('rouge');
    });

    it(`
      doit renvoyer 'bleu'
      quand l'utilisateur a un nom dont le nombre de caractères est supérieur à 6
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: 'nomassezlong',
        prenom: null,
        email: null,
      };
      const pipe = new CouleurUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('bleu');
    });
  });
});
