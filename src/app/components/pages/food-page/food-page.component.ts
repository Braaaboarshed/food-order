import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/sheared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  foods!: any;
  id !:number
  food:any
  constructor (
   private  route:ActivatedRoute,
   private foodService:FoodService,
   private router: Router,
   private cartService :CartService,
   private tostar :ToastrService
   ) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params.id)
    //   foodService.getFoodById(params.id).subscribe(serverFood => {
    //     this.food = serverFood;
    //   });
   //})
   }

  ngOnInit(): void {
    this.getSingleFood()
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  getSingleFood(){
    this.route.params.subscribe(param=>{
      this.id =param['id']
    })
    this.foods = JSON.parse(localStorage.getItem('foods')!)
    this.food = this.foods[this.id-1]

  }

}
