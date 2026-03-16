const { BodyComponent } = require('mjml-core');

class MyParallax extends BodyComponent {
  static tagName = 'mj-parallax';

  static allowedAttributes = {
    'image-url': 'string',
    'height': 'unit(px)',
    'background-color': 'color',
    'padding': 'unit(px)',
    'overlay-color': 'color',
    'overlay-opacity': 'string'
  };

  static defaultAttributes = {
    'height': '400px',
    'background-color': '#333333',
    'padding': '40px',
    'overlay-color': '#000000',
    'overlay-opacity': '0.4'
  };

  render() {
    const imageUrl = this.getAttribute('image-url');
    const height = this.getAttribute('height');
    const bgColor = this.getAttribute('background-color');
    const padding = this.getAttribute('padding');
    const overlayColor = this.getAttribute('overlay-color');
    const opacity = this.getAttribute('overlay-opacity');

    // We berekenen de hoogte zonder 'px' voor Outlook VML
    const heightValue = height.replace('px', '');

    return `
      <div class="parallax-window" style="
        background-image: linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity})), url('${imageUrl}');
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: ${height};
        background-color: ${bgColor};
        display: table;
        width: 100%;
      ">
        <div style="display: table-cell; vertical-align: middle; padding: ${padding}; text-align: center;">
          ${this.renderChildren()}
        </div>
      </div>

      `;
  }
}

module.exports = (components) => {
  components['mj-parallax'] = MyParallax;
};