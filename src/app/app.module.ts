import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormatUtilisateurPipe } from './format-utilisateur.pipe';
import { NouveauComponent } from './nouveau/nouveau.component';
import { TestPipe } from './test.pipe';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

@NgModule({
  declarations: [
    AppComponent,
    NouveauComponent,
    UtilisateurComponent,
    TestPipe,
    FormatUtilisateurPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
