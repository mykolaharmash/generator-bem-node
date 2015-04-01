var _ = require('lodash'),
    blockBase = require('../app/block-base');


module.exports = blockBase.extend({
    initialization: function () {
        this.initialize();

        this.conf = {
            elem: this.name
        };
    },

    prompting: {
        blockType: function () {
            this.promptBlockType(this.conf);
        },

        elemTemplate: function () {
            this.promptHasTemplate(this.conf);
        },

        blockName: function () {
            this.promptBlockName(this.conf);
        },

        blockParts: function () {
            this.promptParts(this.conf);
        }
    },

    writing: function () {
        this.create(this.conf);
    }
});
