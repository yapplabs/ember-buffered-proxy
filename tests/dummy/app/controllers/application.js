import Controller from '@ember/controller';
import { computed } from '@ember/object';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Controller.extend({

  computedOnBuffer: computed('buffer.firstName', function() {
    return this.get('buffer.firstName').split('').reverse().join('');
  }),

  init() {
    this._super(...arguments);

    let user = {
      firstName: 'stefan',
      email: 'example@example.com'
    };

    let buffer = BufferedProxy.create({
      content: user
    });

    this.setProperties({
      buffer: buffer,
      user: user
    });
  },

  actions: {
    applyChanges(field) {
      if (field) {
        this.buffer.applyBufferedChanges([field]);
      } else {
        this.buffer.applyBufferedChanges();
      }
    },

    discardChanges(field) {
      if (field) {
        this.buffer.discardBufferedChanges([field]);
      } else {
        this.buffer.discardBufferedChanges();
      }
    }
  }
});
