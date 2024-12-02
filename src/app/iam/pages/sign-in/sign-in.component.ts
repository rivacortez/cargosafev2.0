import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {SignUpRequest} from "../../model/sign-up.request";

/**
 * Sign in component
 */
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatError,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    NgIf,
    MatLabel,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent  implements OnInit {
  signInForm!: FormGroup;
  submittedSignIn = false;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const signUpBtn = document.querySelector("#sign-up-btn") as HTMLButtonElement;
    signUpBtn.addEventListener("click", () => {
      this.router.navigate(['/sign-up']);
    });
  }
  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
  onSubmitSignIn(): void {
    if (this.signInForm.invalid) return;
    const { username, password } = this.signInForm.value;
    const signInRequest = new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest).subscribe({
      next: (response) => {
        this.submittedSignIn = true;
        localStorage.setItem('token', response.token);
        this.authenticationService.updateSignedInUserRoles(response.roles);
      },
      error: (error) => {
        console.error('Error signing in', error);
      }
    });
  }
}
