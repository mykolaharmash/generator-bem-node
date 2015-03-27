var generators = require('yeoman-generator'),
    pkg = require('../package.json'),
    _ = require('lodash'),
    config;

module.exports = generators.NamedBase.extend({
    initialization: function () {
        try {
            config = require(this.destinationRoot() + '/.yo-rc')[pkg.name];
        } catch (e) {
            throw new Error('Run \'yo bem-node\' to configure project');
        }

        this.sourceRoot(this.destinationRoot() + '/templates/block');
        this.blockConfig = {};
    },

    prompting: {
        blockType: function () {
            var done;

            if (!config['blocks-types-separation']) {
                _.assign(this.blockConfig, {
                    type: ''
                });

                return;
            }

            done = this.async();

            this.prompt({
                type: 'list',
                name: 'type',
                message: 'Block type',
                choices: config['blocks-types']
            }, function (answer) {
                _.assign(this.blockConfig, answer);

                done();
            }.bind(this));
        },

        blockParts: function () {
            var done = this.async();

            this.prompt({
                type: 'checkbox',
                name: 'parts',
                message: 'Parts block consists of',
                choices: [
                    'common',
                    'template',
                    'client',
                    'private',
                    'server'
                ]
            }, function (answer) {
                _.assign(this.blockConfig, answer);

                done();
            }.bind(this));
        }
    },

    writing: function () {
        var typesMap = {
                common: '',
                template: 'JSON',
                client: 'DOM',
                private: '',
                server: ''
            },
            extensionsMap = {
                common: 'common',
                template: 'common',
                client: '',
                private: 'priv',
                server: 'server'
            };

        this.blockConfig.parts.forEach(function (part) {
            var ext = extensionsMap[part] ? '.js' : 'js';

            this.fs.copyTpl(
                this.templatePath('block-' + part + '.js'),
                this.destinationPath([
                    config['blocks-root'],
                    this.blockConfig.type,
                    this.name + '.' + extensionsMap[part] + ext
                ].join('/')),
                {
                    blockType: typesMap[part],
                    blockName: this.name
                }
            );
        }.bind(this));
    }
});
