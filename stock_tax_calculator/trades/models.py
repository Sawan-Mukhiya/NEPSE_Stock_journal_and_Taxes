from django.db import models

class Trade(models.Model):
    TRADE_TYPE = (("BUY", "Buy"), ("SELL", "Sell"))

    symbol = models.CharField(max_length=20)
    trade_type = models.CharField(max_length=4, choices=TRADE_TYPE)

    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    buy_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    broker_commission = models.DecimalField(max_digits=8, decimal_places=2)
    sebon_fee = models.DecimalField(max_digits=8, decimal_places=2)
    dp_charge = models.DecimalField(max_digits=8, decimal_places=2)
    capital_gain_tax = models.DecimalField(max_digits=8, decimal_places=2)

    gross_amount = models.DecimalField(max_digits=12, decimal_places=2)
    net_amount = models.DecimalField(max_digits=12, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.symbol} ({self.trade_type})"
