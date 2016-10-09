/**
 * Created by Ivan on 09.10.2016.
 */
"use strict";
let postcss = require("postcss");
let expect  = require("chai").expect;

let plugin = require("../");

let pass = function (input, output, options, done) {
    postcss([plugin(options)]).process(input).then(function (result) {
        expect(result.css).to.equal(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe("postcss-modal-test", function() {
    it("Должен корректно работать со стандартными значениями свойства display", function(done) {
        pass(
            `a {
                display: inline;
            }

            b {
                display: block;
            }`,
            `a {
                display: inline;
            }

            b {
                display: block;
            }`,
            {}, done
        );
    });

    it("Должен корректно работать со значением display: modal", function(done) {
        pass(
            `.a {
                display: modal;
            }`,
            `.a {
                display: block;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 2147483646;
                overflow: hidden;
                white-space: nowrap;
                font-size: 0;
                text-align: center;
            }
.a:before {
                content: "";
                display: inline-block;
                vertical-align: middle;
                height: 100%;
                width: 0;
}
.a > * {
                display: inline-block;
                box-sizing: border-box;
                vertical-align: middle;
                max-height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                white-space: normal;
}`,
            {}, done
        );
    });
});
