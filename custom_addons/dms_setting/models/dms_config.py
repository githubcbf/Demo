import logging
from odoo import api, models, fields, _

_logger = logging.getLogger(__name__)


#  dms 设置
class DMSConfig(models.TransientModel):
    _inherit = 'res.config.settings'

    def _get_current_company(self):
        company_id = self.env.user.company_id
        return company_id

    company_id = fields.Many2one(
        'res.company',
        string='Company',
        required=True,
        default=lambda self: self._get_current_company())

    # 工时单价
    time_unit_price = fields.Many2one(
        related="company_id.time_unit_price",
        required=True,
        readonly=False,
        store=True,
        string='Time Price Unit'
    )
