// src/components/index.js
const fs = require('fs');
const path = require('path');

module.exports = (components) => {
  const files = fs.readdirSync(__dirname);
  
  files.forEach(file => {
    if (file !== 'index.js' && file.endsWith('.js')) {
      const registerFn = require(path.join(__dirname, file));
      if (typeof registerFn === 'function') {
        registerFn(components);
        console.log(`✅ Component geladen: ${file}`);
      }
    }
  });
};