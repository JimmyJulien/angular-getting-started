import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl(),
    motDePasse: new FormControl(),
  });

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['utilisateurs']);
  }
}
