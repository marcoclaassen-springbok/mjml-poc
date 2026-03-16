const mjml = require('mjml');
const { components } = require('mjml-core'); // Pak de centrale componenten map
const fs = require('fs');
const path = require('path');
const registerCustomComponents = require('./src/components/index');

console.log('--- Start Build ---');

// 1. Alle componenten in src/components automatisch registreren
registerCustomComponents(components);

try {
  const mjmlPath = path.resolve(__dirname, 'src/index.mjml');
  const mjmlInput = fs.readFileSync(mjmlPath, 'utf8');

  // 2. Compileren
  const result = mjml(mjmlInput, {
    filePath: mjmlPath,
    validationLevel: 'skip',
    minify: false
  });

  if (!fs.existsSync('./output')) fs.mkdirSync('./output');
  fs.writeFileSync('./output/index.html', result.html);
  
  console.log('🚀 Build succesvol! De raket is geland.');
} catch (err) {
  console.error("Fout tijdens compileren:", err);
}