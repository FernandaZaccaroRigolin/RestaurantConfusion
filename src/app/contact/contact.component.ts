import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  
  feedbackForm: FormGroup | any;
  feedback: Feedback | any;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective: NgForm | any;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }


  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
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


}
