export class FieldMock {
  id = '';
  type = '';
  name = '';
  label = '';
  placeholder?: string = undefined;
  maxLength?: number = undefined;
  required?: boolean = undefined;
  options?: { label: string; value: string }[] = undefined;
  value?: string = undefined;
}
