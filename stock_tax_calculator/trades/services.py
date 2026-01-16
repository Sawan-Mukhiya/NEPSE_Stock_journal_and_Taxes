from decimal import Decimal

BROKER_RATE = Decimal("0.0036")
SEBON_RATE = Decimal("0.00015")
DP_CHARGE = Decimal("25")
CGT_RATE = Decimal("0.075")

def calculate_trade(trade_type, quantity, price, buy_price=None):
    qty = Decimal(quantity)
    price = Decimal(price)

    gross = qty * price
    broker = gross * BROKER_RATE
    sebon = gross * SEBON_RATE
    dp = DP_CHARGE

    cgt = Decimal("0")
    if trade_type == "SELL" and buy_price:
        profit = (price - Decimal(buy_price)) * qty
        if profit > 0:
            cgt = profit * CGT_RATE

    net = gross - (broker + sebon + dp + cgt)

    return {
        "gross": gross,
        "broker": broker,
        "sebon": sebon,
        "dp": dp,
        "cgt": cgt,
        "net": net
    }
