import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {SignInRequest} from "../../model/sign-in.request";

/**
 * Sign up component
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatLabel,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  implements OnInit {
  signUpForm!: FormGroup;
  submittedSignUp = false;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['', Validators.required]
    });


      const signInBtn = document.querySelector("#sign-in-btn") as HTMLButtonElement;
      signInBtn.addEventListener("click", () => {
        this.router.navigate(['/sign-in']);
      });
    }

  onSignIn(): void {
    this.container.nativeElement.classList.remove('sign-up-mode');
    this.router.navigate(['/sign-in']);
  }
  onSubmitSignUp(): void {
    if (this.signUpForm.invalid) return;
    const { username, password, roles } = this.signUpForm.value;
    const signUpRequest = new SignUpRequest(username, password, [roles]);
    this.authenticationService.signUp(signUpRequest).subscribe({
      next: () => {
        this.submittedSignUp = true;
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error signing up', error);
      }
    });
  }
}
