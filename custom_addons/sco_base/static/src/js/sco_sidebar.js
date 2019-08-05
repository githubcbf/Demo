// odoo.define('sco_base.Sidebar', function (require) {
//     "use strict";
//     const core = require('web.core');
//     const session = require('web.session');
//     const Widget = require('web.Widget');
//     $(function () {
//         (function ($) {
//             $.addDebug = function (url) {
//                 url = url.replace(/(.{4})/, "$1?debug");
//                 return url;
//             };
//             $.addDebugWithAssets = function (url) {
//                 url = url.replace(/(.{4})/, "$1?debug=assets");
//                 return url;
//             };
//             $.delDebug = function (url) {
//                 var str = url.match(/web(\S*)#/);
//                 url = url.replace("str/g", "");
//                 return url;
//             };
//         })(jQuery);
//         $("#sidebar a").each(function () {
//             let url = $(this).attr('href');
//             if (session.debug == 1) $(this).attr('href', $.addDebug(url));
//             if (session.debug == 'assets') $(this).attr('href', $.addDebugWithAssets(url));
//             if (session.debug == false) $(this).attr('href', $.delDebug(url));
//         });
//     });
// });
