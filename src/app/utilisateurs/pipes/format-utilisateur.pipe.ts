import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../interfaces/utilisateur.interface';

/**
 * Pipe qui formate l'utilisateur passé en paramètre au format NOM prenom (email)
 */
@Pipe({
  name: 'appFormatUtilisateur'
})
export class FormatUtilisateurPipe implements PipeTransform {

  /**
   * Transforme l'utilisateur passé en paramètre en chaîne de caractères au format NOM prenom (email)
   * @param utilisateur l'utilisateur à formater
   * @param defaut la valeur par défaut si l'utilisateur n'est pas défini
   * @returns la chaîne de caractères formatée
   */
  transform(utilisateur: Utilisateur | undefined, defaut: string = '-'): string {
    // Si l'utilisateur n'est pas défini, on renvoie la valeur par défaut
    if(!utilisateur) return defaut;
    
    // On récupère le nom et on le passe en majuscule
    const nomMajuscule: string | null = utilisateur.nom?.toUpperCase() || null;

    // On récupère le prénom
    const prenom: string | null = utilisateur.prenom;

    // On récupère le mail (on le remplace par Non défini s'il est null)
    const email: string | null = utilisateur.email || 'Non défini';

    // Si le nom et le prenom sont null, on renvoie defaut (email)
    if(!nomMajuscule && !prenom) return `${defaut} (${email})`;

    // Si le nom est défini mais pas le prénom, on renvoie NOM (email)
    if(nomMajuscule && !prenom) return `${nomMajuscule} (${email})`;

    // Si le prénom est défini mais pas le nom, on renvoie prenom (email)
    if(!nomMajuscule && prenom) return `${prenom} (${email})`;

    // Sinon, le nom et le prénom sont définis donc on renvoie NOM prenom (email)
    return `${nomMajuscule} ${prenom} (${email})`;
  }

}
