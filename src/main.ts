import './components/dynamic-form.ts';
import './components/dynamic-form-second.ts';
import spec from './assets/form-spec.json';
import spec2 from './assets/form-spec-second.json';

// Once the DOM is loaded, set the spec
window.addEventListener('DOMContentLoaded', () => {
  const formWest = document.querySelector('dynamic-form');
  const formEast = document.querySelector('dynamic-form-second');
  if (formWest) {
    (formWest as any).spec = spec;
  }
  if (formEast) {
    (formEast as any).spec = spec2;
  }
});