const AIconTool = require("./AIconTool");

class FacilitiesEnemy extends AIconTool {

  /**
   * @param {EditTools} tools
   * @param {import("ol").Map} map
   */
  constructor(tools, map) {
    super(tools, map, 'facility-enemy', 'emoji-angry', {
      title: 'Enemy Structures',
      zIndex: 10,
      left: '5em',
      iconSelect: true,
      iconDefault: 'enemy_base',
      layerGroup: tools.facilitiesGroup,
    });
  }
}

module.exports = FacilitiesEnemy