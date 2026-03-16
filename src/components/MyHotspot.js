const { BodyComponent } = require('mjml-core');

class MyHotspot extends BodyComponent {
  static tagName = 'mj-hotspot';

  static allowedAttributes = {
    'image-url': 'string',
    'pointercolor': 'color',
    'textcolor': 'color',
    'top': 'string',
    'left': 'string',
    'title': 'string'
  };

  static defaultAttributes = {
    'pointercolor': '#ff0000',
    'textcolor': '#ffffff',
    'top': '50%',
    'left': '50%'
  };

  constructor(initialValues = {}) {
    super(initialValues);
    this.id = Math.random().toString(36).substr(2, 5);
  }

  render() {
    const imgUrl = this.getAttribute('image-url');
    const pointercolor = this.getAttribute('pointercolor');
    const textcolor = this.getAttribute('textcolor');
    const top = this.getAttribute('top');
    const left = this.getAttribute('left');
    const title = this.getAttribute('title');

    return `
      <style>
        .hotspot-parent-${this.id} { position: relative; display: inline-block; width: 100%; }
        
        /* Verberg de checkbox */
        .hs-input-${this.id} { display: none !important; }

        .hs-point-${this.id} {
          position: absolute;
          top: ${top};
          left: ${left};
          width: 20px;
          height: 20px;
          background-color: ${pointercolor};
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transform: translate(-50%, -50%); /* Zorg dat het midden op de coordinaten ligt */
        }

        .hs-point-${this.id}::after {
          content: '';
          position: absolute;
          width: 100%; height: 100%;
          border-radius: 50%;
          background-color: ${pointercolor};
          opacity: 0.6;
          animation: pulse 2s infinite;
        }

        .hs-tooltip-${this.id} {
          position: absolute;
          top: calc(${top} + 15px);
          left: ${left};
          transform: translateX(-50%);
          background: #333;
          color: ${textcolor};
          padding: 10px;
          border-radius: 5px;
          display: none;
          width: 150px;
          z-index: 20;
          font-family: Arial, sans-serif;
          font-size: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

      .hs-tooltip-${this.id}, 
      .hs-tooltip-${this.id} * { 
        color: ${textcolor} !important; 
      }
      
      /* Specifiek voor MJML teksten die vaker CSS-prioriteit winnen */
      .hs-tooltip-${this.id} div { 
        color: ${textcolor} !important; 
      }

        /* INTERACTIE: Toon op hover EN wanneer aangevinkt (klik op mobiel) */
        .hs-point-${this.id}:hover + .hs-tooltip-${this.id},
        .hs-input-${this.id}:checked + .hs-point-${this.id} + .hs-tooltip-${this.id} {
          display: block !important;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      </style>

      <div class="hotspot-parent-${this.id}">
        <img src="${imgUrl}" style="width: 100%; display: block;" />
        
        <input type="checkbox" id="hs-check-${this.id}" class="hs-input-${this.id}" />
        
        <label for="hs-check-${this.id}" class="hs-point-${this.id}"></label>
        
        <div class="hs-tooltip-${this.id}">
          ${title ? `<strong>${title}</strong><br>` : ''}
          ${this.renderChildren()}
        </div>
      </div>
    `;
  }
}

module.exports = (components) => { components['mj-hotspot'] = MyHotspot; };