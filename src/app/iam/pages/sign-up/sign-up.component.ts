import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";

import {NgIf} from "@angular/common";
import {Router, NavigationEnd,NavigationStart} from "@angular/router";
import gsap from 'gsap';

/**
 * Sign up component
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    NgIf

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submittedSignUp = false;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        gsap.to(this.container.nativeElement, {
          opacity: 0,
          duration: 0.2
        });
      } else if (event instanceof NavigationEnd) {
        gsap.from(this.container.nativeElement, {
          opacity: 0,
          duration: 0.2
        });
      }
    });
  }

  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['', Validators.required]
    });
  }

  onSignIn(): void {
    const elements = this.container.nativeElement.querySelectorAll('.title, .input-field, .btn, .social-text, .social-media, .panel .content, .panel img, .auth-input-group');
    gsap.timeline()
      .to(elements, {
        y: -20,
        duration: 0.1,
        ease: "bounce.out",
        stagger: 0.1
      })
      .to(elements, {
        x: '100vw',
        duration: 0.1,
        ease: "power1.inOut",
        stagger: 0.1
      })
      .to(elements, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          this.router.navigate(['/sign-in']);
        }
      });
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
