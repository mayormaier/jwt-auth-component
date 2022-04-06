import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../jwt-auth-component.js';

describe('JwtAuthComponent', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html`<jwt-auth-component></jwt-auth-component>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`<jwt-auth-component></jwt-auth-component>`);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(html`<jwt-auth-component title="attribute title"></jwt-auth-component>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<jwt-auth-component></jwt-auth-component>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
