import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {

  constructor() { }
  taskList: any[] = []
  private task = new BehaviorSubject<any>(this.taskList);
  private time = new BehaviorSubject<number>(0);
  totalTime: number = 0;
  addTimer = this.time.asObservable();
  tasks = this.task.asObservable();

  // update total time on click timer stop button
  updateTime(addTime: number) {
    this.totalTime += addTime;
    this.time.next(this.totalTime);
  }

  // update task list on create or delete task
  updateTaskList(tasks:any) {
    this.task.next(tasks);
    
  }
}
