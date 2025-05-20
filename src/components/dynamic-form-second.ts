import { LitElement, html, css } from "lit-element";
import { property, customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

//Data types
type Field = {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  options?: { label: string; value: string }[];
  value?: string;
};

type FormSpec = {
  title: string;
  fields: Field[];
};

//Declaration of the custom element
@customElement("dynamic-form-second")
export class DynamicForm extends LitElement {

  //Props and value storage 
  @property({ type: Object }) spec: FormSpec | null = null;
  private _formValues: Record<string, any> = {};

//Handle user input
  private _onInput(e: Event, name: string) {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      this._formValues[name] = target.checked;
    } else {
      this._formValues[name] = target.value;
    }
  }

  //handle submission
  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log("Form submitted:", this._formValues);
    alert(JSON.stringify(this._formValues, null, 2));
  }

  //Draws the fields select, email, checkbox etc...
  renderField(field: Field) {
     const fieldId = `field-${field.name}`;
     switch (field.type) {
      case "text":
      case "email":
        return html`
          <label>
            ${field.label}
            <input
              id=${fieldId}
              type=${field.type}
              name=${field.name}
              placeholder=${field.placeholder ?? ""}
              maxlength=${ifDefined(field.maxLength)}
              ?required=${field.required ?? false}
              @input=${(e: Event) => this._onInput(e, field.name)}
            />
          </label>
        `;
      case "select":
        return html`
          <label for=${fieldId}>${field.label}</label>
        <select
          id=${fieldId}
          name=${field.name}
          .value=${field.value ?? ""}
          ?required=${field.required ?? false}
          @change=${(e: Event) => this._onInput(e, field.name)}
        >
          ${(field.options ?? []).map(
            (opt) => html`<option value=${opt.value}>${opt.label}</option>`
          )}
            </select>
          </label>
        `;
     case "checkbox":
      return html`
        <label style="display: flex; flex-direction: row;" for=${fieldId}>
          <input
            id=${fieldId}
            type="checkbox"
            name=${field.name}
            .checked=${!!field.value}
            ?required=${field.required ?? false}
            @change=${(e: Event) => this._onInput(e, field.name)}
          />
          <span>${field.label}</span>
        </label>
      `;
     case "textarea":
      return html`
        <label for=${fieldId}>${field.label}</label>
        <textarea
          id=${fieldId}
          name=${field.name}
          .value=${field.value ?? ""}
           maxlength=${ifDefined(field.maxLength)}
          @input=${(e: Event) => this._onInput(e, field.name)}
        ></textarea>
      `;
    default:
      return html`<div>Unsupported field type: ${field.type}</div>`;
    }
  }

  //Draws the form
  render() {
    if (!this.spec) return html`<div>No form spec provided.</div>`;

    return html`
      <form @submit=${this._onSubmit}>
        <h2>${this.spec.title}</h2>
        ${this.spec.fields.map((field) => this.renderField(field))}
        <button type="submit">Submit</button>
      </form>
    `;
  }

  //Styles
static styles = css`
  :host {
    display: block;
    max-width: 520px;
    width: 100%;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
    background: #f9fafb;
    border-radius: 1.5rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1.5px 6px rgba(0,0,0,0.02);
    padding: 2.5rem 2rem 2rem 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }

  h2 {
    margin-bottom: 0.5em;
    font-size: 1.7rem;
    font-weight: 700;
    color: #21243d;
    letter-spacing: -1px;
    text-align: center;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    gap: 0.4em;
  }

  input[type="text"],
  input[type="email"],
  textarea,
  select {
    padding: 0.65em 0.9em;
    border: 1.5px solid #cfcfd7;
    border-radius: 0.7em;
    font-size: 1.03rem;
    background: #fff;
    color: #000; /* <-- Ensures black text */
    transition: border 0.2s, box-shadow 0.2s;
    outline: none;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  textarea:focus,
  select:focus {
    border-color: #607aff;
    box-shadow: 0 0 0 2px #dbeafe;
  }

  input[type="checkbox"] {
    width: 1.1em;
    height: 1.1em;
    accent-color: #607aff;
    margin-right: 0.6em;
    vertical-align: middle;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    gap: 0.6em;
  }

  button[type="submit"] {
    margin-top: 0.5em;
    padding: 0.85em 0;
    border: none;
    border-radius: 0.8em;
    background: linear-gradient(90deg, #607aff 60%, #8eafff 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(60,90,160,0.08);
    transition: background 0.2s, box-shadow 0.2s;
  }

  button[type="submit"]:hover,
  button[type="submit"]:focus {
    background: linear-gradient(90deg, #4b6aff 70%, #7aa9ff 100%);
    box-shadow: 0 4px 14px rgba(60,90,160,0.14);
  }

  .form-message {
    color: #d7263d;
    font-size: 0.95rem;
    margin-top: 0.3em;
    margin-bottom: -0.5em;
    font-weight: 500;
    letter-spacing: 0.1px;
  }
`;
}

