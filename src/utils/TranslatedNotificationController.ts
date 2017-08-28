import { Injectable} from "@angular/core";
import { AlertController, ToastController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class TranslatedNotificationController {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,
              private translate: TranslateService) {
  }

  public showToast(text: string) {
    this.translate.get(text, {value: 'world'})
    .subscribe((res: string) => this.toastCtrl.create({ message: res, duration: 3000 }).present());
  }

  public showAlert(title: string, message: string, button: string) {
    this.translate.get([title, message, button], {value: 'world'})
    .subscribe((res: string[]) => this.alertCtrl.create(
      { title: res[title], message: res[message], buttons: [res[button]] }).present()
    );
  }
    
}
