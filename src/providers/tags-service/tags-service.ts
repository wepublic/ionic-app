import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {API_ENDPOINT} from '../../app/app.config';

@Injectable()
export class TagsServiceProvider {

  constructor(public http: Http) {
    console.log('Hello TagsServiceProvider Provider');
  }

  loadAllTags() {
    //Todo: onError!!!
    return this.http.get(API_ENDPOINT + '/Tags/')
      .map(res => res.json());
  }

}
