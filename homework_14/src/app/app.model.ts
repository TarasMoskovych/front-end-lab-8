export class Timeline {
  constructor(public label: string,
              public data: Array<Lesson>) {
  }

  remove(lesson: Lesson): Timeline {
    const data = this.data.slice(0);
    data.splice(this.data.indexOf(lesson), 1);
    return new Timeline(this.label, data);
  }
  add(lesson: Lesson): Timeline {
    const data = this.data.slice(0);
    data.splice(this.data.length, 0, lesson);
    return new Timeline(this.label, data);
  }
}

export class Lesson {
  constructor(public topic: string,
              public date: Date,
              public lecturer: string) {
  }
}
