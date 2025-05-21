----------------------------------------------------------------------------
Run
----------------------------------------------------------------------------

- npm i 
- npm run dev
- http://localhost:5173/

----------------------------------------------------------------------------
Description
----------------------------------------------------------------------------

**I have made 2 types of dynamic web componenets.**
**The first tab (West) uses the dynamic input aproach**  
**It's underlying classes are types/input.ts and input-components.ts**

        return html`
          <div>
             <dynamic-input-field id="dynamicInputField" .field=${field} @field-input=${this._onFieldInput}></dynamic-input-field>
          </div>
        `;


**The Second tab (East) uses the classic input aparoach** 

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

**The main priorities were:**
- **Reusability** By creating a dynamic input component, the codebase is easier to maintain and extend for new field types.
- **Clarity:** The classic approach is included for comparison and to provide a clear, understandable baseline.
- **User Experience:** Both approaches ensure that form fields are generated from configuration, making the UI flexible and adaptable to different data models.

----------------------------------------------------------------------------
Improvements with More Time
----------------------------------------------------------------------------

**With additional time, I would:**
- **Add comprehensive validation and error handling for both approaches.**
- **Implement more advanced field types (e.g., selects, checkboxes, date pickers).**
- **Improve accessibility (ARIA attributes, keyboard navigation).**
- **Add unit and integration tests for components and form logic.**
- **Enhance styling and theming for better user experience.**
