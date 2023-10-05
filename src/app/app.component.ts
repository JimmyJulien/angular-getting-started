import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Utilisateur } from './utilisateur.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  utilisateurs: Utilisateur[] = [];
  utilisateurSelectionne: Utilisateur | undefined = undefined;
  
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getUtilisateurs().subscribe(utilisateurs => this.utilisateurs = utilisateurs);
  }

  direCoucou(coucou: string | null) {
    this.appService.direCoucou(coucou);
  }

  ajouterUtilisateur(utilisateur: Utilisateur) {
    this.appService.ajouterUtilisateur(utilisateur).subscribe(utilisateur => this.utilisateurs.push(utilisateur));
  }

  modifierUtilisateur(utilisateurAModifier: Utilisateur) {
    this.appService.modifierUtilisateur(utilisateurAModifier).subscribe(() => {
      const nouveauxUtilisateurs = [...this.utilisateurs].filter(utilisateur => utilisateur.id !== utilisateurAModifier.id);
      nouveauxUtilisateurs.push(utilisateurAModifier);
      this.utilisateurs = nouveauxUtilisateurs;
    });
  }

  selectionnerUtilisateur(utilisateur: Utilisateur) {
    this.utilisateurSelectionne = utilisateur;
  }

  supprimerUtilisateur(id: number) {
    this.appService.supprimerUtilisateur(id).subscribe(() => {
      this.utilisateurs = [...this.utilisateurs].filter(utilisateur => utilisateur.id !== id);
    });
  }
}
