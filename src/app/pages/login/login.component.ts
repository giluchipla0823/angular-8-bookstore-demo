import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Response } from '../../utils/Response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('formulario inválido');
      return;
    }

    this.login(this.loginForm.value);
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

  login(params: any): void {
    this.authService.login(params.email, params.password)
        .subscribe(() => {
            this.router.navigate(['/security']);
        }, (error: HttpErrorResponse) => {
            if (error.status === Response.HTTP_UNAUTHORIZED) {
              Swal.fire({
                title: 'Error',
                text: error.error.message,
                type: 'error'
              });

              return;
            }

            console.log(error);

        });
  }
}
