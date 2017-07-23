import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {API_ENDPOINT} from '../../app/app.config';
import {Observable} from "rxjs/Observable";

@Injectable()
export class TagsServiceProvider {

  tagDummies: Array<{
    id: number,
    text: string
  }>;

  constructor(public http: Http) {
    console.log('Hello TagsServiceProvider Provider');
    this.tagDummies = this.initDummyData();
  }

  loadAllTags() {
    //Todo: onError!!!
    return Observable.of(this.tagDummies);
  }

  initDummyData() {
    return (
      [
        { id: 0, text: "Bildung"},
        { id: 1, text: "Flüchtlingspolitik"},
        { id: 2, text: "Finanzen"},
        { id: 3, text: "Wirtschaft"},
        { id: 4, text: "Europa"},
        { id: 5, text: "Asylpolitik"},
        { id: 6, text: "Politiksystem"},
        { id: 7, text: "Energie"},
      ])
  }
}
