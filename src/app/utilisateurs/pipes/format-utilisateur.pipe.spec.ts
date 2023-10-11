import { Utilisateur } from '../interfaces/utilisateur.interface';
import { FormatUtilisateurPipe } from './format-utilisateur.pipe';

// Tests du pipe FormatUtilisateurPipe
describe('FormatUtilisateurPipe', () => {
  // Tests d'initialisation
  describe('init', () => {
    it('doit créer le pipe', () => {
      const pipe = new FormatUtilisateurPipe();
      expect(pipe).toBeTruthy();
    });
  });

  // Tests de la méthode transform
  describe('transform', () => {
    it(`
      doit renvoyer la valeur par défaut
      quand l'utilisateur passé n'est pas défini
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = undefined;
      const defaut: string = 'ND';
      const pipe = new FormatUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur, defaut);
      
      // THEN
      expect(resultat).toBe(defaut);
    });

    it(`
      doit renvoyer une chaîne de caractère au format NOM (email)
      quand l'utilisateur passé a un nom et un email mais pas de prénom
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: 'nom',
        prenom: null,
        email: 'nom@mail.fr',
      };
      const pipe = new FormatUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('NOM (nom@mail.fr)');
    });

    it(`
      doit renvoyer une chaîne de caractère au format prenom (email)
      quand l'utilisateur passé a un prénom et un email mais pas de nom
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: null,
        prenom: 'prenom',
        email: 'prenom@mail.fr',
      };
      const pipe = new FormatUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('prenom (prenom@mail.fr)');
    });

    it(`
      doit renvoyer une chaîne de caractère au format nom prenom (Non défini)
      quand l'utilisateur passé a un prénom et un nom mais pas d'email
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur | undefined = {
        id: 0,
        nom: 'nom',
        prenom: 'prenom',
        email: null,
      };
      const pipe = new FormatUtilisateurPipe();
      
      // WHEN
      const resultat: string = pipe.transform(utilisateur);
      
      // THEN
      expect(resultat).toBe('NOM prenom (Non défini)');
    });
    
    it(`
      doit renvoyer une chaîne de caractère au format NOM prenom (email)
      quand l'utilisateur passé a un nom, prenom et email
    `, () => {
      // GIVEN
      const utilisateur: Utilisateur = {
        id: 0,
        nom: 'nom',
        prenom: 'prenom',
        email: 'test@mail.com'
      };
      const pipe = new FormatUtilisateurPipe();
  
      // WHEN
      const resultat = pipe.transform(utilisateur);
  
      // THEN
      expect(resultat).toBe('NOM prenom (test@mail.com)');
    });
  });
});
