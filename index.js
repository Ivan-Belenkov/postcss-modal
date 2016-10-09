/**
 * Created by Ivan on 09.10.2016.
 */
"use strict";

let postcss = require("postcss"),
    objToRule = require("./common/obj-to-rule"),
    clone = require("./common/clone");

let defaults = {};

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
    "overflow-y": "auto",
    "white-space": "normal"
};

module.exports = postcss.plugin("postcss-modal", plugin);

function plugin() {
    return function(css) {
        css.walkDecls("display", function(decl) {
            let configuration = {};

            if (decl.value !== "modal") return;

            processConfiguration(decl.parent, decl, configuration);
            createRules(decl.parent, configuration);
        });
    }
}

function processConfiguration(rule, declaration, configuration) {
    let selectors = [];

    configuration.container = clone(defaults.container);
    configuration.child = clone(defaults.child);
    configuration.child.source = declaration.source;
    configuration.pseudo = clone(defaults.pseudo);
    configuration.pseudo.source = declaration.source;

    for (let i = 0; i < rule.selectors.length; i++) {
        selectors.push(rule.selectors[i] + " > *");
    }

    configuration.child.selector = selectors.join(", ");

    selectors = [];

    for (let i = 0; i < rule.selectors.length; i++) {
        selectors.push(rule.selectors[i] + ":before");
    }

    configuration.pseudo.selector = selectors.join(", ");
}

function createRules(rule, configuration) {
    let parent = rule.parent,
        pseudo = objToRule(configuration.pseudo),
        child = objToRule(configuration.child);

    objToRule(configuration.container, rule);
    parent.insertAfter(rule, child);
    parent.insertAfter(rule, pseudo);
}