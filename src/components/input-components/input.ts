import { LitElement, html, css } from "lit-element";
import { property, customElement } from "lit/decorators.js";
import type { Field } from "../types/types";

@customElement("dynamic-input-field")
export class DynamicInputField extends LitElement {
    @property({ type: Object }) field: Field | null = null;



 render() {
    if (!this.field) return null;
    return html`
      <div>
        <label>${this.field.label}</label>
        <input
          type="text"
          .value=${this.field.value ?? ""}
          ?required=${this.field.required ?? false}
          @input=${(e: any) =>
            this.dispatchEvent(
              new CustomEvent('field-input', {
                detail: { name: this.field!.name, value: e.target.value },
                bubbles: true,
                composed: true,
              })
            )
          }
        />
      </div>
    `;
  }

  public validate(): boolean {
    const input = this.renderRoot.querySelector('input');
    if (this.field?.required && !input?.value) {
      input?.setCustomValidity('This field is required');
      input?.reportValidity();
      return false;
    }
    input?.setCustomValidity('');
    return true;
  }

  // Isolated styles for input component
   static styles = css`
  
div {
    display: flex;
    flex-direction: column;
    padding:0;
    margin:0;
  }

  input[type="text"],
  input[type="email"]
 {
    padding: 0.65em 0.9em;
    border: 1.5px solid #cfcfd7;
    border-radius: 0.2em;
    font-size: 1.03rem;
    background: #fff;
    color: #000; /* <-- Ensures black text */
    transition: border 0.2s, box-shadow 0.2s;
    outline: none;
  }

  input[type="text"]:focus,
  input[type="email"]:focus
   {
    border-color: #607aff;
    box-shadow: 0 0 0 2px #dbeafe;
  }
`;
}
