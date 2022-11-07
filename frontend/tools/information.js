const {Style, Icon} = require("ol/style");
const TomSelect = require("tom-select");
const AIconTool = require("./AIconTool");

class Information extends AIconTool {

  /**
   * @param {EditTools} tools
   * @param {import("ol").Map} map
   */
  constructor(tools, map) {
    super(tools, map, 'information', 'exclamation-triangle', {
      title: 'Informations',
      zIndex: 50,
      allowEditWithIconsACL: true,
    });

    this.signSelect = new TomSelect('#information-form-sign', {
      render: {
        option: (data, escape) => {
          return `<div><img src="${this.getSignImageUrl(data.value)}" alt="${data.text}"></div>`;
        },
        item: (data, escape) => {
          return `<div><img src="${this.getSignImageUrl(data.value)}" alt="${data.text}"></div>`;
        }
      }
    })
    this.signSelect.on('change', () => {
      if (this.draw) {
        this.draw.changed()
      }
    })
  }

  style = (feature, zoom) => {
    const sign = feature.get('sign') || this.signSelect.getValue();
    return new Style({
      image: new Icon({
        src: this.getSignImageUrl(sign),
      }),
    })
  }

  toolRightClick = () => {
    this.tools.changeTool(false);
  }

  setFeatureProperties = (feature) => {
    feature.set('sign', this.signSelect.getValue());
  };

  clearInput() {
    this.signSelect.setValue('warning');
  }

  getSignImageUrl = (sign) => {
    switch (sign) {
      default:
        return 'images/' + sign + '_sign.svg'

      case 'dead_end':
      case 'dual_carriageway_ends_ahead':
      case 'information':
      case 'keep_left':
      case 'keep_right':
      case 'level_crossing':
      case 'maintenance':
      case 'motorway':
      case 'motorway_end':
      case 'no_stopping':
      case 'no_waiting':
      case 'parking':
        return 'images/' + sign + '.svg'
    }
  }

  featureSelected = (feature) => {
    this.signSelect.setValue(feature.get('sign'))
  }

}

module.exports = Information