from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.event_manager import event_manager
import json

router = APIRouter()

async def event_generator():
    queue = await event_manager.subscribe()
    try:
        while True:
            message = await queue.get()
            yield f"data: {json.dumps(message)}\n\n"
    finally:
        event_manager.unsubscribe(queue)


@router.get("/stream")
async def stream():
    return StreamingResponse(event_generator(), media_type="text/event-stream")