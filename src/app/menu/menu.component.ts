import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

 export class MenuComponent implements OnInit {
  dishes: Dish[] | any;
  errMess: string | any;

  constructor(private dishService: DishService,
    @Inject('baseURL') protected baseURL:any) { }
  
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

}
