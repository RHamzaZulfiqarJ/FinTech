import asyncio

class EventManager:
    def __init__(self):
        self.listeners = []

    async def subscribe(self):
        queue = asyncio.Queue()
        self.listeners.append(queue)
        return queue

    def unsubscribe(self, queue):
        self.listeners.remove(queue)

    async def broadcast(self, message):
        for queue in self.listeners:
            await queue.put(message)


event_manager = EventManager()