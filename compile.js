const { BodyComponent } = require('mjml-core');

class MjCustomSection extends BodyComponent {
  static allowedAttributes = {
    'background-color': 'color',
    'text-color': 'color'
  }

  render() {
    return this.renderMJML(`
      <mj-section background-color="${this.getAttribute('background-color') || '#ffffff'}">
        <mj-column>
          <mj-text color="${this.getAttribute('text-color') || '#000000'}">
            ${this.getContent()}
          </mj-text>
        </mj-column>
      </mj-section>
    `);
  }
}

module.exports = MjCustomSection;