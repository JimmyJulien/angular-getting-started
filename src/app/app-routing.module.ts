import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUtilisateursComponent } from './page-utilisateurs/page-utilisateurs.component';

const routes: Routes = [
  {path: 'utilisateurs', component: PageUtilisateursComponent},
  {path: '', redirectTo: 'utilisateurs', pathMatch: 'full'},
  {path: '**', redirectTo: 'utilisateurs'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
