import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {API_ENDPOINT} from '../../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsServiceProvider {

  constructor(public http: Http) {
  }

  loadNews() {
    return this.http.get(API_ENDPOINT + '/News/')
      .map(res => res.json());
  }

}
