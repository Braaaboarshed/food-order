import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!:FormGroup;
  user:any
  constructor(
    private formBuilder: FormBuilder,
    private service :UserService,
    private route:ActivatedRoute,
    private router :Router,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });



  }
  register(){
    const model=this.registerForm
    this.service.register(model.value)
   

  }

}
