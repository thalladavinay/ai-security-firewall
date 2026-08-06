import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(tags=["WebSocket"])


@router.websocket("/ws/{job_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    job_id: int,
):
    await websocket.accept()

    try:
        while True:
            await websocket.send_json(
                {
                    "job_id": job_id,
                    "status": "Scanning...",
                }
            )

            await asyncio.sleep(2)

    except WebSocketDisconnect:
        print(f"WebSocket disconnected: {job_id}")