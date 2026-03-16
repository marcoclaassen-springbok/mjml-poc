const fs = require('fs');
const path = require('path');
const { registerComponent } = require('mjml-core');

function registerAllComponents() {
  const componentsDir = __dirname;
  
  fs.readdirSync(componentsDir).forEach(file => {
    // Pak alle .js bestanden behalve deze index.js zelf
    if (file !== 'index.js' && file.endsWith('.js')) {
      const component = require(path.join(componentsDir, file));
      
      // Controleer of het een geldige MJML component is met een tagName
      if (component.tagName) {
        registerComponent(component);
        console.log(`- Geregistreerd: <${component.tagName}>`);
      }
    }
  });
}

module.exports = { registerAllComponents };