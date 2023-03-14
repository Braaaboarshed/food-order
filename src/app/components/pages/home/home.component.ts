import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/sheared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods :Food[] =[]
  searchTerm:any
  nodata=false
  // search = ''
  constructor(
    private foodService :FoodService,
    private route :ActivatedRoute,
    private router :Router,
    private tostr :ToastrService
    ) {
    }
  ngOnInit(): void {

        this.foods= this.foodService.getAllFood()
    //   }
    // })
    this.foodService.foodToLocaleStorage()


}

//

search(searchQuery:any){
  this.foods=[]
  let searchArray= JSON.parse(localStorage.getItem('foods')!)
  searchArray.map((item:any)=>{
            console.log(item.name)
          if(item.name.toLowerCase().includes(searchQuery.toLowerCase())){
           this.foods.push(item)
           this.nodata=false
          }
           if(this.foods.length === 0){
            this.nodata = true
          }

      })


}
}
