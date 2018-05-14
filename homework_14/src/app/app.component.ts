import {Component} from '@angular/core';
import {Lesson, Data} from './app.model';
import {DataService} from './app.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root, inline-edit',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

export class AppComponent {
  data: Data = new Data('Empty', []);
  model: LessonInput = new LessonInput();
  displayRow: 0;
  topic: string;
  date: Date;
  lecturer: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.load().then(remoteData => {
      this.data = remoteData;
    });
  }
  temp(idx) {
    this.displayRow = idx;
  }
  assign(item) {
    this.topic = item.topic;
    this.date = item.date;
    this.lecturer = item.lecturer;
  }
  onSubmit() {
    this.add(this.model.toEvent());
    this.model = new LessonInput();
  }
  add(item: any) {
    if (item.topic && item.date && item.lecturer) {
      this.data = this.data.add(item);
    }
  }
  edit(item: any) {
    this.displayRow = null;
    if (item.topic && item.date && item.lecturer) {
      this.data = this.data.edit(item);
    }
  }
  clear() {
    $('#newTopic').val(this.topic);
    $('#newDate').val(this.date);
    $('#newLecturer').val(this.lecturer);
  }
  remove(item: any) {
    this.data = this.data.remove(item);
  }
}

class LessonInput {
  constructor(public topic: string = '',
              public date: string = new Date().toDateString(),
              public lecturer: string = '') {
  }

  toEvent(): Lesson {
    return new Lesson(this.topic, new Date(this.date), this.lecturer);
  }
}
