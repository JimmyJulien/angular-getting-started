import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { PageUtilisateursComponent } from './utilisateurs/components/page-utilisateurs/page-utilisateurs.component';

const routes: Routes = [
  {path: 'utilisateurs', component: PageUtilisateursComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
