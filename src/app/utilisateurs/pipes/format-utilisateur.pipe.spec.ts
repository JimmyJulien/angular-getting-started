import { Utilisateur } from '../interfaces/utilisateur.interface';
import { FormatUtilisateurPipe } from './format-utilisateur.pipe';

describe('FormatUtilisateurPipe', () => {

  fit('create an instance', () => {
    const pipe = new FormatUtilisateurPipe();
    expect(pipe).toBeTruthy();
  });

  fit(`
    Doit afficher NOM prenom (email)
    Quand un utilisateur avec un nom, prenom et email est passé
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
