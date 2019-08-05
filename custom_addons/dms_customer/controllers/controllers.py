# -*- coding: utf-8 -*-
from odoo import http

# class DmsCustomer(http.Controller):
#     @http.route('/dms_customer/dms_customer/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/dms_customer/dms_customer/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('dms_customer.listing', {
#             'root': '/dms_customer/dms_customer',
#             'objects': http.request.env['dms_customer.dms_customer'].search([]),
#         })

#     @http.route('/dms_customer/dms_customer/objects/<model("dms_customer.dms_customer"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('dms_customer.object', {
#             'object': obj
#         })