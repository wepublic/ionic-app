import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserServiceProvider} from "../user-service/user-service";

/*
  Generated class for the QuestionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuestionServiceProvider {

  //TODO: remove when backend is ready for real data
  questionDummies: Array<{
    id: number,
    content: string,
    creator: any,
    category: string,
    likeCount: number,
    dislikeCount: number,
    flags: any,
    answer: any,
  }>;

  //TODO: remove UserService when backend is ready for real data
  constructor(public http: Http, public userService: UserServiceProvider) {
    this.questionDummies = this.initDummyData();
  }

  loadAllQuestions() {
    return this.questionDummies;
  }

  loadMyQuestion() {
    //TODO: add liked Questions??
    //TODO: how should likes be tagged??
    const tmp = [];
    for(let i=0; i < this.questionDummies.length; i++) {
      if (this.questionDummies[i].creator.id == 1) {
        tmp.push(this.questionDummies[i]);
      }
    }
    return tmp;
  }

  loadNewQuestion() {
    return this.questionDummies[0];
  }

  //TODO: TODO: remove when backend is ready for real data
  getUserById(id) {
    return this.userService.loadUserById(id);
  }

  //TODO: remove when backend is ready for real data
  initDummyData() {
    return (
      [
        {
          id: 0,
          content: "This is a question",
          creator: this.getUserById(1),
          category: "#norealquestion",
          likeCount: 10,
          dislikeCount: 100,
          flags: [
            {
              id: 0,
              reason: "spam",
              flagCount: 43,
            },
            {
              id: 1,
              reason: "inappropriate",
              flagCount: 2,
            }
          ],
          answer: {
            id: 0,
            content: "Stupid question",
            creator: this.getUserById(0),
            likeCount: 50,
            dislikeCount: 1,
            flags: [],
          }
        },
        {
          id: 1,
          content: "Why Baum?",
          creator: this.getUserById(2),
          category: "#baum",
          likeCount: 1000,
          dislikeCount: 100,
          flags: [],
          answer: {
            id: 0,
            content: "The answer is Baum!",
            creator: this.getUserById(0),
            likeCount: 50,
            dislikeCount: 1,
            flags: [],
          }
        }
      ]
    );
  }

}
