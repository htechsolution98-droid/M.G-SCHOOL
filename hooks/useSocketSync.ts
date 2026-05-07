import { useEffect } from 'react';
import { initSocket } from '@/lib/socket';

export const useSocketSync = (onUpdate: () => void) => {
  useEffect(() => {
    const socket = initSocket();
    if (!socket) return;
    
    const handleUpdate = (data: any) => {
      onUpdate();
    };

    socket.on('contentUpdated', handleUpdate);

    return () => {
      socket.off('contentUpdated', handleUpdate);
    };
  }, [onUpdate]);
};
