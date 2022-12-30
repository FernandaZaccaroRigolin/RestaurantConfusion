import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => of(LEADERS).pipe(delay(2000)).subscribe(result => resolve(result)));
  }

getLeader(id: String): Promise<Leader> {
  return new Promise(resolve => of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).subscribe(result => resolve(result)));   
}

getFeaturedLeader(): Promise<Leader> {
  return new Promise(resolve => of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).subscribe(result => resolve(result)));  
}

}
