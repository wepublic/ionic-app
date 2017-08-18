import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ConnectionErrorController {
  private _errorMsg: string = "Foo bar";
    
  constructor(public toastCtrl: ToastController, translate: TranslateService) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => this._errorMsg = res);
  }

  show() {
    this.toastCtrl.create({
      message: this._errorMsg,
      duration: 3000
    }).present();
  }
}
