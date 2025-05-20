import { html, fixture, expect } from '@open-wc/testing';
import '../components/dynamic-form'; // adjust path if needed

describe('DynamicForm', () => {
  it('renders both dynamic and classic fields', async () => {
    const mockFields = [
      { label: 'First Name', type: 'text', name: 'firstName', placeholder: 'First', required: true },
      { label: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Last', required: false },
    ];
    const el = await fixture(html`
      <dynamic-form .fields=${mockFields}></dynamic-form>
    `);

    // Check for dynamic input field
    const dynamic = el.shadowRoot!.querySelector('dynamic-input-field');
    expect(dynamic).to.exist;

    // Check for classic input field
    const classic = el.shadowRoot!.querySelector('input[name="firstName"]');
    expect(classic).to.exist;
    expect(classic!.getAttribute('placeholder')).to.equal('First');
  });
});