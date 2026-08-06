from celery import Celery

celery = Celery(
    "scanner",
    broker="redis://localhost:6379/0"
)