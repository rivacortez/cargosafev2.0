import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";
import {Router, NavigationEnd,NavigationStart} from "@angular/router";
import gsap from 'gsap';

/**
 * Sign in component
 */
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [

    ReactiveFormsModule,

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
    this.signInForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignUp(): void {
    const elements = this.container.nativeElement.querySelectorAll('.title, .input-field, .btn, .social-text, .social-media, .panel .content, .panel img');
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
          this.router.navigate(['/sign-up']);
        }
      });
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
