import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../interfaces/utilisateur.interface';

/**
 * Pipe qui définit la couleur de l'utilisateur selon la longueur de son nom
 */
@Pipe({
  name: 'appCouleurUtilisateur'
})
export class CouleurUtilisateurPipe implements PipeTransform {

  /**
   * Transforme le nombre de caractères du nom de l'utilisateur passé en paramètre en couleur
   * @param utilisateur l'utilisateur dont on souhaite définir la couleur
   * @returns la couleur de l'utilisateur
   */
  transform(utilisateur: Utilisateur | undefined): 'rouge' | 'bleu' {
    return (!utilisateur || !utilisateur.nom || utilisateur.nom.length <= 6) ? 'rouge' : 'bleu';
  }

}
