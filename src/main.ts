// src/main.ts
import './components/dynamic-form';
import './components/form-field';

// Sample form spec (put your JSON here)
const spec = {
  "title": "User Registration",
  "fields": [
    {
      "type": "text",
      "name": "username",
      "label": "Username",
      "placeholder": "Enter your username",
      "maxLength": 14,
      "required": true
    },
    {
      "type": "email",
      "name": "email",
      "label": "Email Address",
      "required": true
    },
    {
      "type": "select",
      "name": "country",
      "label": "Country",
      "value": "da",
      "options": [
        { "label": "Denmark", "value": "dk" },
        { "label": "Germany", "value": "de" },
        { "label": "USA", "value": "us" }
      ],
      "required": true
    },
    {
      "type": "checkbox",
      "name": "terms",
      "label": "I accept the terms and conditions",
      "required": true
    },
    {
      "type": "textarea",
      "name": "bio",
      "label": "Short Bio",
      "maxLength": 250,
      "value": "..."
    }
  ]
};

// Attach the dynamic form to the DOM
const root = document.getElementById('app');
if (root) {
  const formEl = document.createElement('dynamic-form');
  (formEl as any).spec = spec;
  root.appendChild(formEl);
}