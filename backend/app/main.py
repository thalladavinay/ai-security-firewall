import os

import sentry_sdk
from fastapi import FastAPI

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
# Import Models
# =======================================
from app.models.user import User
from app.models.scan_result import Scan
from app.models.password_reset import PasswordReset
from app.models.audit_log import AuditLog
from app.models.email_verification import EmailVerification

# =======================================
# Import Routers
# =======================================
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.email_verification import (
    router as email_verification_router,
)
from app.routes.history import router as history_router
from app.routes.profile import router as profile_router
from app.routes.report import router as report_router
from app.routes.upload import router as upload_router

# =======================================
# Create FastAPI App
# =======================================
app = FastAPI(
    title="AI Security Firewall API",
    version="1.0.0",
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
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=()"
    )
    response.headers["X-XSS-Protection"] = "1; mode=block"

    return response

# =======================================
# Rate Limiter
# =======================================
app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)

app.add_middleware(SlowAPIMiddleware)

# =======================================
# Create Database Tables
# =======================================
Base.metadata.create_all(bind=engine)

# =======================================
# Configure CORS
# =======================================
setup_cors(app)

# =======================================
# Register Routes
# =======================================
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(history_router)
app.include_router(report_router)
app.include_router(profile_router)
app.include_router(email_verification_router)

# =======================================
# Root Endpoint
# =======================================
@app.get("/")
def root():
    return {
        "message": "AI Security Firewall Backend Running 🚀",
        "version": "1.0.0",
    }

# =======================================
# Health Check
# =======================================
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }