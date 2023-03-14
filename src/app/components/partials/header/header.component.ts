import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/sheared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user :any
inCart !:number
navbar =false
  constructor(
    private userService:UserService,
    private router :Router,
    private cartService :CartService
  ) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(res=>{
    this.inCart = res.items.length
    })
    this.userService.userObservable.subscribe(user=>{
        // this.username = user.name

        this.user =user
      console.log(this.user.username)
    })


  }




  logout(){
    this.userService.logout()
  }
}
