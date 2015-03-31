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
            name: 'block',
            message: 'Block name',
        }, function (answer) {
            _.assign(config, answer);

            done();
        }.bind(this));
    },

    promptElemName: function (config) {
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'elem',
            message: 'Element name',
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
            _.assign(config, answer);

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
                'deps',
                'less'
            ]
        }, function (answer) {
            _.assign(config, answer);

            done();
        }.bind(this));
    },

    create: function (options) {
        var destPath = this.projectConf['blocks-root'];

        if (options.type) {
            destPath += '/' + options.type;
        }

        destPath += '/' + this._getBemPath(options);

        options.parts.forEach(function (part) {
            var destName = this._getBemName(options) + this._getPartExtension(part);

            this.fs.copyTpl(
                this.templatePath(this._getTemplateName(part, options)),
                this.destinationPath(destPath + '/' + destName),
                {
                    declaration: part === 'less' ?
                        this._getBemName(options) : this._getDeclaration(options)
                }
            );
        }.bind(this));
    },

    _getDeclaration: function (options) {
        var decl = [],
            keys = ['block', 'modName', 'modVal'];

        keys.forEach(function (key) {
            if (options[key] !== undefined) {
                decl.push(key + ': ' + this._wrapValue(options[key]));
            }
        }.bind(this));

        if (decl.length === 1) {
            return this._wrapValue(options[keys[0]]);
        }

        return '{' + decl.join(', ') + '}';
    },

    _wrapValue: function (val) {
        return '\'' + val + '\'';
    },

    _getPartExtension: function (part) {
        var bare = ['js', 'less'];

        return bare.indexOf(part) !== -1 ? '.' + part : '.' + part + '.js';
    },

    _getTemplateName: function (part, options) {
        var type;

        if (part !== 'common' || !options['has-template']) {
            type = part;
        } else {

            type = 'template';
        }

        return 'block.' + type + '.tmpl';
    },

    _getBemComponents: function (options) {
        var components = [options.block];

        if (options.elem) {
            components.push('__' + options.elem);
        }

        if (options.modName) {
            components.push('_' + options.modName);
            components.push('_' + options.modVal);
        }

        return components;
    },

    _getBemName: function (options) {
        return this._getBemComponents(options).join('');
    },

    _getBemPath: function (options) {
        var components = this._getBemComponents(options);

        if (options.modName) {
            components = components.slice(0, components.length - 1);
        }

        return components.join('/');
    }
});
