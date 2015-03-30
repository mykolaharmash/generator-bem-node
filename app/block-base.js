var generators = require('yeoman-generator'),
    pkg = require('../package.json'),
    _ = require('lodash');

module.exports = generators.NamedBase.extend({
    initialize: function () {
        try {
            this.projectConf = require(this.destinationRoot() + '/.yo-rc')[pkg.name];
        } catch (e) {
            throw new Error('Run \'yo bem-node\' to configure project');
        }

        this.sourceRoot(this.destinationRoot() + '/templates/block');
    },

    promptBlockName: function (config) {
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'block-name',
            message: 'Block name',
        }, function (answer) {
            _.assign(config, answer);

            done();
        }.bind(this));
    },

    promptBlockType: function (config) {
        var done;

        if (!this.projectConf['blocks-types-separation']) {
            _.assign(config, {
                type: ''
            });

            return;
        }

        done = this.async();

        this.prompt({
            type: 'list',
            name: 'type',
            message: 'Block type',
            choices: this.projectConf['blocks-types']
        }, function (answer) {
            _.assign(config, answer);

            done();
        }.bind(this));
    },

    promptHasTemplate: function (config) {
        var done = this.async();

        this.prompt({
            type: 'confirm',
            name: 'has-template',
            message: 'Has template',
            default: true
        }, function (answer) {
            _.assign(this.config, answer);

            done();
        }.bind(this));
    },

    promptParts: function (config) {
        var done = this.async();

        this.prompt({
            type: 'checkbox',
            name: 'parts',
            message: 'Parts block consists of',
            choices: [
                'common',
                'js',
                'priv',
                'server',
                'deps'
            ]
        }, function (answer) {
            _.assign(config, answer);

            done();
        }.bind(this));
    },

    createBlockParts: function (options) {
        options.parts.forEach(function (part) {
            this._createPart({
                hasTemplate: options['has-template'],
                part: part,
                destination: [
                    this.projectConf['blocks-root'],
                    options.type,
                    this.name,
                    this.name + this._getPartExtension(part)
                ].join('/'),
                declaration: {
                    short: true,
                    block: this.name
                }
            });
        }.bind(this));
    },

    createModParts: function (options) {
        options.parts.forEach(function (part) {
            this._createPart({
                hasTemplate: options['has-template'],
                part: part,
                destination: [
                    this.projectConf['blocks-root'],
                    options.type,
                    options['block-name'],
                    '_' + this.name,
                    options['block-name'] + '_' + this.name + '_' + options.value + this._getPartExtension(part)
                ].join('/'),
                declaration: {
                    short: false,
                    block: options['block-name'],
                    modName: this.name,
                    modVal: options.value
                }
            });
        }.bind(this));
    },

    _createPart: function (options) {
        var declaration;

        if (options.declaration.short) {
            declaration = '\'' + options.declaration.block + '\'';
        } else {
            declaration = [
                '{block: \'',
                options.declaration.block,
                '\', modName: \'',
                options.declaration.modName,
                '\', modVal: \'',
                options.declaration.modVal,
                '\'}'
            ].join('');
        }

        this.fs.copyTpl(
            this.templatePath(this._getTemplateName(options)),
            this.destinationPath(options.destination),
            {
                declaration: declaration
            }
        );
    },

    _getPartExtension: function (part) {
        var extensionsMap = {
            common: '.common',
            js: '',
            priv: '.priv',
            server: '.server',
            deps: '.deps'
        };

        return extensionsMap[part] + '.js';
    },

    _getTemplateName: function (options) {
        var type;

        if (options.part !== 'common' || !options.hasTemplate) {
            type = options.part;
        } else {

            type = 'template';
        }

        return 'block.' + type + '.tmpl';
    }
});

