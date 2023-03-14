import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../sheared/constants/urls';
import { IUserLogin } from '../sheared/interfaces/IUserLogin';
import { User } from '../sheared/models/User';
import { CartService } from './cart.service';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable :Observable<User> ;

  constructor(
    private http:HttpClient,
    private toastr:ToastrService,
    private cartService :CartService,
    private router :Router
    ) {

    this.userObservable = this.userSubject.asObservable()
  }

  login(userLogin :IUserLogin):Observable<User>{
    return this.http.post<User>("https://dummyjson.com/auth/login", userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user)
          console.log(user)
          this.toastr.success(
            `welcome to xfood ${user.username}`,
            'Login successful'
            )
            this.userSubject.next(user)

        },
        error:(errorResponse)=>{
          this.toastr.error(errorResponse.message,'Login failed')
        }
      })
    );
  }
  private setUserToLocalStorage(user:User){
    localStorage.setItem('user',JSON.stringify(user))
  }

  public get currentUser(){
    return this.userSubject.value
  }

  private getUserFromLocalStorage(){

    const userJson = localStorage.getItem('user')
    if(userJson) return JSON.parse(userJson)
    return new User
  }

  logout(){
    localStorage.removeItem('user')
    this.userSubject.next(new User)
    this.cartService.clearCart()
    window.location.reload()
  }


  register(user:any){
    localStorage.setItem('users',JSON.stringify(user))
    localStorage.setItem('user',JSON.stringify(user))
    this.toastr.success(
      `welcome to xfood ${user.username}`,
      'Login successful'
      )
      this.userSubject.next(user)
      this.router.navigate(['./'])



  }
}
