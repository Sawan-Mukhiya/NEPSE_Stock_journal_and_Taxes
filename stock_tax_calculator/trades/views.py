from django.shortcuts import render, redirect
from .models import Trade
from .services import calculate_trade

def calculator_view(request):
    result = None

    if request.method == "POST":
        result = calculate_trade(
            request.POST["trade_type"],
            request.POST["quantity"],
            request.POST["price"],
            request.POST.get("buy_price")
        )

        Trade.objects.create(
            symbol=request.POST["symbol"],
            trade_type=request.POST["trade_type"],
            quantity=request.POST["quantity"],
            price=request.POST["price"],
            buy_price=request.POST.get("buy_price") or None,
            broker_commission=result["broker"],
            sebon_fee=result["sebon"],
            dp_charge=result["dp"],
            capital_gain_tax=result["cgt"],
            gross_amount=result["gross"],
            net_amount=result["net"],
        )

    return render(request, "trades/calculator.html", {"result": result})

def evaluation_view(request):
    trades = Trade.objects.all().order_by("-created_at")
    return render(request, "trades/evaluation.html", {"trades": trades})

def dashboard_view(request):
    trades = Trade.objects.all()
    return render(request, "trades/dashboard.html", {"trades": trades})
