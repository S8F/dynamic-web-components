import './components/dynamic-form.ts';
import spec from './assets/form-spec.json';

// Once the DOM is loaded, set the spec
window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('dynamic-form');
  if (form) {
    (form as any).spec = spec;
  }
});