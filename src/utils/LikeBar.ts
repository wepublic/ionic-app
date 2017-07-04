import { Component, Input } from '@angular/core';

@Component({
  selector: 'like-bar',
  templateUrl: 'LikeBar.html'
})
export class LikeBar {

  @Input('percentage') percentage;

  constructor(){

  }

}
