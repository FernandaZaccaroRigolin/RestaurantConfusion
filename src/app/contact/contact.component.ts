
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { flyInOut } from '../animations/app.animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]  

})
export class ContactComponent implements OnInit {
  
  feedbackForm: FormGroup | any;
  errMess: string | any; 
  feedback: Feedback | any;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective: NgForm | any;
  // feedbackcopy: Feedback| any;

  formErrors : any= {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages : any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  constructor(private feedbackservice: FeedbackService,
    private fb: FormBuilder,
    @Inject('baseURL') protected baseURL:any) {
    this.createForm();
  }

  // constructor(private dishservice: DishService,
  //   private route: ActivatedRoute,
  //   private location: Location,
  //   private fb: FormBuilder,
  //   private datePipe: DatePipe,
  //   @Inject('baseURL') protected baseURL:any) { 
  //     this.createForm();
  //   }


  
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    }) ;

    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field]  = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;

    this.feedbackservice.postFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedback = feedback; this.feedback = feedback;
    },
    errmess => { this.feedback = null; this.feedback = null; this.errMess = <any>errmess; });

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }


  // onSubmit() {
  //   this.frComment = this.commentForm.value;
  //   this.dishcopy.comments.push(this.frComment);
  //   this.dishservice.putDish(this.dishcopy)
  //     .subscribe(dish => {
  //       this.dish = dish; this.dishcopy = dish;
  //     },
  //     errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

  //   this.commentForm.reset({
  //     author: '',
  //     rating: 5,
  //     comment: ''
      
  //   });
  //   this.commentFormDirective.resetForm();
  // }  

  ngOnInit() {
    // this.feedbackservice.getFeedbackIds()
    // .subscribe(dishIds => this.dishIds = dishIds,
    //   errmess => this.errMess = <any>errmess);
    // this.route.params.pipe(switchMap((params: Params) => this.feedbackservice.getFeedback(params['id'])))
    // .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); });
  }



}
