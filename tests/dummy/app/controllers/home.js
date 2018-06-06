import Controller from '@ember/controller';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Controller.extend({
  init: function () {
    this._super();
    let bufferedUser = BufferedProxy.create({
      content: {firstName: "firstName", lastName: "Last Name"}
    });
    this.set("user", bufferedUser);
  },

  actions: {
    revertFirstName:function(propertyName) {
      this.get("user").discardBufferedChanges([propertyName]);
    },
    commitChange:function(){
      this.get("user").applyChanges();
    }

  }
});
