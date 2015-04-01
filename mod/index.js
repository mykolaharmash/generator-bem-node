var _ = require('lodash'),
    blockBase = require('../app/block-base');


module.exports = blockBase.extend({
    constructor: function () {
        blockBase.apply(this, arguments);

        this.argument('modVal', {type: String, required: true});
    },

    initialization: function () {
        this.initialize();

        this.conf = {
            modName: this.name,
            modVal: this.modVal
        };
    },

    prompting: {
        blockType: function () {
            this.promptBlockType(this.conf);
        },

        modTemplate: function () {
            this.promptHasTemplate(this.conf);
        },

        blockName: function () {
            this.promptBlockName(this.conf);
        },

        elemName: function () {
            this.promptElemName(this.conf);
        },

        blockParts: function () {
            this.promptParts(this.conf);
        }
    },

    writing: function () {
        this.create(this.conf);
    }
});

