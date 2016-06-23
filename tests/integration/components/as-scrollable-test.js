import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  run: { later }
} = Ember;

moduleForComponent('as-scrollable', 'Integration | Component | as scrollable', {
  integration: true
});

test(`adjusts to the height of it's container`, function(assert) {
  assert.expect(2);
  let done = assert.async();

  this.set('height', '200px');

  this.render(hbs`
    <div style="height: {{height}}">
      {{#as-scrollable}}
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
      {{/as-scrollable}}
    </div>
  `);

  assert.equal(this.$('.tse-scroll-content').height(), '200', 'height is 200px');

  this.set('height', '400px');

  stop();
  later(()=>{
    debugger;
    assert.equal(this.$('.tse-scroll-content').height(), '400', 'height is 400px');
    done();
  }, 20);
});
