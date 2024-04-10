type EventCallback<T = any> = (data: T) => void;

export enum EventName {
  copy = "clipboardCopy",
  cut = "clipboardCut",
  paste = "clipboardPaste",
}

class EventBus {
  private events: { [K in EventName]?: EventCallback[] } = {};

  subscribe<T>(eventName: EventName, callback: EventCallback<T>): () => void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName]!.push(callback);
    const index = this.events[eventName]!.length - 1;

    return () => {
      this.events[eventName]!.splice(index, 1);
    };
  }

  publish<T>(eventName: EventName, data: T): void {
    const subscribers = this.events[eventName];
    if (subscribers) {
      subscribers.forEach((callback) => {
        callback(data);
      });
    }
  }
}

export const eventBus = new EventBus();
