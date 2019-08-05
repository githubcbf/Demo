# -*- coding: utf-8 -*-
from odoo import fields, models

class DMSCity(models.Model):
    _name = 'dms.city'
    _description = 'DMS City'

    name = fields.Char("City", required=True, translate=True)
    country_id = fields.Many2one('res.country', string='Country', required=True)
    state_id = fields.Many2one(
        'res.country.state', 'State', domain="[('country_id', '=', country_id)]")


class DMSResCity(models.Model):
    _inherit = 'res.city'
    _description = 'DMS Res City'

    city_id = fields.Many2one('dms.city', string='City')