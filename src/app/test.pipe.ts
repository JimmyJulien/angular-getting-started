import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from './utilisateur.interface';

@Pipe({
  name: 'appTest'
})
export class TestPipe implements PipeTransform {

  transform(utilisateur: Utilisateur | undefined): 'rouge' | 'bleu' {
    return (!utilisateur || !utilisateur.nom || utilisateur.nom.length <= 6) ? 'rouge' : 'bleu';
  }

}
