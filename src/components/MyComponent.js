// src/components/MyComponent.js
module.exports = (BodyComponent) => {
  return class MyComponent extends BodyComponent {
    static tagName = 'mj-my-component';
    static endingTag = true;

    render() {
      return `
        <tr>
          <td align="center" style="background-color: yellow; padding: 40px;">
            <p style="margin: 0; font-family: Arial; font-size: 20px; color: black;">
              HET WERKT NU ECHT!
            </p>
            <p style="color: black;">${this.getContent() || 'Geen tekst'}</p>
          </td>
        </tr>
      `;
    }
  }
};