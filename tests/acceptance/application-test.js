import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('verify if changes on whole content object were applied', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    // Init: Buffer's and content's property value are the same
    assert.equal(find('#buffer-firstname').text(), 'stefan');
    assert.equal(find('#user-firstname').text(), 'stefan');
    assert.equal(find('#buffer-email').text(), 'example@example.com');
    assert.equal(find('#user-email').text(), 'example@example.com');
    assert.equal(find('#buffer-has-changes').text(), 'false');

    // Change buffer value: there should be a difference between buffer and content
    fillIn('#firstname-input', 'tomek');
    fillIn('#email-input', 'test@dot.com');
    andThen(() => {
      assert.equal(find('#buffer-firstname').text(), 'tomek');
      assert.equal(find('#user-firstname').text(), 'stefan');
      assert.equal(find('#buffer-email').text(), 'test@dot.com');
      assert.equal(find('#user-email').text(), 'example@example.com');
      assert.equal(find('#buffer-has-changes').text(), 'true');

      // Apply buffer changes and verify if content has new values
      click('button#apply-changes').then(() => {
        assert.equal(find('#buffer-firstname').text(), 'tomek');
        assert.equal(find('#user-firstname').text(), 'tomek');
        assert.equal(find('#buffer-email').text(), 'test@dot.com');
        assert.equal(find('#user-email').text(), 'test@dot.com');
        assert.equal(find('#buffer-has-changes').text(), 'false');
      });
    });
  });
});

test('verify if partial changes were applied', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    // Init: Buffer's and content's property value are the same
    assert.equal(find('#buffer-firstname').text(), 'stefan');
    assert.equal(find('#user-firstname').text(), 'stefan');
    assert.equal(find('#buffer-email').text(), 'example@example.com');
    assert.equal(find('#user-email').text(), 'example@example.com');
    assert.equal(find('#buffer-has-changes').text(), 'false');

    // Change buffer value: there should be a difference between buffer and content
    fillIn('#firstname-input', 'tomek');
    fillIn('#email-input', 'test@dot.com');
    andThen(() => {
      assert.equal(find('#buffer-firstname').text(), 'tomek');
      assert.equal(find('#user-firstname').text(), 'stefan');
      assert.equal(find('#buffer-email').text(), 'test@dot.com');
      assert.equal(find('#user-email').text(), 'example@example.com');
      assert.equal(find('#buffer-has-changes').text(), 'true');

      // Apply buffer changes and verify if content has new values
      click('button#apply-partial-changes').then(() => {
        assert.equal(find('#buffer-firstname').text(), 'tomek');
        assert.equal(find('#user-firstname').text(), 'stefan');
        assert.equal(find('#buffer-email').text(), 'test@dot.com');
        assert.equal(find('#user-email').text(), 'test@dot.com');
        assert.equal(find('#buffer-has-changes').text(), 'true', 'still has changes to apply');

        // Discard changes - we expect firstname to be back to original value
        // But the change that was already applied, should remain
        click('button#discard-changes').then(() => {
          assert.equal(find('#buffer-firstname').text(), 'stefan');
          assert.equal(find('#user-firstname').text(), 'stefan');
          assert.equal(find('#buffer-email').text(), 'test@dot.com');
          assert.equal(find('#user-email').text(), 'test@dot.com');
          assert.equal(find('#buffer-has-changes').text(), 'false');
        });
      });
    });
  });
});
