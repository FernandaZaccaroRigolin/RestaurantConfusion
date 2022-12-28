import { Component } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  leaders: Leader[] | any;

  constructor(private leaderService: LeaderService) { }  
  ngOnInit() {
    this.leaders = this.leaderService.getLeaders();
  }


}