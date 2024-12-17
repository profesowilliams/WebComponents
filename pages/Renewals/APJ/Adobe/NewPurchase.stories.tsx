import '../../../../../components/Lit/Flyout';
import '../../../../../components/Lit/Flyout/FlyoutHeader';
import '../../../../../components/Lit/Flyout/FlyoutBody';
import '../../../../../components/Lit/Flyout/FlyoutFooter';
import '../../../../../components/Lit/Flyout/FlyoutButton';
import '../../../../../components/Lit/Heading';
import '../../../../../components/Lit/Notification';
// import '../../../../../components/Lit/FormGroup';
import '../../../../../components/Lit/Input';
import '../../../../../components/Lit/Input/Checkbox';
import '../../../../../components/Lit/Modal';
import '../../../../../components/Lit/Modal/ModalHeader';
import '../../../../../components/Lit/Modal/ModalBody';
import '../../../../../components/Lit/Modal/ModalFooter';
import '../../../../../components/Lit/Modal/ModalButton';
import '../../../../../components/Lit/Modal/ModalTitle';

export default {
  title: 'Pages/Adobe/New Purchase Flyout',
  parameters: {
    layout: 'fullscreen',
    options: {
      bottomPanelHeight: 0,
    },
  },
  tags: ['!autodocs'],
};

export const WebComponents = () => {
  const template = `
    <tds-flyout show size="lg" placement="end" id="offcanvas" aria-labelledby="offcanvasLabel" scrollable backdrop="true">
      <tds-flyout-header>
        <tds-flyout-title>New purchase</tds-flyout-title>
      </tds-flyout-header>
      <tds-flyout-body id="flyout-body">
        <tds-notification variant="information" show class="mb-3">At this time new purchase is for Adobe products only.</tds-notification>
        <tds-heading as='h8'><strong>Agreement details</strong></tds-heading>
        <tds-heading as='h9'>
          Lorem ipsum dolor sit amet consectetur. Et scelerisque tempor sed rhoncus proin. In scelerisque pellentesque lectus cras donec egestas netus consectetur elementum.
        </tds-heading>
        <p class="small pt-3 text-black-50">* indicated required fields</p>
        <tds-form-group class="d-grid gap-0 row-gap-4" style="place-content: center;">
          <tds-form-group class="d-grid gap-0 row-gap-3" style="width: min(95vw, 22.5rem);">
            <tds-heading as='h8'>Reseller details</tds-heading>
            <tds-input type="text" placeholder="Reseller account number" label="Reseller account number" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Contact first name" label="Contact first name" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Contact last name" label="Contact last name" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Contact email" label="Contact email" required class="pt-3"></tds-input>
          </tds-form-group>
          <tds-form-group class="d-grid gap-0 row-gap-3">
            <tds-heading as='h8'>End user details</tds-heading>
            <tds-input type="text" placeholder="Company name" label="Company name" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Contact first name" label="Contact first name" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Contact last name" label="Contact last name" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Contact email" label="Contact email" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="End user type" label="End user type" required class="pt-3"></tds-input>
          </tds-form-group>
          <tds-form-group class="d-grid gap-0 row-gap-3">
            <tds-heading as='h8'>End user address</tds-heading>
            <tds-input type="text" placeholder="Address 1" label="Address 1" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Address 2" label="Address 2" class="pt-3"></tds-input>
            <tds-input type="text" placeholder="City" label="City" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Area code" label="Area code" required class="pt-3"></tds-input>
            <tds-input type="text" placeholder="Country" label="Country" required class="pt-3"></tds-input>
          </tds-form-group>
        </tds-form-group>
      </tds-flyout-body>
      <tds-flyout-footer id="flyout-footer">
        <tds-flyout-button type="button" variant="tertiary" theme="light" label="Button" color="teal" data-bs-dismiss="flyout">Close</tds-flyout-button>
        <tds-flyout-button type="button" variant="primary" theme="light" label="Button" color="teal" id="next-button">Next</tds-flyout-button>
      </tds-flyout-footer>
    </tds-flyout>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  const nextButton = wrapper.querySelector('#next-button');

  nextButton.addEventListener('click', () => {
    const flyoutBody = wrapper.querySelector('#flyout-body');
    const flyoutFooter = wrapper.querySelector('#flyout-footer');

    flyoutBody.innerHTML = `
      <tds-heading as='h8' color="cool-gray-9"><strong>Order Details</strong></tds-heading>
      <div class="d-flex justify-content-between align-items-start p-3 my-3" style="width: 915px; background: #F8F8F8;">
        <div class="d-flex flex-column gap-2" style="width: 200px;">
          <tds-heading as='h10' color="cool-gray-9"><strong>Reseller details</strong></tds-heading>
          <p class="w-100 text-dark small">
            &lt;Company name&gt; <br />
            &lt;Account number&gt;
          </p>
          <p class="w-100 text-dark small">Jane Doe<br/>Janedoe@email.com</p>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 200px;">
          <tds-heading as='h10' color="cool-gray-9"><strong>End user details</strong></tds-heading>
          <div class="w-100 text-dark p-small">Avenir Global Cherry Advertising LTD</div>
          <p class="w-100 text-dark p-small">Uche Ogbonna<br/>UcheOgbonna@email.com<br/>(123) 123 - 1234</p>
          <div class="w-100 text-dark p-small">End user type: Commercial</div>
        </div>
        <div class="d-flex flex-column gap-2" style="width: 200px;">
          <tds-heading as='h10' color="cool-gray-9"><strong>End user address</strong></tds-heading>
          <div class="text-dark" style="font-size: 14px; line-height: 21px;">
            168-170<br/>Bermondsey Street<br/>London, United Kingdom<br/>54673
          </div>
        </div>
      </div>

      <tds-heading as='h8'><strong>Add products</strong></tds-heading>
      <tds-heading as='h9'>Search for software products you would like to add to your quote. Enter the Vendor part № followed by the desired quantity.</tds-heading>

      <div class="d-inline-flex align-items-end" style="width: 736px; height: 42px; background: white; gap: 40px;">
        <div class="d-flex align-items-end" style="gap: 10px;">
          <div class="d-inline-flex flex-column">
            <div class="text-muted" style="font-size: 12px; font-family: Arial; line-height: 18px;">Start date</div>
            <div class="text-dark" style="font-size: 16px; font-family: Arial; line-height: 24px;">05/21/2024</div>
          </div>
          <div class="text-center text-primary" style="width: 11px; font-size: 16px; font-family: Roboto;">–</div>
          <div class="d-inline-flex flex-column">
            <div class="text-muted" style="font-size: 12px; font-family: Arial; line-height: 18px;">End date</div>
            <div class="d-inline-flex align-items-start" style="border-bottom: 1px solid #888B8D; gap: 10px;">
              <div class="text-dark" style="font-size: 16px; font-family: Arial; line-height: 24px;">05/21/2025</div>
            </div>
          </div>
        </div>
        <div class="d-inline-flex flex-column align-items-start">
          <div class="text-muted" style="font-size: 12px; font-family: Arial; line-height: 18px;">Duration</div>
          <div class="text-dark" style="font-size: 16px; font-family: Arial; line-height: 24px;">365 days</div>
        </div>
        <div class="d-inline-flex flex-column align-items-start">
          <div class="text-muted" style="font-size: 12px; font-family: Arial; line-height: 18px;">License/price level</div>
          <div class="text-dark" style="font-size: 16px; font-family: Arial; line-height: 24px;">2 (Qty: 10-48)</div>
        </div>
      </div>

      <div style="width: 915px; height: 157px; flex-direction: column; justify-content: flex-start; align-items: flex-end; display: inline-flex;padding-top: 0.62rem;">
  <div style="width: 915px; height: 56px; position: relative; border-top: 3px black solid; border-bottom: 1px black solid">
    <div style="width: 113.35px; left: 10px; top: 10px; position: absolute; color: #262626; font-size: 14px; font-family: Arial; font-weight: 700; line-height: 18px; word-wrap: break-word">Product details</div>
    <div style="width: 113.35px; left: 242px; top: 10px; position: absolute; color: #262626; font-size: 14px; font-family: Arial; font-weight: 700; line-height: 18px; word-wrap: break-word">Vendor part № </div>
    <div style="left: 717px; top: 10px; position: absolute; text-align: center; color: #262626; font-size: 14px; font-family: Arial; font-weight: 700; line-height: 18px; word-wrap: break-word">Qty</div>
    <div style="left: 580px; top: 10px; position: absolute; text-align: right"><span style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 700; line-height: 18px; word-wrap: break-word">Unit price<br/></span><span style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; line-height: 18px; word-wrap: break-word">(VND)</span></div>
    <div style="left: 440px; top: 10px; position: absolute; text-align: right"><span style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 700; line-height: 18px; word-wrap: break-word">List price <br/></span><span style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; line-height: 18px; word-wrap: break-word">(VND)</span></div>
    <div style="left: 816px; top: 10px; position: absolute; text-align: right"><span style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 700; line-height: 18px; word-wrap: break-word">Total price<br/></span><span style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; line-height: 18px; word-wrap: break-word">(VND)</span></div>
  </div>

  <div style="align-self: stretch; height: 101px; flex-direction: column; justify-content: flex-start; align-items: flex-end; gap: 16px; display: flex;">
    <div style="align-self: stretch; padding-left: 5px; padding-right: 5px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px #D9D8D7 solid; justify-content: space-between; align-items: flex-start; display: inline-flex">
      <div style="width: 195px; color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; word-wrap: break-word"><product family><br/><product description></div>
      <div style="justify-content: flex-start; align-items: center; display: flex">
        <div style="color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; word-wrap: break-word">65322606CA02A12</div>
      </div>
      <div style="height: 16px; justify-content: flex-end; align-items: center; display: flex">
        <div style="text-align: right; color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; word-wrap: break-word">193.68</div>
      </div>
      <div style="justify-content: flex-start; align-items: flex-start; gap: 2px; display: flex">
        <div style="height: 16px; border-bottom: 1px #888B8D solid; justify-content: flex-end; align-items: center; display: flex">
          <div style="text-align: right; color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; word-wrap: break-word">180.00</div>
        </div>
        <div style="width: 16px; height: 16px; position: relative">
          <div style="width: 11px; height: 12px; left: 3px; top: 2px; position: absolute; background: #888B8D"></div>
        </div>
      </div>
      <div style="height: 16px; justify-content: center; align-items: center; gap: 10px; display: flex"></div>
      <div style="height: 16px; justify-content: flex-end; align-items: flex-end; gap: 8px; display: flex">
        <div style="text-align: center; color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; word-wrap: break-word">1,980.00</div>
        <div style="justify-content: flex-end; align-items: flex-end; display: flex">
          <div style="width: 16px; height: 16px; position: relative">
            <div style="width: 11px; height: 12px; left: 2.50px; top: 2px; position: absolute; opacity: 0; background: #888B8D"></div>
            <div style="width: 11px; height: 12px; left: 2.50px; top: 2px; position: absolute; background: #888B8D"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 210px; padding-right: 29px; justify-content: space-between; align-items: flex-start; display: inline-flex">
      <div style="text-align: center; color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; line-height: 21px; word-wrap: break-word">Subtotal:</div>
      <div style="text-align: center; color: #262626; font-size: 14px; font-family: Arial; font-weight: 400; line-height: 21px; word-wrap: break-word">1,980.00</div>
    </div>
  </div>
</div>
    `;

    flyoutFooter.innerHTML = `
      <tds-flyout-button type="button" variant="tertiary" theme="light" label="Button" color="teal">Back</tds-flyout-button>
      <tds-flyout-button type="button" variant="primary" theme="light" label="Button" color="teal" id="place-order-button">Place order</tds-flyout-button>
    `;

    const placeOrderButton = wrapper.querySelector('#place-order-button');

    placeOrderButton.addEventListener('click', () => {
      const modalTemplate = `
        <tds-modal show fade size="lg" placement="inline" backdrop="true">
          <tds-modal-header>
            <tds-modal-title>
              <tds-heading as='h7' color="charcoal">Place order</tds-heading>
            </tds-modal-title>
          </tds-modal-header>
          <tds-modal-body class="h-100">
            <p class="mb-3">To complete placing your order for <strong>Avenir Global Cherry Advertising LTD</strong>, please provide the following information.</p>
            <tds-input type="text" placeholder="Purchase order number" label="Purchase order number" class="d-block pt-4 pb-3" supporttext="Max 25 characters"></tds-input>
            <tds-checkbox id="agreeToTerms"><div class="d-inline-flex p-small">I have read and accept the&nbsp;<a href="#">TechData Terms & Conditions</a>, applicable&nbsp;<a href="#">Country Specific Terms</a>&nbsp;& the&nbsp;<a href="#">Adobe Terms & Conditions</a>.</div></tds-checkbox>
          </tds-modal-body>

          <tds-modal-footer style="border-top: 1px solid #D9D8D7;">
            <div class="d-inline-flex justify-content-between align-items-center w-100">
              <div class="d-inline-flex flex-column align-items-start">
                <div class="d-inline-flex align-items-start gap-3">
                  <tds-heading as="h7" class="text-center text-primary">
                    Reseller subtotal (VND):
                  </tds-heading>
                  <tds-heading as="h7" class="text-center text-primary">
                    2,033.79
                  </tds-heading>
                </div>
                <div class="d-inline-flex align-items-start w-100 pr-3 gap-3">
                  <div class="text-center text-dark p-small">
                    Taxes not included.
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end align-items-start gap-3">
                <tds-modal-button type="button" variant="tertiary" theme="light" label="Button" color="teal" data-bs-dismiss="modal">Modify order</tds-modal-button>
                <tds-modal-button type="button" variant="primary" theme="light" label="Button" color="teal">Complete order</tds-modal-button>
              </div>
            </div>

          </tds-modal-footer>
        </tds-modal>
      `;

      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = modalTemplate;
      document.body.appendChild(modalWrapper);
    });
  });

  return wrapper;
};
