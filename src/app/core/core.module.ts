import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/components/login/login.component';

/**
 * Module Core contenant les éléments responsables de la logique coeur de l'App
 */
@NgModule({
  declarations: [LoginComponent],// Ce module n'utilise que le composant Login
  imports: [SharedModule],// En important le SharedModule, on récupère le CommonModule et le ReactiveFormsModule
})
export class CoreModule { }
