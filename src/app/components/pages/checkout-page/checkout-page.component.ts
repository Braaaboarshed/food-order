import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/sheared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  show =true
  nodata = false
  checkoutForm!: FormGroup;
  constructor(
              private cartService:CartService,
              private formBuilder: FormBuilder,
              private router :Router,
              private userService: UserService,
              private toastrService: ToastrService) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
              }

  ngOnInit(): void {

    let name = this.userService.currentUser.username;
    console.log(name)
    this.checkoutForm = this.formBuilder.group({
      name : [name,Validators.required],
      address :['',Validators.required]
    })

    this.cartService.getCartObservable().subscribe(cart=>{
      if(cart.items.length == 0){
        this.nodata = true
      }
    })
  }



    createOrder(){

        this.order.name = this.checkoutForm.value.name
        this.order.address = this.checkoutForm.value.address
        this.toastrService.success('your order is successfully done')
        this.cartService.clearCart()
        this.router.navigate(['./'])

      }


}
