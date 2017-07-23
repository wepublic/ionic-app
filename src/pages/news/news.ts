import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {NewsServiceProvider} from "../../providers/news-service/news-service";

@Component({
  templateUrl: 'news.html',
  selector: 'page-news',
  providers: [NewsServiceProvider],
})
export class NewsPage {

  public news: any;
  messageConnectionError;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
              public newsService: NewsServiceProvider) {
    this.loadNews(null);
  }

  ionViewWillEnter() {
    this.loadNews(null);
  }

  loadNews(refresher) {
    this.newsService.loadNews().subscribe((data) => {
      if (data !== undefined && data !== []) {
        this.news = data.map((news) => {
          return news;
        });
        if (refresher !== null) {
          refresher.complete();
        }
        console.log(data);
        console.log(this.news);
      }
      else{
        let toast = this.toastCtrl.create({
          message: this.messageConnectionError,
          duration: 3000
        });
        toast.present();
      }
    });
  }

}
