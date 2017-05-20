import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  providers: [UserServiceProvider],
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public loggedInUser: any;

  passwordOld = "";
  passwordNew = "";
  passwordNewRepeat = "";
  newPWValid = false;
  emailInput = this.emailInput;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public storage: Storage, private toastCtrl: ToastController) {
    this.loadUserData();
  }

  loadUserData() {
    this.loggedInUser = this.userService.loadUserById(0);

    this.storage.get('localUserEmail').then((val) => {
      this.loggedInUser.email = val;
    });
  }

  onEmailInput(text) {
    console.log(text);
    console.log(this.emailInput);
  }

  onInputPW(text){
    this.passwordOld = text;
    if(text.toString().length >= 8){
      this.newPWValid = true;
    }
    else{
      this.newPWValid = false;
    }
  }

  onInputOldPW(text) {
    this.passwordOld = text;
  }

  onInputNewPW(text){
    this.passwordNew = text;
  }

  onInputNewPWRepeat(text){
    this.passwordNewRepeat = text;
  }

  saveSettings(){
    if(this.newPWValid && this.passwordNew.toString()===this.passwordNewRepeat.toString()){ //TODO correct old password?
      this.storage.set('localUserPassword', this.passwordNew);

      let toast = this.toastCtrl.create({
        message: 'Profil speichern erfolgreich!',
        duration: 3000
      });
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
      toast.present();
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Profil speichern fehlgeschlagen. Bitte prüfe deine Eingaben',
        duration: 3000
      });
      toast.present();
    }
  }
}
