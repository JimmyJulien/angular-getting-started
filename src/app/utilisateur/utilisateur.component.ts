import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utilisateur } from '../utilisateur.interface';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {

  @Input()
  utilisateur: Utilisateur | undefined = undefined;

  @Output()
  coucou = new EventEmitter<string | null>();

  maDate = new Date();

  direCoucou() {
    this.coucou.emit(this.utilisateur ? this.utilisateur.prenom : 'Pas de prénom');
  }
  
}
