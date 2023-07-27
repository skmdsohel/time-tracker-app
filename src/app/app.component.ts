import { Component, OnInit } from '@angular/core';
import { TimeServiceService } from './service/time-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cards: any[] = []
  constructor(private timeServiceService: TimeServiceService) { }
  ngOnInit(): void {
    this.timeServiceService.tasks.subscribe(task => {
      this.cards = task
    });
  }
  title = 'time-tracker-app';
  taskTitle: string = "";
  showPopup = false;

  // to show the overlay pop up for adding task title
  showPopupForm() {
    this.showPopup = !this.showPopup
  }


  // adding task to the UI
  addTask() {
    let lastItemId = this.cards.slice(-1)
    this.cards.push({ id: lastItemId[0] ? (lastItemId[0].id + 1) : 1, title: this.taskTitle })
    this.taskTitle = "";
    this.showPopup = false
  }

  // close overlay popup
  closeOverlay(event: any) {
    if (event.target.classList.contains("overlay")) {
      this.showPopup = false
    }
  }


}
