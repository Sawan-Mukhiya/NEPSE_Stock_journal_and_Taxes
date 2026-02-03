# NEPSE Stock Journal & Tax Calculator

NEPSE Stock Journal & Tax Calculator is a Django REST Framework (DRF) powered backend API designed to help investors on the Nepal Stock Exchange (NEPSE) track trades, calculate true costs, and analyze profit/loss ratios with all applicable fees and taxes included.

##  Features
- **Trade Journal API**: Record buy/sell decisions with details like symbol, quantity, price, broker commission, SEBON fee, DP charge, and capital gain tax.
- **Cost Calculation**: Computes gross and net amounts automatically, factoring in all charges.
- **Profit/Loss Analysis**: Provides P/L ratio and tax-adjusted calculations for trades.
- **CORS Enabled**: Ready to connect with a React frontend (`http://localhost:3000`).
