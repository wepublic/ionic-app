import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-settings',
  providers: [UserServiceProvider],
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public loggedInUser: any;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {
    this.loadUserData();
  }

  loadUserData() {
    this.loggedInUser = this.userService.loadUserById(0);
  }

}
