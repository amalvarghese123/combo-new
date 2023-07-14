const EventEmitter = {
  callbacks: {},
  on: function (eventName, callback) {
    if (typeof eventName === "string") {
      if (!this.callbacks[eventName]) this.callbacks[eventName] = null;
      this.callbacks[eventName] = callback;
    } else {
      for (let i = 0; i < eventName.length; i++) {
        let event = eventName[i];
        if (!this.callbacks[event]) this.callbacks[event] = null;
        this.callbacks[event] = callback;
      }
    }
  },
  emit: function (eventName, data) {
    let cb = this.callbacks[eventName];
    // cb.forEach((c) => c(data));
    cb?.(data);
  },
  removeAll: function () {
    this.callbacks = {};
  },
};
export default EventEmitter;
