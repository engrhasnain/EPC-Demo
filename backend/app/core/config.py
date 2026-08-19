import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    deepseek_api_key: str = os.getenv("DEEPSEEK_API_KEY", "")
    deepseek_base_url: str = "https://api.deepseek.com"
    ai_model: str = "deepseek-chat"
    cors_origins: list[str] = os.getenv("CORS_ORIGINS", "http://localhost:3008").split(",")
    app_name: str = "AI EPC Operations Intelligence"


settings = Settings()
