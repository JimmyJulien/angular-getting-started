import { Component } from '@angular/core';
import { Utilisateur } from './utilisateur.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = {
    code :'angular-getting-started'
  };

  utilisateur: Utilisateur = {
    id: 1,
    nom: 'test',
    prenom: 'test',
    email: 'test@mail.fr'
  };

  utilisateurs: Utilisateur[] = [
    {id: 1, nom: 'Lovelace', prenom: 'Ada', email: 'ada.lovelace@mail.com'},
    {id: 2, nom: 'Gosling', prenom: 'James', email: 'james.gosling@mail.com'},
    {id: 3, nom: 'Gates', prenom: 'Bill', email: 'bill.gates@mail.com'},
    {id: 4, nom: 'Liskov', prenom: 'Barbara', email: 'barbara.liskov@mail.com'},
    {id: 5, nom: 'Musk', prenom: 'Elon', email: null},
  ];

  estNouveau = true;

  direCoucou(coucou: string) {
    this.estNouveau = !this.estNouveau;
    alert(`Bonjour ${coucou} !`);
  }
}
