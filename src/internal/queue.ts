export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
