import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../interfaces/utilisateur.interface';

@Pipe({
  name: 'appFormatUtilisateur'
})
export class FormatUtilisateurPipe implements PipeTransform {

  transform(utilisateur: Utilisateur | undefined, defaut: string = '-'): string {
    
    if(!utilisateur || (!utilisateur.nom && !utilisateur.prenom && !utilisateur.email))
      return defaut;

    const nom = utilisateur.nom || '';

    const prenom = utilisateur.prenom || '';

    const email = utilisateur.email || 'Non défini';

    return `${nom} ${prenom} (${email})`;
  }

}
