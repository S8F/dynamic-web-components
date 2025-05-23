----------------------------------------------------------------------------
Run
----------------------------------------------------------------------------

- npm i 
- npm run dev
- http://localhost:5173/

----------------------------------------------------------------------------
Description
----------------------------------------------------------------------------
**This solution is a simple dynamic form web component built with Lit and TypeScript. The component <dynamic-form> takes a form specification (spec), describing what fields to render (like text, select, checkbox, etc.), and generates the entire form dynamically. It’s a great starting point for use cases where form structures change at runtime, like CMS back offices (Umbraco in this case), survey tools, or admin panels.**
S
**The json has 2 properjson files**


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
- **Add more comprehensive validation and error handling for both approaches**
- **Implement more advanced field types -> selects, checkboxes etc.**
- **Install r**
- **Enhance styling and theming for better user experience.**
-**lit-lab for integration, redux for global state and purify for security**
