import { Component } from '@angular/core';

/**
 * Composant root de l'application
 * NOTE: c'est ce composant qui est utilisé dans le index.html 
 * qui est le point d'entrée de l'app
 */
@Component({
  selector: 'app-root',
  // NOTE: il est possible de créer un composant sans styles (comme ici)
  // mais aussi sans sélecteur (s'il n'est pas utilisé)
  // Seul le template est obligatoire
  templateUrl: './app.component.html'
})
export class AppComponent {}
