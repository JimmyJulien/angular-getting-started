import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Utilisateur } from '../../interfaces/utilisateur.interface';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { PageUtilisateursComponent } from './page-utilisateurs.component';

fdescribe('PageUtilisateursComponent', () => {
  let component: PageUtilisateursComponent;
  let fixture: ComponentFixture<PageUtilisateursComponent>;
  let utilisateursServiceSpy: jasmine.SpyObj<UtilisateursService>;

  beforeEach(() => {
    utilisateursServiceSpy = jasmine.createSpyObj(['direCoucou', 'getUtilisateurs', 'ajouterUtilisateur']);

    TestBed.configureTestingModule({
      declarations: [PageUtilisateursComponent],
      providers: [
        {provide: UtilisateursService, useValue: utilisateursServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(PageUtilisateursComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    initialiser();
    
    expect(component).toBeTruthy();
  });

  it('doit appeler la méthode direCoucou du utilisateursService quand la méthode est appelée', () => {
    // GIVEN
    initialiser();
    const coucou = 'coucou';

    // WHEN
    component.direCoucou(coucou);

    // THEN
    expect(utilisateursServiceSpy.direCoucou).toHaveBeenCalledOnceWith(coucou);
  })

  it(`
    doit maj les utilisateurs
    quand l'ajout et le rafraichissement des utilisateurs se passe bien
  `,
  () => {
    // GIVEN
    initialiser();
    const utilisateur: Utilisateur = {id: 0, nom: '', prenom: '', email: ''};
    utilisateursServiceSpy.ajouterUtilisateur.and.returnValue(of(utilisateur));
    utilisateursServiceSpy.getUtilisateurs.and.returnValue(of([...component.utilisateurs, utilisateur]));
    
    // WHEN
    component.ajouterUtilisateur(utilisateur);
    
    // THEN
    expect(component.utilisateurs.length).toBe(1);
  });

  function initialiser() {
    utilisateursServiceSpy.getUtilisateurs.and.returnValue(of([]));
    fixture.detectChanges();
  }
});
