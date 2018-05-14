export class Data {
  constructor(public label: string,
              public data: Array<Lesson>) {
  }

  remove(lesson: Lesson): Data {
    const data = this.data.slice(0);
    data.splice(this.data.indexOf(lesson), 1);
    return new Data(this.label, data);
  }
  add(lesson: Lesson): Data {
    const data = this.data.slice(0);
    data.splice(this.data.length, 0, lesson);
    return new Data(this.label, data);
  }
  edit(lesson: Lesson) {
    const data = this.data.slice(0);
    data.splice(this.data.length, 0, lesson);
    return new Data(this.label, data);
  }
}

export class Lesson {
  constructor(public topic: string,
              public date: Date,
              public lecturer: string) {
  }
}
