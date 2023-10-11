import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from '../../interfaces/utilisateur.interface';

/**
 * Composant de création/modification d'utilisateur
 */
@Component({
  selector: 'app-creation-modification-utilisateur',
  templateUrl: './creation-modification-utilisateur.component.html',
  styleUrls: ['./creation-modification-utilisateur.component.scss']
})
export class CreationModificationUtilisateurComponent implements OnChanges {

  // Constantes utilisées par le composant et son template
  readonly NOM = 'nom';
  readonly PRENOM = 'prenom';
  readonly EMAIL = 'email';
  readonly REQUIRED = 'required';
  readonly COUCOU = 'coucou';
  readonly CONTIENT = 'contient';
  readonly MSG_ERR_CHAMP_OBLIGATOIRE = 'Champ obligatoire';
  readonly MSG_ERR_COUCOU = 'Doit contenir coucou';
  readonly MSG_ERR_EMAIL = 'Format email non respecté';

  /**
   * Utilisateur optionnel passé par le parent
   * (si un utilisateur est passé, on est dans le cadre d'une modification, 
   * sinon on est dans le cadre d'une création)
   */
  @Input() utilisateur?: Utilisateur;

  /**
   * Nom du bouton de soumission du formulaire
   */
  nomBouton: 'Ajouter' | 'Modifier' = 'Ajouter';

  /**
   * Emitter de création d'un utilisateur
   */
  @Output() creerUtilisateur = new EventEmitter<Utilisateur>();

  /**
   * Emitter de modification d'un utilisateur
   */
  @Output() modifierUtilisateur = new EventEmitter<Utilisateur>();

  /**
   * Formulaire de création/modification
   */
  formulaire = new FormGroup({
    [this.NOM]: new FormControl<string | null>(null, [Validators.required]),
    [this.PRENOM]: new FormControl<string | null>(null, [Validators.required]),
    [this.EMAIL]: new FormControl<string | null>(null, [Validators.email]),
  });

  /**
   * Getter du champ nom
   */
  get nomCtrl(): FormControl {
    return this.formulaire.get(this.NOM) as FormControl;
  }

  /**
   * Getter du champ prenom
   */
  get prenomCtrl(): FormControl {
    return this.formulaire.get(this.PRENOM) as FormControl;
  }

  /**
   * Getter du champ email
   */
  get emailCtrl(): FormControl {
    return this.formulaire.get(this.PRENOM) as FormControl;
  }

  /**
   * Hook de cycle de vie du composant qui se déclenche à chaque changement de valeur d'un @Input
   * @param changes l'objet de changement des @Input
   */
  ngOnChanges(changes: SimpleChanges): void {
    // On récupère l'utilisateur modifié
    const utilisateurRecupere: Utilisateur | undefined = changes['utilisateur']?.currentValue;

    // S'il est défini
    if(utilisateurRecupere) {
      // On actualise les valeurs des champs du formulaire
      this.formulaire.controls.nom.setValue(utilisateurRecupere.nom || '');
      this.formulaire.controls.prenom.setValue(utilisateurRecupere.prenom || '');
      this.formulaire.controls.email.setValue(utilisateurRecupere.email || '');

      // On passe le nom du bouton à Modifier
      this.nomBouton = 'Modifier';
    }
  }

  /**
   * Méthode de soumission du formulaire
   */
  soumettreFormulaire() {
    // Si un utilisateur est défini
    if(this.utilisateur) {
      // On est dans le cadre d'une modification donc on émet un évènement de modification
      // NOTE : le nom et le prénom ne peuvent pas être null car ils sont obligatoires
      this.modifierUtilisateur.emit({
        id: this.utilisateur.id,
        nom: this.formulaire.controls.nom!.value,
        prenom: this.formulaire.controls.prenom.value,
        email: this.formulaire.controls.email.value,
      });
    }
    else {
      // Sinon on est dans le cadre d'une création donc on émet un évènement de création
      // NOTE : le nom et le prénom ne peuvent pas être null car ils sont obligatoires
      this.creerUtilisateur.emit({
        id: new Date().getTime(),
        nom: this.formulaire.controls.nom!.value,
        prenom: this.formulaire.controls.prenom.value,
        email: this.formulaire.controls.email.value,
      });
    }

    // On reset le formulaire
    this.formulaire.reset();
  }

}
