import logging
from odoo import api, models, fields, _

_logger = logging.getLogger(__name__)


class Company(models.Model):
    _inherit = 'res.company'

    def _get_default_time_unit_price(self):
        _unit_price_one = self.env['dms.dict.work.hours.price'].search([], limit=1)
        if _unit_price_one:
            return _unit_price_one.id
        else:
            return False

    # 工时单价
    time_unit_price = fields.Many2one(
        'dms.dict.work.hours.price',
        required=True,
        default=lambda self: self._get_default_time_unit_price(),
        string='Time Price Unit'
    )
