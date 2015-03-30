var _ = require('lodash'),
    blockBase = require('../app/block-base');


module.exports = blockBase.extend({
    initialization: function () {
        this.initialize();

        this.sourceRoot(this.destinationRoot() + '/templates/block');
        this.modConfig = {};
    },

    prompting: {
        modValue: function () {
            var done = this.async();

            this.prompt({
                type: 'input',
                name: 'value',
                message: 'Modification value'
            }, function (answer) {
                _.assign(this.modConfig, answer);

                done();
            }.bind(this))
        },

        blockType: function () {
            this.promptBlockType(this.modConfig);
        },

        blockTemplate: function () {
            this.promptHasTemplate(this.blockConfig);
        },

        blockName: function () {
            this.promptBlockName(this.modConfig);
        },

        blockParts: function () {
            this.promptParts(this.modConfig);
        }
    },

    writing: function () {
        this.createModParts(this.modConfig);
    }
});

