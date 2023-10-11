import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  // Composant à tester
  let component: LoginComponent;

  // Wrapper du composant à tester pour simplifier le testing
  let fixture: ComponentFixture<LoginComponent>;

  // Espion du AuthService
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  // Avant chaque TU (avant chaque it)
  beforeEach(() => {
    // On définit l'espion du AuthService
    authServiceSpy = jasmine.createSpyObj(['seConnecter']);

    // On configure le module de test
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      // On importe le ReactiveFormsModule pour que le formulaire du composant
      // puisse être initialisé
      imports: [ReactiveFormsModule],
      // On utilise l'espion du AuthService lorsque celui-ci est appelé
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    });

    // On définit le wrapper de test du composant
    fixture = TestBed.createComponent(LoginComponent);

    // On définit le composant à tester
    component = fixture.componentInstance;

    // On lance un cycle de détection de changement
    // pour initialiser le composant à tester 
    fixture.detectChanges();
  });

  // Tests de l'initi du composant
  describe('init', () => {
    it('doit créer le composant', () => {
      expect(component).toBeTruthy();
    });
  })

  // Tests de la méthode login
  describe('login', () => {
    it(`
      doit appeler la méthode seConnecter du AuthService avec les valeurs du loginForm
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const emailValue: string = 'test@mail.fr';
      component.emailCtrl.setValue(emailValue);

      const motDePasseValue: string = 'M0tD3P4553';
      component.motDePasseCtrl.setValue(motDePasseValue);

      // WHEN
      component.login();
      
      // THEN
      expect(authServiceSpy.seConnecter).toHaveBeenCalledOnceWith({
        email: emailValue,
        motDePasse: motDePasseValue
      });
    });
  });

});
