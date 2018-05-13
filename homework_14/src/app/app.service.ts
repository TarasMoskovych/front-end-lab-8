import {Injectable} from '@angular/core';
import {Lesson, Timeline} from './app.model';

@Injectable()
export class TimelineService {
  load(): Promise<Timeline> {
    return Promise.resolve(TIMELINE);
  }
}

const TIMELINE: Timeline = new Timeline('Lessons',
  [new Lesson('CSS frameworks', new Date('03/12/2018'), 'Yuriy Dzhavala'),
    new Lesson('OOP', new Date('03/20/2018'), 'Mykhaylo Domanskyy'),
    new Lesson('ES Next', new Date('03/27/2018'), 'Bohdan Lobor'),
    new Lesson('AngularJS', new Date('05/08/2018'), 'Kostiantyn Kubusha')
  ]);
