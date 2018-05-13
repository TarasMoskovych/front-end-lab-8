import {Component} from '@angular/core';
import {Lesson, Timeline} from './app.model';
import {TimelineService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimelineService]
})
export class AppComponent {

  timeline: Timeline = new Timeline('Empty', []);

  model: LessonInput = new LessonInput();

  constructor(private timelineService: TimelineService) {}

  ngOnInit(): void {
    this.timelineService.load().then(remoteTimelime => {
      this.timeline = remoteTimelime;
    });
  }

  onSubmit() {
    this.add(this.model.toEvent());
    this.model = new LessonInput();
  }
  remove(item: any) {
    this.timeline = this.timeline.remove(item);
  }
  add(item: any) {
    this.timeline = this.timeline.add(item);
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
