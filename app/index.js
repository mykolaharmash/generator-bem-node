var generators = require('yeoman-generator'),
    fs = require('fs'),
    _ = require ('lodash');

function getTypes(path) {
    return fs.readdirSync(path).filter(function (item) {
        return fs.statSync(path + '/' + item).isDirectory();
    });
}

module.exports = generators.Base.extend({
    initialization: function () {
        this.userConfig = {};
    },

    prompting: {
        blocksRoot: function () {
            var done = this.async();

            this.prompt({
                type: 'input',
                name: 'blocks-root',
                message: 'Your project\'s blocks root',
                default: 'blocks'
            }, function (answer) {
                _.assign(this.userConfig, answer);

                done();
            }.bind(this));
        },

        typesSeparation: function () {
            var done = this.async();

            this.prompt({
                type: 'confirm',
                name: 'blocks-types-separation',
                message: 'Does your project has blocks types separation (e.g. data, desktop, etc.)',
                default: true
            }, function (answer) {
                _.assign(this.userConfig, answer);

                done();
            }.bind(this));
        },

        blocksTypesList: function () {
            var done,
                types;

            if (!this.userConfig['blocks-types-separation']) {
                _.assign(this.userConfig, {
                    'blocks-types': []
                });

                return;
            }

            done = this.async();
            types = getTypes(this.destinationRoot() + '/' + this.userConfig['blocks-root']);

            this.prompt({
                type: 'input',
                name: 'blocks-types',
                message: 'Blocks types list (comma separated)',
                default: types.join(', '),
                filter: function (answer) {
                    return answer.split(',').map(function (type) {
                        return type.trim();
                    });
                }
            }, function (answer) {
                _.assign(this.userConfig, answer);

                done();
            }.bind(this));
        }
    },

    configuring: function () {
        console.log(this.userConfig);

        this.config.set(this.userConfig);
    }
});
