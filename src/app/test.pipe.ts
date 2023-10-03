import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from './utilisateur.interface';

@Pipe({
  name: 'appTest'
})
export class TestPipe implements PipeTransform {

  transform(utilisateur: Utilisateur | undefined): 'rouge' | 'bleu' {
    console.log('coucou');
    return (!utilisateur || !utilisateur.nom || utilisateur.nom.length <= 6) ? 'rouge' : 'bleu';
  }

}
