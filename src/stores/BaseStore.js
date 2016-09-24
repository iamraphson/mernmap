/**
 * Created by Raphson on 9/24/16.
 */
let EventEmitter = require('events').EventEmitter;
if (!Object.assign) {
    Object.assign = require('object-assign');
}

const BaseStore = Object.assign({}, EventEmitter.prototype, {

    emitChange(event='change') {
        this.emit(event);
    },

    addChangeListener(callback, event='change') {
        this.on(event, callback);
    },

    removeChangeListener(callback, event='change') {
        this.removeListener(event, callback);
    }
});

export default BaseStore;