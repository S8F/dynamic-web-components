// src/components/form-field.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('form-field')
export class FormField extends LitElement {
  static styles = css`
    .field {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    label {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    input[type="checkbox"] {
      width: auto;
      margin-right: 0.5rem;
    }
    .error {
      color: #d8000c;
      font-size: 0.95em;
      margin-top: 0.3rem;
    }
  `;

  @property({ type: Object }) field: any = {};
  @property({ type: String }) value: any = '';
  @property({ type: String }) error: string = '';

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    let value: any = target.value;
    if (this.field.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    }
    this.dispatchEvent(new CustomEvent('field-change', {
      detail: { name: this.field.name, value },
      bubbles: true, composed: true,
    }));
  }

  render() {
    const f = this.field;
    return html`
      <div class="field">
        ${f.type !== 'checkbox'
          ? html`<label for=${f.name}>${f.label}${f.required ? ' *' : ''}</label>`
          : ''}
        ${this.renderField()}
        ${this.error ? html`<div class="error">${this.error}</div>` : ''}
      </div>
    `;
  }

  renderField() {
    const f = this.field;
    const value = this.value ?? '';
    switch (f.type) {
      case 'text':
      case 'email':
        return html`
          <input
            type=${f.type}
            id=${f.name}
            name=${f.name}
            placeholder=${f.placeholder || ''}
            .value=${value}
            maxlength=${f.maxLength || ''}
            ?required=${!!f.required}
            @input=${this.handleInput}
          />
        `;
      case 'textarea':
        return html`
          <textarea
            id=${f.name}
            name=${f.name}
            .value=${value}
            maxlength=${f.maxLength || ''}
            ?required=${!!f.required}
            @input=${this.handleInput}
          ></textarea>
        `;
      case 'select':
        return html`
          <select
            id=${f.name}
            name=${f.name}
            .value=${value}
            ?required=${!!f.required}
            @change=${this.handleInput}
          >
            ${f.options.map(
              (opt: any) => html`
                <option value=${opt.value} ?selected=${opt.value === value}>
                  ${opt.label}
                </option>
              `
            )}
          </select>
        `;
      case 'checkbox':
        return html`
          <label>
            <input
              type="checkbox"
              id=${f.name}
              name=${f.name}
              .checked=${!!value}
              ?required=${!!f.required}
              @change=${this.handleInput}
            />
            ${f.label}${f.required ? ' *' : ''}
          </label>
        `;
      default:
        return html`<div>Unsupported field type: ${f.type}</div>`;
    }
  }
}