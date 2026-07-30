from fastapi import FastAPI

from app.core.cors import setup_cors
from app.core.database import Base, engine

# Import models so SQLAlchemy creates their tables
from app.models.user import User
from app.models.scan_result import Scan

# Import routers
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.history import router as history_router
from app.routes.report import router as report_router
from app.routes.upload import router as upload_router

from app.models.password_reset import PasswordReset
from app.routes.forgot_password import router as forgot_password_router

app = FastAPI(
    title="AI Security Firewall API",
    version="1.0.0",
)

# Create all database tables
Base.metadata.create_all(bind=engine)

# Configure CORS
setup_cors(app)

# Register API routes
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(history_router)
app.include_router(report_router)
app.include_router(forgot_password_router)

@app.get("/")
def root():
    return {
        "message": "AI Security Firewall Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }