import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserdefinedModule } from '../../modules/userdefined/userdefined.module';
import { AuthService } from '../../service/auth.service';
import { LoginForm, LoginResponse } from '../../models/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    UserdefinedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  constructor(private fb: FormBuilder,private authService : AuthService, private messageService: MessageService,private route: Router) { }



  ngOnInit(): void {

  }
  loginForm = this.fb.group({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  


  onSubmit() {
    var login = {...this.loginForm.value};
    this.authService.loginUser(login as LoginForm).subscribe(
      {
        next: (data) => {
          var response = data as LoginResponse;
          var statusCode = response.statusCode;
          if(statusCode == "0"){
            localStorage.setItem('token', response.token);
            this.messageService.add({severity:'success', summary:'Success', detail:'Login Successful'});
            this.route.navigate(['/dashboard']);
          }
          else{
            console.log(response.statusMessage);
            this.messageService.add({severity:'error', summary:'Error', detail: 'Login Failed!'});
          }
          
          
        },
        error: (error) => {
          console.log(error);
      }
    }

    )
  }

  showToast( severity: string, summary: string, detail: string) {
    this.messageService.add({severity:severity, summary:summary, detail:detail});
}

}
