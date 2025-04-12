import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../pages/user/data-access/user.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 userService = inject(UserService)
  alertService = inject(AlertService)
  router = inject(Router)

  registerForm! : FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  get email() {
    return this.registerForm.get('email')!;
  }
  
  get username() {
    return this.registerForm.get('username')!;
  }

  get phone() {
    return this.registerForm.get('phone')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;


    this.userService.save(this.registerForm.value).subscribe(
      (response) => {
        this.alertService.toast('Cuenta creada con exito')
        this.router.navigate(['page'])
      },
      (error) => {
        console.log(error)
        this.alertService.toast('Ocurrio un error', 'error')
      }
    )
    
  }
}
