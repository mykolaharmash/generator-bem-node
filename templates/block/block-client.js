BEM.DOM.decl('<%= blockName %>', {
    onSetMod: {
        js: function () {
            this.__base.apply(this, arguments);


        }
    }
});
