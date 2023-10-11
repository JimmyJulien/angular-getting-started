import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Utilisateur } from '../interfaces/utilisateur.interface';
import { ApiUtilisateursService } from './api-utilisateurs.service';

// Tests du service ApiUtilisateursService
// NOTE: ces TU sont spéciaux car ils utilisent le HttpClientTestingModule et le HttpTestingController
// pour mocker le HttpClientModule et le HttpClient
describe('ApiUtilisateursService', () => {
  // Le service à tester
  let service: ApiUtilisateursService;

  // Le mock du HttpClient
  let httpMock: HttpTestingController;

  // L'URL de l'API à tester
  const API_URL = 'api/utilisateurs';

  // Avant chaque test (avant chaque it)
  beforeEach(() => {
    // On confnigure le module de test
    TestBed.configureTestingModule({
      // NOTE: il suffit d'importer le HttpClientTestingModule ici
      imports: [HttpClientTestingModule]
    });

    // On définit le service à tester
    service = TestBed.inject(ApiUtilisateursService);

    // On définit le mock du HttpClient
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Tests d'initialisation
  describe('init', () => {
    it('doit créer le service', () => {
      expect(service).toBeTruthy();
    });
  });

  // Tests de la méthode getAll
  describe('getAll', () => {
    it(`
      doit appeler une méthode HTTP de type GET
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateursRetournes: Utilisateur[] = [
        {id: 1, nom: 'nom1', prenom: 'prenom1', email: 'email1@mail.fr'},
        {id: 2, nom: 'nom2', prenom: 'prenom2', email: 'email2@mail.fr'},
        {id: 3, nom: 'nom3', prenom: 'prenom3', email: 'email3@mail.fr'},
      ];
      
      // WHEN
      service.getAll().subscribe(utilisateurs => {
        // THEN
        expect(utilisateurs).toEqual(utilisateursRetournes);
      });
      
      // THEN
      const requete = httpMock.expectOne(API_URL);
      expect(requete.request.method).toBe('GET');
      requete.flush(utilisateursRetournes);
    });
  });

  // Tests de la méthode create
  describe('create', () => {
    it(`
      doit appeler une méthode HTTP de type POST
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateurACreer: Utilisateur = {
        id: 1,
        nom: 'nom1',
        prenom: 'prenom1',
        email: 'email1@mail.fr'
      };
      
      // WHEN
      service.create(utilisateurACreer).subscribe(utilisateur => {
        // THEN
        expect(utilisateur).toEqual(utilisateurACreer);
      });
      
      // THEN
      const requete = httpMock.expectOne(API_URL);
      expect(requete.request.method).toBe('POST');
      requete.flush(utilisateurACreer);
    });
  });

  // Tests de la méthode update
  describe('update', () => {
    it(`
      doit appeler une méthodeHTTP de type PUT
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const utilisateurAModifier: Utilisateur = {
        id: 1,
        nom: 'nom1',
        prenom: 'prenom1',
        email: 'email1@mail.fr'
      };
      
      // WHEN
      service.update(utilisateurAModifier).subscribe(utilisateur => {
        // THEN
        expect(utilisateur).toEqual(utilisateurAModifier);
      });
      
      // THEN
      const requete = httpMock.expectOne(API_URL);
      expect(requete.request.method).toBe('PUT');
      requete.flush(utilisateurAModifier);
    });
  })

  // Tests de la méthode delete
  describe('delete', () => {
    it(`
      doit appeler une méthode HTTP de type DELETE
      quand la méthode est appelée
    `, () => {
      // GIVEN
      const idUtilisateurASupprimer: number = 42;
      const objetReponse = {suppressionOk: true};
      
      // WHEN
      service.delete(idUtilisateurASupprimer).subscribe(reponse => {
        expect(reponse).toEqual(objetReponse);
      });
      
      // THEN
      const requete = httpMock.expectOne(`${API_URL}/${idUtilisateurASupprimer}`);
      expect(requete.request.method).toBe('DELETE');
      requete.flush(objetReponse);
    });
  });
});
