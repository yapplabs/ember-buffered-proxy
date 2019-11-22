import { module, test } from 'qunit';
import { click, fillIn, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  test('verify if changes on whole content object were applied', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    // Init: Buffer's and content's property value are the same
    assert.dom('#buffer-firstname').hasText('stefan');
    assert.dom('#user-firstname').hasText('stefan');
    assert.dom('#buffer-email').hasText('example@example.com');
    assert.dom('#user-email').hasText('example@example.com');
    assert.dom('#buffer-has-changes').hasText('false');

    // Change buffer value: there should be a difference between buffer and content
    await fillIn('#firstname-input', 'tomek');
    await fillIn('#email-input', 'test@dot.com');
    assert.dom('#buffer-firstname').hasText('tomek');
    assert.dom('#user-firstname').hasText('stefan');
    assert.dom('#buffer-email').hasText('test@dot.com');
    assert.dom('#user-email').hasText('example@example.com');
    assert.dom('#buffer-has-changes').hasText('true');

    // Apply buffer changes and verify if content has new values
    await click('button#apply-changes');
    assert.dom('#buffer-firstname').hasText('tomek');
    assert.dom('#user-firstname').hasText('tomek');
    assert.dom('#buffer-email').hasText('test@dot.com');
    assert.dom('#user-email').hasText('test@dot.com');
    assert.dom('#buffer-has-changes').hasText('false');
  });

  test('verify if partial changes were applied', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    // Init: Buffer's and content's property value are the same
    assert.dom('#buffer-firstname').hasText('stefan');
    assert.dom('#user-firstname').hasText('stefan');
    assert.dom('#buffer-email').hasText('example@example.com');
    assert.dom('#user-email').hasText('example@example.com');
    assert.dom('#buffer-has-changes').hasText('false');

    // Change buffer value: there should be a difference between buffer and content
    await fillIn('#firstname-input', 'tomek');
    await fillIn('#email-input', 'test@dot.com');
    assert.dom('#buffer-firstname').hasText('tomek');
    assert.dom('#user-firstname').hasText('stefan');
    assert.dom('#buffer-email').hasText('test@dot.com');
    assert.dom('#user-email').hasText('example@example.com');
    assert.dom('#buffer-has-changes').hasText('true');

    // Apply buffer changes and verify if content has new values
    await click('button#apply-partial-changes');
    assert.dom('#buffer-firstname').hasText('tomek');
    assert.dom('#user-firstname').hasText('stefan');
    assert.dom('#buffer-email').hasText('test@dot.com');
    assert.dom('#user-email').hasText('test@dot.com');
    assert.dom('#buffer-has-changes').hasText('true', 'still has changes to apply');

    // Discard changes - we expect firstname to be back to original value
    // But the change that was already applied, should remain
    await click('button#discard-changes');
    assert.dom('#buffer-firstname').hasText('stefan');
    assert.dom('#user-firstname').hasText('stefan');
    assert.dom('#buffer-email').hasText('test@dot.com');
    assert.dom('#user-email').hasText('test@dot.com');
    assert.dom('#buffer-has-changes').hasText('false');
  });
});
