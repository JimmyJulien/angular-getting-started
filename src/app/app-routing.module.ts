import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingConstantes } from './app-routing.constantes';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { UtilisateursComponent } from './utilisateurs/components/utilisateurs/utilisateurs.component';

/**
 * Routes utilisées pour le routage
 * NOTE: notre définition des routes n'est pas la plus optimisée
 * (voir la partie lazy loading dans la formation Angular Project)
 */
const routes: Routes = [
  // Route pour naviguer vers la page de login
  {path: AppRoutingConstantes.ROUTE_LOGIN, component: LoginComponent},
  // Route pour naviguer vers l'écran des Utilisateurs
  {path: AppRoutingConstantes.ROUTE_UTILISATEURS, component: UtilisateursComponent, canActivate: [AuthGuard]},
  // Route de redirection lorsque l'utilisateur navigue à la racine de l'app
  {path: '', redirectTo: AppRoutingConstantes.ROUTE_LOGIN, pathMatch: 'full'},
  // Route de redirection lorsque l'utilisateur saisit une url qui n'est liée à aucune route
  {path: '**', redirectTo: AppRoutingConstantes.ROUTE_LOGIN},
];

/**
 * Module de routing coeur de l'application
 */
@NgModule({
  // Les modules de routing importent et exportent toujours le RouterModule
  // NOTE: forRoot permet de définir les routes initiales du RouterModule
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
