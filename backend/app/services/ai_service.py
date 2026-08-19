from collections.abc import AsyncGenerator

from openai import AsyncOpenAI

from app.core.config import settings

_client = AsyncOpenAI(
    api_key=settings.deepseek_api_key,
    base_url=settings.deepseek_base_url,
    timeout=20.0,
    max_retries=1,
)


async def stream_insight(system_prompt: str, user_prompt: str) -> AsyncGenerator[str, None]:
    try:
        stream = await _client.chat.completions.create(
            model=settings.ai_model,
            max_tokens=700,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            stream=True,
        )
        async for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta
    except Exception:
        yield "[IA no disponible: verificá la clave y el saldo de la API configurada en el backend.]"
