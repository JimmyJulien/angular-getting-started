import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Utilisateur } from '../utilisateurs/interfaces/utilisateur.interface';

export class DbData implements InMemoryDbService {

  createDb() {
    
    const utilisateurs: Utilisateur[] = [
      {id: 1, nom: 'Lovelace', prenom: 'Ada', email: 'ada.lovelace@mail.com'},
      {id: 2, nom: 'Gosling', prenom: 'James', email: 'james.gosling@mail.com'},
      {id: 3, nom: 'Gates', prenom: 'Bill', email: 'bill.gates@mail.com'},
      {id: 4, nom: 'Liskov', prenom: 'Barbara', email: 'barbara.liskov@mail.com'},
      {id: 5, nom: 'Musk', prenom: 'Elon', email: null},
      {id: 6, nom: null, prenom: null, email: null}
    ];

    return {utilisateurs};
  }
}
