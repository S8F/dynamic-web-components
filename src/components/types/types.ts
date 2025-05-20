export type Field = {
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

export type FormSpec = {
  title: string;
  fields: Field[];
};

// export type InputType =
// "hidden" | "text" | "search" | "tel" | "url" | "email" 
// | "password" | "datetime" | "date" | "month" | "week" 
// | "time" | "datetime-local" | "number" | "range" 
// | "color" | "checkbox" | "radio" | "file" 
// | "submit" | "image" | "reset" | "button";