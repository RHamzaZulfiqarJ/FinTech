import { useEffect } from "react";

export const useSSE = (onMessage: (data: any) => void) => {
  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:8000/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);
};