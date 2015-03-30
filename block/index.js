var _ = require('lodash'),
    blockBase = require('../app/block-base');

module.exports = blockBase.extend({
    initialization: function () {
        this.initialize();

        this.blockConfig = {};
    },

    prompting: {
        blockType: function () {
            this.promptBlockType(this.blockConfig);
        },

        blockTemplate: function () {
            this.promptHasTemplate(this.blockConfig);
        },

        blockParts: function () {
            this.promptParts(this.blockConfig);
        }
    },

    writing: function () {
        this.createBlockParts(this.blockConfig);
    }
});
