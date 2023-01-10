import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  dish: Dish | any;
  dishErrMess: string | any;
  promotion: Promotion | any;
  promotionErrMess: string | any;
  leader: Leader | any;
  leaderErrMess: string | any;
  

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') protected baseURL:any) {

  }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);

    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promotionErrMess = <any>errmess);

    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);
  }

 }