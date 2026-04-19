"""Run inside alburhan-cms-api container: python /tmp/cms_create_admin.py"""
from app.database import SessionLocal
from app.models.user import User
from app.utils.auth import get_password_hash

USERNAME = "admin"
PASSWORD = "123456"
EMAIL = "admin@alburhan-regional.com"

db = SessionLocal()
try:
    u = db.query(User).filter(User.username == USERNAME).first()
    if u:
        u.password_hash = get_password_hash(PASSWORD)
        u.role = "admin"
        u.is_active = True
        print(f"Updated user {USERNAME!r}: password set, role=admin")
    else:
        u = User(
            username=USERNAME,
            email=EMAIL,
            password_hash=get_password_hash(PASSWORD),
            full_name="Administrator",
            role="admin",
            is_active=True,
        )
        db.add(u)
        print(f"Created user {USERNAME!r} with role=admin")
    db.commit()
    print("OK")
finally:
    db.close()
