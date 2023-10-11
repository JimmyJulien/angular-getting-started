import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utilisateur } from '../../interfaces/utilisateur.interface';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {

  /** Utilisateur passé par le parent */
  @Input() utilisateur: Utilisateur | undefined = undefined;

  /** Emitter qui émet un évènement de sélection */
  @Output() selection = new EventEmitter<void>();

  /** Emitter qui émet un évènement de suppression */
  @Output() suppression = new EventEmitter<void>();

}
