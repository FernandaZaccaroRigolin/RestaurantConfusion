import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedback');
  }
  
  getPromotion(id: String): Observable<Feedback> {
    return this.http.get<Feedback>(baseURL + 'feedback/' + id);
  }
  
  getFeaturedPromotion(): Observable<Feedback> {
    return this.http.get<Feedback[]>(baseURL + 'feedback?featured=true').pipe(map(feedback => feedback[0]));
  }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback' , feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }    
}

