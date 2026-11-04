
import { useState, useEffect } from 'react';

export function useSession() {
  const [sessionId, setSessionId] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('desktop');

  useEffect(() => {
    // Generate session ID if not exists
    let session = sessionStorage.getItem('session_id');
    if (!session) {
      session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', session);
    }
    setSessionId(session);

    // Detect device type
    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent)) {
      setDeviceType('mobile');
    } else if (/iPad|Tablet/i.test(userAgent)) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  return { sessionId, deviceType };
}
