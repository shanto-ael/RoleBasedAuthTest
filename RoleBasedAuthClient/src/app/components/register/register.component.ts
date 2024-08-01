import { Component, OnInit } from '@angular/core';
import { UserdefinedModule } from '../../modules/userdefined/userdefined.module';
import { Form, FormBuilder, FormControl, FormControlOptions, Validators } from '@angular/forms';
import { confirmPasswordValidation } from '../../shared/password-match.directive';
import { AuthService } from '../../service/auth.service';
import { UserForm } from '../../models/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [UserdefinedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService,private messageService : MessageService,private router: Router) { }

  ngOnInit(): void { }
  registerForm = this.fb.group(
    {
      userName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
    Validators: confirmPasswordValidation 
  } as FormControlOptions
  );

  // matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  //   debugger;
  //   return (abstractControl: AbstractControl) => {
  //       const control = abstractControl.get(controlName);
  //       const matchingControl = abstractControl.get(matchingControlName);

  //       if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
  //           return null;
  //       }

  //       if (control!.value !== matchingControl!.value) {
  //         const error = { confirmedValidator: 'Passwords do not match.' };
  //         matchingControl!.setErrors(error);
  //         return error;
  //       } else {
  //         matchingControl!.setErrors(null);
  //         return null;
  //       }
  //   }
  // }

  get email() {
    return this.registerForm.controls['email'];
  }
  get userName() {
    return this.registerForm.controls['userName'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  onSubmit() {
    //console.log(this.registerForm.value);
    const userData = { ...this.registerForm.value };
    delete userData.confirmPassword;
    this.authService.registerUser(userData as UserForm).subscribe({
      next: data => {
        if(data==true){
          this.showToast("success","Success","Registered Successfully");
          this.router.navigate(['/login']);
        }
        else{
          this.showToast("danger","Error","Registration Failed");
        }
      },
      error: error => {
        console.log(error);
      }
    }

    )

  }

  showToast( severity: string, summary: string, detail: string) {
    this.messageService.add({severity:severity, summary:summary, detail:detail});
}
}
