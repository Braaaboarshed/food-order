import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl=''
  constructor(
    private formBuilder: FormBuilder,
    private service :UserService,
    private route:ActivatedRoute,
    private router :Router
    ) { }

  ngOnInit(): void {
  
    this.loginForm = this.formBuilder.group({
      username:['', [Validators.required]],
      password:['', Validators.required]
    });
    this.returnUrl= this.route.snapshot.queryParams['returnUrl'];
  }



  login(){
    this.service.login({
      username:this.loginForm.value.username,
      password:this.loginForm.value.password
    }).subscribe(()=>{

     this.router.navigateByUrl(this.returnUrl)

    })

}
}
