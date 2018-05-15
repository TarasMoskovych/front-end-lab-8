import {Injectable} from '@angular/core';
import {Lesson, Data} from './app.model';

@Injectable()
export class DataService {
  load(): Promise<Data> {
    return Promise.resolve(DATA);
  }
}

const DATA: Data = new Data('Lessons',
  [new Lesson('CSS frameworks', new Date('03/12/2018'), 'John Doe'),
    new Lesson('OOP', new Date('03/20/2018'), 'John Doe'),
    new Lesson('ES Next', new Date('03/27/2018'), 'John Doe'),
    new Lesson('AngularJS', new Date('05/08/2018'), 'John Doe')
  ]);
