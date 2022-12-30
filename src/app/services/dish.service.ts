import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => of(DISHES).pipe(delay(2000)).subscribe(result => resolve(result)));
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).subscribe(result => resolve(result))); 
  }  
  
  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).subscribe(result => resolve(result)));
  }  
    
}
