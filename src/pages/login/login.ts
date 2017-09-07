import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController} from 'ionic-angular';

import { TranslatedNotificationController } from "../../utils/TranslatedNotificationController";
import {TabsPage} from "../tabs/tabs";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-login',
  providers: [UserServiceProvider],
  templateUrl: 'login.html'
})
export class LoginPage {

  private tabsView = TabsPage;

  authForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private navCtrl: NavController, private fb: FormBuilder,
              private notifier: TranslatedNotificationController, private userService: UserServiceProvider) {
    this.authForm = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  ionViewDidEnter() {
    this.userService.loadMe().subscribe(
      me => {
        console.log("Hello: ", me);
        if (me !== null) this.navCtrl.setRoot(this.tabsView);
      }
    );
  }

  login(value: string) {
    console.log("login");
    if (!this.authForm.valid) return;
    this.userService.login(this.email.value, this.password.value).subscribe(
      () => this.navCtrl.setRoot(this.tabsView),
      err => this.notifier.showToast('LOGIN.FAILED')
    );
  }

  forgotPW() {
    console.log("forgot PW");
    this.userService.forgotPW(this.email.value)
    .subscribe(
      res => this.notifier.showAlert('', 'SIGNUP.RESETMAIL', 'OK'),
      err => this.notifier.showToast('LOGIN.INVALID_USER')
    );
    return false;
  }
}
