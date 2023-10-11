import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DbData } from './core/data/db-data';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

/**
 * Module root de l'application
 */
@NgModule({
  // Composants, directives et pipes utilisés par le module
  // (ici AppComponent est le seul composant nécessaire)
  declarations: [
    AppComponent
  ],
  // Modules 
  imports: [
    BrowserModule,// Module contenant les fonctionnalités de base Angular
    AppRoutingModule,// Module de routing du module
    HttpClientModule,// Module Http
    InMemoryWebApiModule.forRoot(DbData),// Module qui simule le back
    CoreModule,// Module Core qui contient le login entre autre
    UtilisateursModule,// Module utilisateurs
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
