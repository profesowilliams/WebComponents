import '../../../components/Lit/Flyout';
import '../../../components/Lit/Flyout/FlyoutHeader';
import '../../../components/Lit/Flyout/FlyoutBody';
import '../../../components/Lit/Flyout/FlyoutFooter';
import '../../../components/Lit/Flyout/FlyoutButton';
import '../../../components/Lit/Heading';
import '../../../components/Lit/Notification';
import '../../../components/Lit/Input';
import '../../../components/Lit/Input/Dropdown';
import '../../../components/Lit/Icon';
import customStyles from './Import.scss?inline';

export default {
  title: 'Pages/InTouch/Import',
  parameters: {
    layout: 'fullscreen',
    options: {
      bottomPanelHeight: 0,
    },
  },
  tags: ['!autodocs'],
};

export const Import = () => {
  const template = `
    <style>
      ${customStyles}
      </style>
    <tds-flyout show size="sm" placement="end" id="import-quote-flyout" aria-labelledby="offcanvasLabel" scrollable backdrop="true">
      <tds-flyout-header>
        <tds-flyout-title>Import</tds-flyout-title>
      </tds-flyout-header>
      <tds-flyout-body id="flyout-body">
        <p class="pt-3 mb-4 text-black-100">Complete the required fields below to import new quotes.</p>

        <div class="layout-container">
          <div class="form-elements">
            <div class="dropdown-group">
              <tds-dropdown id="dropdown" required options='["Option 1", "Option 2", "Option 3"]'>Vendor</tds-dropdown>
              <tds-dropdown id="dropdown-1" required size="100" options='["Red", "Blue", "Green", "Yellow", "Purple"]'>Vendor program</tds-dropdown>
            </div>
            <tds-file-input apiEndpoint="https://westeu-sit-ui.dc.tdebusiness.cloud/ui-renewal/v1/ImportDocumentQuote/Validate"></tds-file-input>
          </div>
        </div>
      </tds-flyout-body>
      <tds-flyout-footer>
        <tds-flyout-button disabled type="button" variant="primary" theme="light" label="Button" color="teal">Import</tds-flyout-button>
      </tds-flyout-footer>
    </tds-flyout>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  return wrapper;
};
