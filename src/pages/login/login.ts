import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsView = TabsPage;

  constructor(public navCtrl: NavController) {
  }

  /*login() {
    this.navCtrl.push(TabsPage);
  }*/
}
