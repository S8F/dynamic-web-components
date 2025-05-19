// src/components/dynamic-form.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './form-field';

@customElement('dynamic-form')
export class DynamicForm extends LitElement {
  static styles = css`
    .form-container {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2rem;
      max-width: 400px;
      margin: 2rem auto;
      box-shadow: 0 2px 8px #eee;
      background: #fff;
    }
    h2 {
      margin-top: 0;
    }
    button {
      margin-top: 1.5rem;
      padding: 0.5rem 2rem;
      border-radius: 5px;
      border: none;
      background: #5a67d8;
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
    .error {
      color: #d8000c;
      margin-bottom: 1rem;
    }
  `;

  @property({ type: Object }) spec: any = {};
  @state() private formData: Record<string, any> = {};
  @state() private errors: Record<string, string> = {};

  // Collect field values as they're changed
  private handleFieldChange(e: CustomEvent) {
    const { name, value } = e.detail;
    this.formData = { ...this.formData, [name]: value };
    // Optionally clear error on change
    this.errors = { ...this.errors, [name]: '' };
  }

  private validate() {
    const errors: Record<string, string> = {};
    (this.spec.fields || []).forEach((field: any) => {
      const value = this.formData[field.name];
      if (field.required && (value === undefined || value === '' || (field.type === 'checkbox' && !value))) {
        errors[field.name] = 'This field is required.';
      }
      if (field.maxLength && value && value.length > field.maxLength) {
        errors[field.name] = `Max length is ${field.maxLength} characters.`;
      }
      if (field.type === 'email' && value) {
        // Simple email regex
        const re = /\S+@\S+\.\S+/;
        if (!re.test(value)) {
          errors[field.name] = 'Invalid email format.';
        }
      }
    });
    return errors;
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }
    // Form is valid!
    alert('Form submitted! Data:\n' + JSON.stringify(this.formData, null, 2));
    // Dispatch event, handle as needed
    this.dispatchEvent(new CustomEvent('form-submit', { detail: this.formData }));
  }

  render() {
    if (!this.spec || !Array.isArray(this.spec.fields)) {
      return html`<div>Invalid form specification.</div>`;
    }
    return html`
      <form class="form-container" @submit=${this.handleSubmit}>
        <h2>${this.spec.title}</h2>
        ${this.spec.fields.map(
          (field: any) => html`
            <form-field
              .field=${field}
              .value=${this.formData[field.name] ?? field.value ?? ''}
              .error=${this.errors[field.name] ?? ''}
              @field-change=${this.handleFieldChange}
            ></form-field>
          `
        )}
        ${Object.keys(this.errors).length > 0
          ? html`<div class="error">Please fix the errors above.</div>`
          : ''}
        <button type="submit">Submit</button>
      </form>
    `;
  }
}