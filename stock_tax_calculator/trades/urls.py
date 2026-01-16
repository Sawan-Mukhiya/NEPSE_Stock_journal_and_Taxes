from django.urls import path
from .views import calculator_view, evaluation_view, dashboard_view

urlpatterns = [
    path("", calculator_view),
    path("evaluation/", evaluation_view),
    path("dashboard/", dashboard_view),
]
