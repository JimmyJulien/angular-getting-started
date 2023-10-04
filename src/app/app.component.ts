import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Utilisateur } from './utilisateur.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  utilisateurs: Utilisateur[] = this.appService.getUtilisateurs();
  
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getTest().subscribe();
  }

  direCoucou(coucou: string | null) {
    this.appService.direCoucou(coucou);
  }

  ajouterUtilisateur(utilisateur: Utilisateur) {
    this.appService.ajouterUtilisateur(utilisateur);
  }
}
