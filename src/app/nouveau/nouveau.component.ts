import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.scss']
})
export class NouveauComponent {

  @Input() titre: string = 'Titre à définir';

  @Output() coucou = new EventEmitter<string>();

  estDesactive = true;

  direCoucouAuParent(coucou: string) {
    this.coucou.emit(coucou);
  }
}
