import os
import sentry_sdk

# Initialize Sentry only when DSN is available
SENTRY_DSN = os.getenv("SENTRY_DSN")

if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        traces_sample_rate=1.0,
        environment=os.getenv("ENVIRONMENT", "production"),
    )

from fastapi import FastAPI, APIRouter
from prometheus_fastapi_instrumentator import Instrumentator
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from app.core.cors import setup_cors
from app.core.database import Base, engine
from app.core.limiter import limiter
# Initialize Sentry
sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    traces_sample_rate=1.0,
)
# Models
from app.models.user import User
from app.models.scan_result import Scan
from app.models.password_reset import PasswordReset
from app.models.audit_log import AuditLog
from app.models.email_verification import EmailVerification
from app.models.team import Team
from app.models.subscription import Subscription
from app.models.notification import Notification
from app.models.audit_event import AuditEvent
from app.models.integration import Integration
from app.models.organization import Organization
from app.models.team_invitation import TeamInvitation
# Step 300-400 Models
from app.models.activity_log import ActivityLog
from app.models.team import Team
from app.models.role import Role
from app.models.permission import Permission
from app.models.subscription import Subscription
from app.models.api_key import APIKey
from app.models.notification import Notification
from app.models.webhook import Webhook
from app.models.audit_event import AuditEvent
from app.models.integration import Integration
# Routers
from app.routes.admin import router as admin_router
from app.routes.analytics import router as analytics_router
from app.routes.audit_logs import router as audit_logs_router
from app.routes.team import router as team_router
from app.routes.billing import router as billing_router
from app.routes.activity import router as activity_router
from app.routes.integrations import router as integrations_router
from app.routes.api_keys import router as api_keys_router
from app.routes.webhooks import router as webhooks_router
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.email_verification import (
    router as email_verification_router,
)
from app.routes.history import router as history_router
from app.routes.jobs import router as jobs_router
from app.routes.notifications import (
    router as notifications_router
)
from app.routes.profile import router as profile_router
from app.routes.report import router as report_router
from app.routes.upload import router as upload_router
from app.routes.websocket import router as websocket_router
from app.routes.team import router as team_router
from app.routes.organizations import (
    router as organizations_router,
)
# Step 300-400 Routes
from app.routes.roles import router as roles_router
from app.routes.billing import router as billing_router
from app.routes.activity import router as activity_router
from app.routes.integrations import (
    router as integrations_router
)
from app.routes.api_keys import (
    router as api_keys_router
)
from app.routes.webhooks import (
    router as webhooks_router
)
# Create FastAPI App
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
# Database Tables
# =======================================

Base.metadata.create_all(
    bind=engine
)



# =======================================
# CORS
# =======================================

setup_cors(app)



# =======================================
# API Routes
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


# Step 300-400

api_v1.include_router(team_router)

api_v1.include_router(
    roles_router
)

api_v1.include_router(
    billing_router
)

api_v1.include_router(
    activity_router
)

api_v1.include_router(
    integrations_router
)

api_v1.include_router(
    api_keys_router
)

api_v1.include_router(
    webhooks_router
)

app.include_router(api_v1)
api_v1.include_router(
    organizations_router
)


# =======================================
# Root
# =======================================

@app.get("/")
def root():

    return {
        "message": "AI Security Firewall Backend Running 🚀",
        "version": "1.0.0",
        "api": "/api/v1"
    }



# =======================================
# Health
# =======================================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }