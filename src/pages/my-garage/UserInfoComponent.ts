import {OnInit, Component} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'box',
  templateUrl: 'box.html'
})

export class UserInfoComponent implements OnInit {
  myForm: FormGroup;
  userInfo: {name: string, email: string, phone: string} = {name: '', email: '', phone: ''};
  constructor(public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {

    this.loadData();
  }

  loadData():void{
    this.userInfo = {name: 'John', email: 'j.woo@gmail.com', phone: '12345'};
  }

  ngOnInit(): any {


    //this.loadData();

    this.myForm = this.formBuilder.group({
      'name': ['value', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
      'phone': ['value', this.phoneValidator.bind(this)],
      'email': ['value', [Validators.required, this.emailValidator.bind(this)]]
    });
  }




  onSubmit() {
    console.log('submitting form');
    console.log(JSON.stringify(this.userInfo));
    //TODO write data for form from db locally
  }

  isValid(field: string) {

    //let formField = this.myForm.find(field);
    let formField =  this.myForm.get(field);
    return formField.valid || formField.pristine;
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
        return {invalidPhone: true};
      }
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
      return {invalidEmail: true};
    }
  }
}
