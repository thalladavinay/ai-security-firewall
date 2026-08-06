from fastapi import FastAPI

from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from app.core.limiter import limiter
from app.core.cors import setup_cors
from app.core.database import Base, engine


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
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.history import router as history_router
from app.routes.report import router as report_router
from app.routes.upload import router as upload_router
from app.routes.analytics import router as analytics_router
from app.routes.admin import router as admin_router
from app.routes.audit_logs import router as audit_logs_router
from app.routes.profile import router as profile_router
from app.routes.notifications import router as notifications_router
from app.routes.jobs import router as jobs_router
from app.routes.websocket import router as websocket_router

from app.routes.email_verification import router as email_verification_router
# from app.routes.forgot_password import router as forgot_password_router

app = FastAPI(
    title="AI Security Firewall API",
    version="1.0.0",
)

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
app.include_router(analytics_router)
app.include_router(admin_router)
app.include_router(audit_logs_router)
app.include_router(profile_router)
app.include_router(email_verification_router)
app.include_router(notifications_router)
app.include_router(jobs_router)
app.include_router(websocket_router)
# app.include_router(forgot_password_router)

# =======================================
# Root Endpoint
# =======================================
@app.get("/")
def root():
    return {
        "message": "AI Security Firewall Backend Running 🚀"
    }


# =======================================
# Health Check
# =======================================
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }