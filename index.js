/**
 * Created by Ivan on 09.10.2016.
 */

var postcss = require("postcss"),
    objToRule = require("./common/obj-to-rule"),
    clone = require("./common/clone");

var defaults = {};

defaults.container = {
    "display": "block",
    "position": "fixed",
    "top": "0",
    "right": "0",
    "bottom": "0",
    "left": "0",
    "z-index": "2147483646",
    "overflow": "hidden",
    "white-space": "nowrap",
    "font-size": 0,
    "text-align": "center"
};

defaults.pseudo = {
    "content": "\"\"",
    "display": "inline-block",
    "vertical-align": "middle",
    "height": "100%",
    "width": "0"
};

defaults.child = {
    "display": "inline-block",
    "box-sizing": "border-box",
    "vertical-align": "middle",
    "max-height": "100%",
    "overflow-x": "hidden",
    "overflow-y": "auto"
};

module.exports = postcss.plugin("postcss-modal", plugin);

function plugin() {
    return function(css, result) {

    }
}