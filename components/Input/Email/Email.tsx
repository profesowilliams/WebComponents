import { html, TemplateResult } from 'lit';
import customStyles from './Email.scss?inline';

export const EmailInput = (id: string, placeholder: string, label: string, attrs: Record<string, any>): TemplateResult => html`
  <style>
    ${customStyles}
  </style>
  <div class="form-floating">
    <input type="email" class="form-control" id="${id}" placeholder="${placeholder}" ...="${attrs}" />
    <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
    <label for="${id}">${label}</label>
  </div>
`;
