import { html, TemplateResult } from 'lit';

export const HiddenInput = (id: string, attrs: Record<string, any>): TemplateResult => html` <input type="hidden" id="${id}" ...="${attrs}" /> `;
