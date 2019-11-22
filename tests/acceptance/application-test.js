import { module, test } from 'qunit';
import { click, fillIn, currentURL, find, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  test('verify if changes on whole content object were applied', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    // Init: Buffer's and content's property value are the same
    assert.equal(find('#buffer-firstname').textContent, 'stefan');
    assert.equal(find('#user-firstname').textContent, 'stefan');
    assert.equal(find('#buffer-email').textContent, 'example@example.com');
    assert.equal(find('#user-email').textContent, 'example@example.com');
    assert.equal(find('#buffer-has-changes').textContent, 'false');

    // Change buffer value: there should be a difference between buffer and content
    await fillIn('#firstname-input', 'tomek');
    await fillIn('#email-input', 'test@dot.com');
    assert.equal(find('#buffer-firstname').textContent, 'tomek');
    assert.equal(find('#user-firstname').textContent, 'stefan');
    assert.equal(find('#buffer-email').textContent, 'test@dot.com');
    assert.equal(find('#user-email').textContent, 'example@example.com');
    assert.equal(find('#buffer-has-changes').textContent, 'true');

    // Apply buffer changes and verify if content has new values
    await click('button#apply-changes');
    assert.equal(find('#buffer-firstname').textContent, 'tomek');
    assert.equal(find('#user-firstname').textContent, 'tomek');
    assert.equal(find('#buffer-email').textContent, 'test@dot.com');
    assert.equal(find('#user-email').textContent, 'test@dot.com');
    assert.equal(find('#buffer-has-changes').textContent, 'false');
  });

  test('verify if partial changes were applied', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    // Init: Buffer's and content's property value are the same
    assert.equal(find('#buffer-firstname').textContent, 'stefan');
    assert.equal(find('#user-firstname').textContent, 'stefan');
    assert.equal(find('#buffer-email').textContent, 'example@example.com');
    assert.equal(find('#user-email').textContent, 'example@example.com');
    assert.equal(find('#buffer-has-changes').textContent, 'false');

    // Change buffer value: there should be a difference between buffer and content
    await fillIn('#firstname-input', 'tomek');
    await fillIn('#email-input', 'test@dot.com');
    assert.equal(find('#buffer-firstname').textContent, 'tomek');
    assert.equal(find('#user-firstname').textContent, 'stefan');
    assert.equal(find('#buffer-email').textContent, 'test@dot.com');
    assert.equal(find('#user-email').textContent, 'example@example.com');
    assert.equal(find('#buffer-has-changes').textContent, 'true');

    // Apply buffer changes and verify if content has new values
    await click('button#apply-partial-changes');
    assert.equal(find('#buffer-firstname').textContent, 'tomek');
    assert.equal(find('#user-firstname').textContent, 'stefan');
    assert.equal(find('#buffer-email').textContent, 'test@dot.com');
    assert.equal(find('#user-email').textContent, 'test@dot.com');
    assert.equal(find('#buffer-has-changes').textContent, 'true', 'still has changes to apply');

    // Discard changes - we expect firstname to be back to original value
    // But the change that was already applied, should remain
    await click('button#discard-changes');
    assert.equal(find('#buffer-firstname').textContent, 'stefan');
    assert.equal(find('#user-firstname').textContent, 'stefan');
    assert.equal(find('#buffer-email').textContent, 'test@dot.com');
    assert.equal(find('#user-email').textContent, 'test@dot.com');
    assert.equal(find('#buffer-has-changes').textContent, 'false');
  });
});
