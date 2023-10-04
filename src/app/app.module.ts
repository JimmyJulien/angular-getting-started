import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationUtilisateurComponent } from './creation-utilisateur/creation-utilisateur.component';
import { FormatUtilisateurPipe } from './format-utilisateur.pipe';
import { NouveauComponent } from './nouveau/nouveau.component';
import { TestPipe } from './test.pipe';
import { UtilisateurData } from './utilisateur-data';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

@NgModule({
  declarations: [
    AppComponent,
    NouveauComponent,
    UtilisateurComponent,
    TestPipe,
    FormatUtilisateurPipe,
    CreationUtilisateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(UtilisateurData),
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
