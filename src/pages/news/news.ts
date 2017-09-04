import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Content, Refresher } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import {NewsServiceProvider} from "../../providers/news-service/news-service";

@Component({
  templateUrl: 'news.html',
  selector: 'page-news',
  providers: [NewsServiceProvider],
})
export class NewsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  public news: any;
  connectionErrorToast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
              public translate: TranslateService, public newsService: NewsServiceProvider) {
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

  loadNews(refresher) {
    this.newsService.loadNews().subscribe(
      data => {
        refresher.complete();
        this.news = data;
        if (data.length) this.newsService.updateSeenNews(data.map(d => d.id));
      },
      err => {
        refresher.complete();
        this.connectionErrorToast.present();
      }
    );
  }

}
