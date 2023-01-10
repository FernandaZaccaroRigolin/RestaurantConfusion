import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location, DatePipe  } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish | any;

  dishIds: string[] | any;
  prev: string | any;
  next: string | any;

  commentForm: FormGroup | any;
  frComment: Comment | any;
  // contactType = ContactType;
  @ViewChild('fform') commentFormDirective: NgForm | any;
  
  formComments : any= {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages : any = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'Rating is required.',
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'comment must be at least 2 characters long.',
      // 'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    @Inject('baseURL') protected baseURL:any) { 
      this.createForm();
    }

    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ], 
        rating: ['', [Validators.required]],
        comment: ['', [Validators.required, Validators.minLength(2)] ] ,//, Validators.maxLength(25)
      }) ;
      this.commentForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
      this.onValueChanged(); // (re)set validation messages now     
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formComments) {
        if (this.formComments.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formComments[field]  = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formComments[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    onChange(event: any) {
      this.commentForm.patchValue({ 'rating': event.target.value });
    }    

    onSubmit() {
      this.frComment = this.commentForm.value;
      this.dish.comments.push(
        {
          rating: this.frComment.rating,
          comment: this.frComment.comment,
          author: this.frComment.author,
          date: this.datePipe.transform(new Date(),'yyyy-MM-dd  h:mm:ssZZZZZ')
      }        

      ) 

      this.commentForm.reset({
        author: '',
        rating: '',
        comment: ''
        
      });
      this.commentFormDirective.resetForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string | undefined) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }  

  goBack(): void {
    this.location.back();
  }



}