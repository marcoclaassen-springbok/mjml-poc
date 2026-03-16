const { BodyComponent } = require('mjml-core');

class MyCustomTest1 extends BodyComponent {
  static tagName = 'mj-custom-test1';
  
  static allowedAttributes = {
    'image-url': 'string',
    'image-width': 'unit(px)',
    'image-height': 'unit(px)',
    'image-position': 'enum(left,right)',
    'href': 'string',
    'background-color': 'color',
    'title': 'string',
    'text-align': 'enum(left,center,right)',
    'border-color': 'color',
    'color': 'color',
  }

  static defaultAttributes = {
    'image-position': 'left',
    'background-color': '#ffffff',
    'image-width': '150px',
    'image-height': 'auto',
    'text-align': 'left',
    'color': '#333333',
    'border-color': '#cccccc'
  };

  render() {
    // 1. Attributen ophalen
    const imgUrl = this.getAttribute('image-url') || 'https://picsum.photos/200/200';
    const imgWidth = this.getAttribute('image-width');
    const imgHeight = this.getAttribute('image-height');
    const position = this.getAttribute('image-position');
    const bgColor = this.getAttribute('background-color');
    const title = this.getAttribute('title');
    const textAlign = this.getAttribute('text-align');
    const borderColor = this.getAttribute('border-color');
    const color = this.getAttribute('color');
    const href = this.getAttribute('href');

    const imageCol = `
      <td style="padding: 20px; vertical-align: middle; width: ${imgWidth};">
        <img 
          src="${imgUrl}" 
          width="${imgWidth.replace('px', '')}" 
          height="${imgHeight === 'auto' ? '' : imgHeight.replace('px', '')}"
          style="display: block; border-radius: 8px; width: ${imgWidth}; height: ${imgHeight};" 
        />
      </td>
    `;

    const textCol = `
      <td style="padding: 20px; font-family: 'Fira Sans', Arial, sans-serif; color: ${color}; vertical-align: middle; text-align: ${textAlign};">
        ${title ? `
          <h2 style="margin: 0 0 10px 0; font-size: 22px; line-height: 1.2; text-align: ${textAlign};">
            ${title}
          </h2>` : ''}
        <div style="font-size: 16px; line-height: 1.5; text-align: ${textAlign};">
          ${this.renderChildren(null, {
        attributes: { align: textAlign }
      })}
        </div>
      </td>
    `;

    // 4. Bepaal volgorde (Links/Rechts)
    const content = position === 'right' ? (textCol + imageCol) : (imageCol + textCol);

    // 5. De Tabel Structuur
    const tableContent = `
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: ${bgColor}; border: 1px solid ${borderColor}; border-collapse: collapse; border-radius: 8px;">
        <tr>
          ${content}
        </tr>
      </table>
    `;

    // 6. Return met optionele Link
    return href ? `
      <a href="${href}" style="text-decoration: none; color: inherit; display: block;">
        ${tableContent}
      </a>
    ` : tableContent;
  }
}

module.exports = (components) => {
  components['mj-custom-test1'] = MyCustomTest1;
};