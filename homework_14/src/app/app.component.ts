import {Component, OnInit} from '@angular/core';
import {Lesson, Data} from './app.model';
import {DataService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

export class AppComponent implements OnInit {
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
  add(item: Lesson) {
    if (item.topic && item.date && item.lecturer) {
      this.data = this.data.add(item);
    }
  }
  edit(item: Lesson) {
    this.displayRow = null;
    if (item.topic && item.date && item.lecturer) {
      this.data = this.data.edit(item);
    }
  }
  clear(item: Lesson) {
    item.topic = this.topic;
    item.date = this.date;
    item.lecturer = this.lecturer;
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
