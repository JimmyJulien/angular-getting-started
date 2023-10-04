import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from '../utilisateur.interface';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-creation-utilisateur',
  templateUrl: './creation-utilisateur.component.html',
  styleUrls: ['./creation-utilisateur.component.scss']
})
export class CreationUtilisateurComponent {

  readonly NOM = 'nom';
  readonly PRENOM = 'prenom';
  readonly EMAIL = 'email';
  readonly REQUIRED = 'required';
  readonly COUCOU = 'coucou';
  readonly CONTIENT = 'contient';
  readonly OBLIGATOIRE = 'Ce champ doit être renseigné';
  readonly ERREUR_COUCOU = 'DOIT contenir coucou';
  readonly AJOUTER = 'Ajouter';

  @Output() creerUtilisateur = new EventEmitter<Utilisateur>();

  // formulaire = new FormGroup({
  //   [this.NOM]: new FormControl<string | null>(null, [Validators.required]),
  //   [this.PRENOM]: new FormControl<string | null>(null, [Validators.required]),
  //   [this.EMAIL]: new FormControl<string | null>(null),
  // });

  formulaire = this.fb.group({
    [this.NOM]: this.fb.control('', [Validators.required, CustomValidators.coucou]),
    [this.PRENOM]: ['', Validators.required],
    [this.EMAIL]: ['']
  });

  get nomCtrl(): FormControl {
    return this.formulaire.controls.nom;
    // return this.formulaire.get(this.NOM) as FormControl;
  }

  get controlePrenom(): FormControl {
    return this.formulaire.controls.prenom;
    // return this.formulaire.get(this.PRENOM) as FormControl;
  }

  constructor(private fb: NonNullableFormBuilder) {}

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
