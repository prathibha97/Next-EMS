import { useIdle } from '@uidotdev/usehooks';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useIdleSignOut() {
  const { data: session } = useSession();
  const idle = useIdle(7200000);

  useEffect(() => {
    if (idle && session) {
      signOut();
    }
  }, [idle, session]);
}
