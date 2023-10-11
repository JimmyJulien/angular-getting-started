import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Utilisateur } from '../../utilisateurs/interfaces/utilisateur.interface';

/**
 * Classe permettant de définir une fausse base de données pour s'entraîner à faire des appels HTTP
 * (utilisé par le package angular-in-memory-web-api uniquement)
 */
export class DbData implements InMemoryDbService {

  /**
   * Créer une fausse base de données utilisable par AngularInMemoryWebApi
   * @returns un objet constitué de clés associées à des listes d'objet  qui simulent une base de données
   */
  createDb(): {[key: string]: unknown[]} {
    // On définit la liste d'utilisateurs de notre fausse base de données
    const utilisateurs: Utilisateur[] = [
      {id: 1, nom: 'Lovelace', prenom: 'Ada', email: 'ada.lovelace@mail.com'},
      {id: 2, nom: 'Gosling', prenom: 'James', email: 'james.gosling@mail.com'},
      {id: 3, nom: 'Gates', prenom: 'Bill', email: 'bill.gates@mail.com'},
      {id: 4, nom: 'Liskov', prenom: 'Barbara', email: 'barbara.liskov@mail.com'},
      {id: 5, nom: 'Musk', prenom: 'Elon', email: null},
      {id: 6, nom: null, prenom: null, email: null}
    ];

    // On les ajoute à l'objet qui simule la base de données
    // NOTE : {utilisateurs} est un raccourci pour {utilisateurs: utilisateurs}
    return {utilisateurs};
  }
}
