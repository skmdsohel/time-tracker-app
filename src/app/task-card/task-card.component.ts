import { Component, OnInit, Input } from '@angular/core';
import { TimeServiceService } from '../service/time-service.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() item: any;

  constructor(private timeServiceService: TimeServiceService) { }
  ngOnInit(): void {
    this.timeServiceService.tasks.subscribe(task => {
      this.cards = task
    });
  }

  cards: any[] = []

  startTimer: any;
  btnStart: boolean = true;

  activeHistory: string = '';
  historyList: string[] = [];


  hr: any = '0' + 0
  min: any = '0' + 0
  sec: any = '0' + 0
  milsec: any = '0' + 0

  // this function will start the timer
  timerStart(): void {
    this.btnStart = false;
    this.activeHistory = 'Started the timer at ' + this.getCurrentDateTime() + ' (Active)'
    this.startTimer = setInterval(() => {
      this.sec++;
      this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
      if (this.sec === 60) {
        this.min++;
        this.min = this.min < 10 ? '0' + this.min : this.min;
        this.sec = '0' + 0;
      }
      if (this.min === 60) {
        this.hr++;
        this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
        this.min = '0' + 0
      }
    }, 1000)
  }

  // this function will stop the timer and update total time on the header
  timerStop(): void {
    this.btnStart = true;
    this.timeServiceService.updateTime(parseInt(this.hr) * 3600 + parseInt(this.min) * 60 + parseInt(this.sec))
    clearInterval(this.startTimer)
    this.historyList.push(this.activeHistory.split(" (Active)")[0] + ' & stopped at ' + this.getCurrentDateTime())
    this.activeHistory = ''
  }

  // this function will delete a task card
  removeCard(id: number) {
    let updatedList = this.cards.filter((item: any) => item.id !== id)
    this.timeServiceService.updateTaskList(updatedList)
    let totalTime = parseInt(this.hr) * 3600 + parseInt(this.min) * 60 + parseInt(this.sec)
    this.timeServiceService.updateTime(-totalTime)
  }

  // this function gives current formatted date & time as mm/dd/yyyy hh:mm:ss
  getCurrentDateTime(): string {
    let date = new Date();
    return ("00" + (date.getMonth() + 1)).slice(-2)
      + "/" + ("00" + date.getDate()).slice(-2)
      + "/" + date.getFullYear() + " "
      + ("00" + date.getHours()).slice(-2) + ":"
      + ("00" + date.getMinutes()).slice(-2)
      + ":" + ("00" + date.getSeconds()).slice(-2);
  }


}
