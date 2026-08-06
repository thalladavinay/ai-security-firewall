import os

import sentry_sdk
from fastapi import FastAPI, APIRouter
from prometheus_fastapi_instrumentator import Instrumentator

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.core.cors import setup_cors
from app.core.database import Base, engine
from app.core.limiter import limiter


# =======================================
# Initialize Sentry
# =======================================
sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    traces_sample_rate=1.0,
)


# =======================================
# Models
# =======================================
from app.models.user import User
from app.models.scan_result import Scan
from app.models.password_reset import PasswordReset
from app.models.audit_log import AuditLog
from app.models.email_verification import EmailVerification


# =======================================
# Routers
# =======================================
from app.routes.admin import router as admin_router
from app.routes.analytics import router as analytics_router
from app.routes.audit_logs import router as audit_logs_router
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.email_verification import (
    router as email_verification_router,
)
from app.routes.history import router as history_router
from app.routes.jobs import router as jobs_router
from app.routes.notifications import router as notifications_router
from app.routes.profile import router as profile_router
from app.routes.report import router as report_router
from app.routes.upload import router as upload_router
from app.routes.websocket import router as websocket_router


# =======================================
# Create FastAPI App
# =======================================
app = FastAPI(
    title="AI Security Firewall API",
    version="1.0.0",
)


# =======================================
# API Versioning
# =======================================
api_v1 = APIRouter(
    prefix="/api/v1"
)


# =======================================
# Prometheus Metrics
# =======================================
Instrumentator().instrument(app).expose(app)


# =======================================
# Security Headers
# =======================================
@app.middleware("http")
async def security_headers(request, call_next):
    response = await call_next(request)

    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = (
        "strict-origin-when-cross-origin"
    )

    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=()"
    )

    response.headers["X-XSS-Protection"] = (
        "1; mode=block"
    )

    return response


# =======================================
# Rate Limiter
# =======================================
app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)

app.add_middleware(
    SlowAPIMiddleware
)


# =======================================
# Create Database Tables
# =======================================
Base.metadata.create_all(
    bind=engine
)


# =======================================
# Configure CORS
# =======================================
setup_cors(app)


# =======================================
# Register API v1 Routes
# =======================================

api_v1.include_router(auth_router)
api_v1.include_router(upload_router)
api_v1.include_router(dashboard_router)
api_v1.include_router(history_router)
api_v1.include_router(report_router)
api_v1.include_router(analytics_router)
api_v1.include_router(admin_router)
api_v1.include_router(audit_logs_router)
api_v1.include_router(profile_router)
api_v1.include_router(email_verification_router)
api_v1.include_router(notifications_router)
api_v1.include_router(jobs_router)
api_v1.include_router(websocket_router)


# Add versioned routes to application
app.include_router(api_v1)



# =======================================
# Root Endpoint
# =======================================
@app.get("/")
def root():
    return {
        "message": "AI Security Firewall Backend Running 🚀",
        "version": "1.0.0",
        "api": "/api/v1"
    }


# =======================================
# Health Check
# =======================================
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }