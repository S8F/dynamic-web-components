import { html, fixture, expect } from '@open-wc/testing';
import '../components/input-components/input'; 

describe('DynamicInputField', () => {
  it('renders input with correct attributes', async () => {
    const mockField = {
      id: 'username',
      label: 'Username',
      type: 'text',
      name: 'username',
      placeholder: 'Enter username',
      maxLength: undefined,
      required: true,
      options: undefined,
      value: undefined,
    };
    const el = await fixture(html`
      <dynamic-input-field .field=${mockField}></dynamic-input-field>
    `);
    const input = el.shadowRoot!.querySelector('input');
    expect(input).to.exist;
    expect(input!.getAttribute('placeholder')).to.equal('Enter username');
    expect(input!.required).to.be.true;
    expect(input!.name).to.equal('username');
    expect(mockField).to.have.property('id', 'username');
    expect(mockField).to.have.property('label', 'Username');
  });

  it('emits field-input event on input', async () => {
    const mockField = {
      id: 'email',
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'Enter email',
      maxLength: undefined,
      required: false,
      options: undefined,
      value: undefined,
    };
    const el = await fixture(html`
      <dynamic-input-field .field=${mockField}></dynamic-input-field>
    `);
    const input = el.shadowRoot!.querySelector('input')!;
    let eventFired = false;
    el.addEventListener('field-input', () => (eventFired = true));
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input'));
    expect(eventFired).to.be.true;
  });
});