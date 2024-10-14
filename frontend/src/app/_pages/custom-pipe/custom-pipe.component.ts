import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-pipe',
  templateUrl: './custom-pipe.component.html',
  styleUrls: ['./custom-pipe.component.scss']
})
export class CustomPipeComponent {
  today: Date = new Date();
  currentDate: Date = new Date();

  constructor(){
    //console.log(this.today);
  }
}
