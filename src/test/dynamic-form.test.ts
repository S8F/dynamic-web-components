import { describe, it, expect, vi } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import "../components/dynamic-form";
import { FieldMock } from "./field-mock"; 

// Minimal mock for <dynamic-input-field>
customElements.define(
  "dynamic-input-field",
  class extends HTMLElement {
    validate() { return true; }
  }
);

// Create field using FieldMock
const testField = Object.assign(new FieldMock(), {
  id: "user",
  type: "text",
  name: "user",
  label: "User"
});

const formSpec = {
  title: "Simple Form",
  fields: [testField]
};

describe("<dynamic-form>", () => {
  it("renders no spec message", async () => {
    const el = await fixture(html`<dynamic-form></dynamic-form>`);
    expect(el.shadowRoot?.textContent).toContain("No form spec provided");
  });

  it("renders form fields from spec", async () => {
    const el = await fixture(html`<dynamic-form .spec=${formSpec}></dynamic-form>`);
    expect(el.shadowRoot?.querySelector("form")).toBeTruthy();
    expect(el.shadowRoot?.textContent).toContain("Simple Form");
    expect(el.shadowRoot?.querySelectorAll("dynamic-input-field").length).toBe(1);
  });

  it("updates _formValues on field input", async () => {
    const el = await fixture(html`<dynamic-form .spec=${formSpec}></dynamic-form>`);
    const input = el.shadowRoot?.querySelector("dynamic-input-field");
    input?.dispatchEvent(new CustomEvent("field-input", { detail: { name: "user", value: "foo" }, bubbles: true }));
    expect((el as any)._formValues["user"]).toBe("foo");
  });

it("alerts on invalid submit", async () => {
  const el = await fixture(html`<dynamic-form .spec=${formSpec}></dynamic-form>`);
  const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

  // Set validate to return false for THIS instance:
  const input = el.shadowRoot?.querySelector("dynamic-input-field");
  if (input) (input as any).validate = () => false;

  el.shadowRoot?.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));

  expect(alert).toHaveBeenCalledWith(expect.stringContaining("required"));
  alert.mockRestore();
});

});
