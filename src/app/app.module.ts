import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbData } from './core/db-data';
import { LoginComponent } from './core/login/login.component';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UtilisateursModule,
    LoginComponent,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(DbData),
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
