const mjml = require('mjml');
const { BodyComponent, components } = require('mjml-core');
const fs = require('fs');
const path = require('path');

// 1. Jouw Custom Component definitie
class MyComponent extends BodyComponent {
  static tagName = 'mj-custom-test';
  static endingTag = true;

  render() {
    // We gebruiken jouw huisstijl-kleuren en font
    return `
      <tr>
        <td align="center" style="background-color: #f2f2f2; padding: 40px; border: 2px dashed #2c3e50;">
          <p style="margin: 0; color: #2c3e50; font-family: 'Fira Sans', Arial, sans-serif; font-size: 24px; font-weight: 700;">
            MAATWERK COMPONENT
          </p>
          <p style="margin: 10px 0 0; color: #2c3e50; font-family: 'Fira Sans', Arial, sans-serif; font-size: 16px;">
            ${this.getContent() || 'Geen tekst meegegeven'}
          </p>
        </td>
      </tr>
    `;
  }
}

// 2. Registratie forceren
components['mj-custom-test'] = MyComponent;

console.log('--- Start Build ---');

try {
  // Pad naar je grote index bestand
  const mjmlPath = path.resolve(__dirname, 'src/index.mjml');
  const mjmlInput = fs.readFileSync(mjmlPath, 'utf8');

  // 3. Compileren met jouw volledige template
  const result = mjml(mjmlInput, {
    filePath: mjmlPath,
    validationLevel: 'skip', // Belangrijk omdat MJML je custom tag anders afkeurt
    minify: false
  });

  if (!fs.existsSync('./output')) fs.mkdirSync('./output');
  fs.writeFileSync('./output/index.html', result.html);
  
  console.log('🚀 Build succesvol! De raket is geland.');
} catch (err) {
  console.error("Fout tijdens compileren:", err);
}