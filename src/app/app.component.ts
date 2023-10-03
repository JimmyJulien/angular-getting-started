import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from './utilisateur.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = {
    code :'angular-getting-started'
  };

  utilisateurs: Utilisateur[] = [
    {id: 1, nom: 'Lovelace', prenom: 'Ada', email: 'ada.lovelace@mail.com'},
    {id: 2, nom: 'Gosling', prenom: 'James', email: 'james.gosling@mail.com'},
    {id: 3, nom: 'Gates', prenom: 'Bill', email: 'bill.gates@mail.com'},
    {id: 4, nom: 'Liskov', prenom: 'Barbara', email: 'barbara.liskov@mail.com'},
    {id: 5, nom: 'Musk', prenom: 'Elon', email: null},
    {id: 6, nom: null, prenom: null, email: null}
  ];

  estNouveau: boolean = true;

  form = new FormGroup({
    test: new FormControl({value: this.title.code, disabled: false}, [Validators.required]),
    test2: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    console.log(this.form);
    
    this.form.get('test')?.valueChanges.subscribe(valeur => console.log(valeur));
  }

  direCoucou(coucou: string | null) {
    this.estNouveau = !this.estNouveau;
    alert(`Bonjour ${coucou} !`);
    console.log(this.form.value);
  }
}
