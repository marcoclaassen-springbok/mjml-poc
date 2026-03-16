// src/components/MyComponent2.js
const { BodyComponent } = require('mjml-core');

class MyComponent2 extends BodyComponent {
  static tagName = 'mj-custom-test2';
  static endingTag = true;

  render() {
    return `
      <tr>
        <td align="center" style="background-color: #f2f2f2; padding: 40px; border: 2px dashed #2c3e50;">
          <p style="margin: 0; color: #2c3e50; font-family: 'Fira Sans', Arial, sans-serif; font-size: 24px; font-weight: 700;">
            MAATWERK COMPONENT2
          </p>
          <p style="margin: 10px 0 0; color: #2c3e50; font-family: 'Fira Sans', Arial, sans-serif; font-size: 16px;">
            ${this.getContent() || 'Geen tekst meegegeven'}
          </p>
        </td>
      </tr>
    `;
  }
}

// Exporteer een functie die de registratie regelt
module.exports = (components) => {
  components['mj-custom-test2'] = MyComponent2;
};