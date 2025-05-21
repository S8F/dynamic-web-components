import { LitElement, html, css } from "lit-element";
import { property, customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Field, FormSpec } from "./types/types";
import "./input-components/input";


@customElement("dynamic-form")
export class DynamicForm extends LitElement {
  @property({ type: Object }) spec: FormSpec | null = null;

  //Save the values
  private _formValues: Record<string, any> = {};

  //Handles values whenever the for form changgs
  private _onFieldInput(e: CustomEvent) {
    const { name, value } = e.detail;
    this._formValues[name] = value;
  }

  //Submit and validate the form + logging the values and show them in an alert :)
  private _onSubmit(e: Event) {
    e.preventDefault();
  const fields = this.renderRoot.querySelectorAll('dynamic-input-field');
  let valid = true;
  fields.forEach((field: any) => {
    if (typeof field.validate === 'function') {
      if (!field.validate()) valid = false;
    }
  }); 
    if (!valid) {
    alert('fill in the required fields');
    return;
  }
    console.log("Form submitted:", this._formValues);
    alert(JSON.stringify(this._formValues, null, 2));
  }

  //Handle native input events
  private _onNativeInput(e: Event) {
  const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  let value: any;
  if (target.type === "checkbox") {
    value = (target as HTMLInputElement).checked;
  } else {
    value = target.value;
  }
  this._formValues[target.name] = value;
}
  //Render the fields based on each type
  renderField(field: Field) {
  const fieldId = `field-${field.name}`;
  switch (field.type) {
    case "text":
    case "email":
      return html`
        <div>
          <dynamic-input-field
            id="dynamicInputField"
            .field=${field}
            @field-input=${this._onFieldInput}
          ></dynamic-input-field>
        </div>
      `;
    case "select":
      return html`
        <div>
          <label for=${fieldId}>${field.label}</label>
          <select
            id=${fieldId}
            name=${field.name}
            .value=${field.value ?? ""}
            ?required=${field.required ?? false}
            @change=${this._onNativeInput}
          >
            ${(field.options ?? []).map(
              (opt) => html`<option value=${opt.value}>${opt.label}</option>`
            )}
          </select>
        </div>
      `;
    case "checkbox":
      return html`
        <div>
          <label style="display: flex; flex-direction: row;" for=${fieldId}>
            <input
              id=${fieldId}
              type="checkbox"
              name=${field.name}
              .checked=${!!field.value}
              ?required=${field.required ?? false}
              @change=${this._onNativeInput}
            />
            <span>${field.label}</span>
          </label>
        </div>
      `;
    case "textarea":
      return html`
        <label for=${fieldId}>${field.label}</label>
        <textarea
          id=${fieldId}
          name=${field.name}
          .value=${field.value ?? ""}
          maxlength=${ifDefined(field.maxLength)}
          @input=${this._onNativeInput} 
        ></textarea>
      `;
    default:
      return html`<div>Unsupported field type: ${field.type}</div>`;
  }
}

  //render and show msg if no spec is provided otherwise show form using the spec
  render() {
    if (!this.spec) return html`<div>No form spec provided.</div>`;

    return html`
      <form @submit=${this._onSubmit}>
        <h2 class="headliner">${this.spec.title}</h2>
        ${this.spec.fields.map((field) => this.renderField(field))}
        <button type="submit">Submit</button>
      </form>
    `;
  }

  //Isolated styles for the form
  static styles = css`
  :host {
    display: block;
    max-width: 520px;
    width: 100%;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
    background: #faf5f5;
    border-radius: 0.5rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1.5px 6px rgba(0,0,0,0.02);
    padding: 2.5rem 2rem 2rem 2rem;
  }
div{
    display: flex;
    flex-direction: column;
    padding:0;
    margin:0;
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
  textar
  ea,
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
    background:white !important;
    color: black;
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

  .headliner{
  padding:0 !important;
  margin:0 !important;
}
  #dynamicInputField{
    padding:0;
    margin:0;
  }
`;
}
