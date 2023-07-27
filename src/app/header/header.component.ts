import { Component, OnInit } from '@angular/core';
import { TimeServiceService } from '../service/time-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private timeServiceService:TimeServiceService){}

  hour:number = 0;
  min:number = 0;
  ngOnInit(){
    this.timeServiceService.addTimer.subscribe(time =>{
      this.hour = Math.floor(time/3600) < 1 ? 0 : Math.floor(time/3600);
      this.min = Math.floor(time/60) < 1 ? 0 : Math.floor(time/60);
    });
  }
}
