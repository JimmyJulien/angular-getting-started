import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from '../../interfaces/utilisateur.interface';

@Component({
  selector: 'app-creation-utilisateur',
  templateUrl: './creation-utilisateur.component.html',
  styleUrls: ['./creation-utilisateur.component.scss']
})
export class CreationUtilisateurComponent implements OnInit, OnChanges {

  readonly NOM = 'nom';
  readonly PRENOM = 'prenom';
  readonly EMAIL = 'email';
  readonly REQUIRED = 'required';
  readonly COUCOU = 'coucou';
  readonly CONTIENT = 'contient';
  readonly OBLIGATOIRE = 'Ce champ doit être renseigné';
  readonly ERREUR_COUCOU = 'DOIT contenir coucou';
  readonly AJOUTER = 'Ajouter';
  readonly MODIFIER = 'Modifier';

  @Input() utilisateur?: Utilisateur;

  nomBouton: string = this.AJOUTER;

  @Output() creerUtilisateur = new EventEmitter<Utilisateur>();
  @Output() modifierUtilisateur = new EventEmitter<Utilisateur>();

  // formulaire = new FormGroup({
  //   [this.NOM]: new FormControl<string | null>(null, [Validators.required]),
  //   [this.PRENOM]: new FormControl<string | null>(null, [Validators.required]),
  //   [this.EMAIL]: new FormControl<string | null>(null),
  // });

  formulaire = this.fb.group({
    [this.NOM]: this.fb.control('', [Validators.required]),
    [this.PRENOM]: ['', Validators.required],
    [this.EMAIL]: ['']
  });

  get nomCtrl(): FormControl {
    return this.formulaire.controls.nom;
    // return this.formulaire.get(this.NOM) as FormControl;
  }

  get prenomCtrl(): FormControl {
    return this.formulaire.controls.prenom;
    // return this.formulaire.get(this.PRENOM) as FormControl;
  }

  get emailCtrl(): FormControl {
    return this.formulaire.controls.email;
    // return this.formulaire.get(this.PRENOM) as FormControl;
  }

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const utilisateurRecupere: Utilisateur | undefined = changes['utilisateur']?.currentValue;

    if(utilisateurRecupere) {
      this.formulaire.controls.nom.setValue(utilisateurRecupere.nom || '');
      this.formulaire.controls.prenom.setValue(utilisateurRecupere.prenom || '');
      this.formulaire.controls.email.setValue(utilisateurRecupere.email || '');

      this.nomBouton = this.MODIFIER;
    }
  }

  ngOnInit(): void {
    

    // setTimeout(() => {
    //   this.formulaire.disable();
    // }, 3000);

    // this.formulaire.controls.test.valueChanges.subscribe(valeur => console.log(`Valeur test : ${JSON.stringify(valeur)}`))

    /*
    this.formulaire.valueChanges.subscribe(valeur => console.log(`Valeur formulaire : ${JSON.stringify(valeur)}`))
    this.formulaire.statusChanges.subscribe(valeur => console.log(`Statut : ${valeur}`))
    */
  }

  soumettreFormulaire() {
    if(this.utilisateur) {
      const utilisateur: Utilisateur = {
        id: this.utilisateur.id,
        nom: this.formulaire.controls.nom!.value,
        prenom: this.formulaire.controls.prenom.value,
        email: this.formulaire.controls.email.value,
      };

      this.modifierUtilisateur.emit(utilisateur);
    }
    else {
      // NOTE : le nom et le prénom ne peuvent pas être NULL car ils sont required
      const utilisateur: Utilisateur = {
        id: new Date().getTime(),
        nom: this.formulaire.controls.nom!.value,
        prenom: this.formulaire.controls.prenom.value,
        email: this.formulaire.controls.email.value,
      };
  
      this.creerUtilisateur.emit(utilisateur);
    }
  }

}
