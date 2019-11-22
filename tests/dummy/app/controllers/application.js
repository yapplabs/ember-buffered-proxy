import Controller from '@ember/controller';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Controller.extend({
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
        this.get('buffer').applyBufferedChanges([field]);
      } else {
        this.get('buffer').applyBufferedChanges();
      }
    },

    discardChanges(field) {
      if (field) {
        this.get('buffer').discardBufferedChanges([field]);
      } else {
        this.get('buffer').discardBufferedChanges();
      }
    }
  }
});
