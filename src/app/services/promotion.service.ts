import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
/*
getLeaders(): Promise<Leader[]> {
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }

getLeader(id: String): Promise<Leader> {
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((dish) => (dish.id === id))[0]), 2000);
  });
}

getFeaturedLeader(): Promise<Leader> {
  return  new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((dish) => dish.featured)[0]), 2000);
  });  
}

*/
  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => of(PROMOTIONS).pipe(delay(2000)).subscribe(result => resolve(result)));     
    
  }
  
  getPromotion(id: String): Promise<Promotion> {
    return new Promise(resolve => of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).subscribe(result => resolve(result)));     
  }
  
  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).subscribe(result => resolve(result)));       
  }
}

