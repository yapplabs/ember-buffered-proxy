import Controller from '@ember/controller';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import { action } from '@ember/object';

export default class extends Controller {
  get computedOnBuffer() {
    return this.buffer.get('firstName').split('').reverse().join('');
  }

  constructor() {
    super(...arguments);

    this.user = {
      firstName: 'stefan',
      email: 'example@example.com',
    };

    this.buffer = BufferedProxy.create({
      content: this.user,
    });
  }

  @action
  applyChanges(field, ev) {
    if (arguments.length === 1) {
      ev = field;
      field = null;
    }
    ev.preventDefault();
    if (field) {
      this.buffer.applyBufferedChanges([field]);
    } else {
      this.buffer.applyBufferedChanges();
    }
  }

  @action
  discardChanges(field, ev) {
    if (arguments.length === 1) {
      ev = field;
      field = null;
    }
    ev.preventDefault();
    if (field) {
      this.buffer.discardBufferedChanges([field]);
    } else {
      this.buffer.discardBufferedChanges();
    }
  }
}
