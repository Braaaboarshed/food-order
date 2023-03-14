import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from '../data';
import { FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../sheared/constants/urls';
import {FOODS_BY_SEARCH_URL } from '../sheared/constants/urls';

import { Food } from '../sheared/models/food';
import { Tag } from '../sheared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http :HttpClient) { }

  getAll ():Observable<Food[]>{

    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearchTerm(searchTerm: string){
  let searchArray= JSON.parse(localStorage.getItem('foods')!)

    searchArray.map((item:any)=>{
      if(item.name.includes(searchTerm)){
       let result  = item.id
        return result
      }
    })





  }

  getAllTag():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }
  getAllFoodByTag (tag :string) :Observable<any>{
    return   tag === 'All'?
    this.getAll() :
    this.http.get(FOODS_BY_TAG_URL+tag)
  }
getFoodById(id:string) :Observable<any>{
  return this.http.get(FOOD_BY_ID_URL+id)
}

foodToLocaleStorage(){
  localStorage.setItem('foods',JSON.stringify(sample_foods))
}

getAllFood(){
  // localStorage.getItem('foods',JSON.parse())
  let foods = JSON.parse(localStorage.getItem('foods')!)
  return foods
}

}
