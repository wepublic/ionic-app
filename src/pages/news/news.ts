import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Content, Refresher } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import {NewsServiceProvider} from "../../providers/news-service/news-service";
import {MatchServiceProvider} from "../../providers/match-service/match-service";


@Component({
  templateUrl: 'news.html',
  selector: 'page-news',
  providers: [NewsServiceProvider, MatchServiceProvider],
})
export class NewsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  public news: any;
  connectionErrorToast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
              public translate: TranslateService, public matchService: MatchServiceProvider) {
    translate.get('CONNERROR', {value: 'world'}).subscribe((res: string) => {
      this.connectionErrorToast = this.toastCtrl.create({
        message: res,
        duration: 3000
      });
    });
  }

  ionViewDidEnter() {
    this.refresher._top = this.content.contentTop + 'px';
    this.refresher.state = 'ready';
    this.refresher._onEnd();
  }

  ionViewDidLoad() {
    this.initSvg();
  }

  initSvg() {
  }


  loadMatch(refresher) {
    this.matchService.loadMatch().subscribe(
      data => {
        refresher.complete();
        this.news = data;
        console.log(this);

        for (var match of data) {
          console.log(match);
          match.aa = Array(Math.round(match.percentage/10));
        }

      },
      err => {
        refresher.complete();
        this.connectionErrorToast.present();
      }
    );
  }

}
