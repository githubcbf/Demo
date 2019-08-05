odoo.define('sco_base.SCOWebClient', function (require) {
    'use strict';
    const AbstractWebClient = require('web.AbstractWebClient');

    AbstractWebClient.include({
        init: function (parent) {
            this._super.apply(this, arguments);
            this.set('title_part', {"zopenerp": "SCO"});
        },
    })
});