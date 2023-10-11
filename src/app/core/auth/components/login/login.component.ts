import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthConstantes } from '../../constantes/auth.constantes';
import { AuthService } from '../../services/auth.service';

/**
 * Composant de login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // Constantes utilisées pour synchroniser les noms des champs
  // entre le template et le ts
  readonly EMAIL = 'email';
  readonly MOT_DE_PASSE = 'motDePasse';

  // Constantes utilisées pour les messages d'erreur de champ
  readonly MSG_ERR_CHAMP_OBLIGATOIRE = 'Champ obligatoire';
  readonly MSG_ERR_FORMAT_EMAIL = 'Format email non respecté';
  readonly MSG_ERR_FORMAT_MDP = 'Format mot de passe non respecté';

  /**
   * Formulaire de login constitué des champs email et motDePasse.
   * Le champ email est obligatoire et doit avoir la forme d'un email.
   * Le champ motDePasse est obligatoire et doit être constitué d'au moins 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial
   */
  loginForm = new FormGroup({
    [this.EMAIL]: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    [this.MOT_DE_PASSE]: new FormControl<string | null>(null, [Validators.required, Validators.pattern(AuthConstantes.REGEX_MOT_DE_PASSE)]),
  });

  /**
   * Getter du contrôle email
   * NOTE: non obligatoire mais pratique pour éviter d'avoir à taper 
   * this.loginForm.get('email') ou this.loginForm.controls.email à chaque fois
   */
  get emailCtrl(): FormControl {
    return this.loginForm.get(this.EMAIL) as FormControl;
  }

  /**
   * Getter du contrôle email
   * NOTE: non obligatoire mais pratique pour éviter d'avoir à taper 
   * this.loginForm.get('motDepasse') ou this.loginForm.controls.motDePasse à chaque fois
   */
  get motDePasseCtrl(): FormControl {
    return this.loginForm.get(this.MOT_DE_PASSE) as FormControl;
  }

  // On injecte le auth service pour pouvoir l'utiliser dans ce composant
  constructor(private readonly authService: AuthService) {}

  /**
   * Vérifie la saisie de l'utilisateur puis navigue vers la page des utilisateurs si les identifiants
   * sont valides, affiche une alerte d'erreur sinon
   */
  login(): void {
    // email et motDePasse ne peuvent pas être null ou undefined car ils sont obligatoires
    // donc on a le droit d'utiliser le !
    // RAPPEL : pas de logique métier dans le composant => c'est le AuthService qui se charge de ça
    this.authService.seConnecter({
      email: this.emailCtrl.value!,
      motDePasse: this.motDePasseCtrl.value!,
    });
  }
}
