import React, { createContext, useContext } from "react";
import { useRouter } from 'next/router'

const QueueContext = createContext({});

export function QueueProvider({ children }) {
  const router = useRouter()

  if (router.query['redirect-token']) {

    const setRedirectTokenInCookie = async () => {
      const res = await fetch('/api/set-queue-cookie', {
        headers: {
          'redirect-token': router.query['redirect-token']
        }
      });

      if (res.redirected) {
        window.location.href = res.url;
      }
    }

    setRedirectTokenInCookie();
  }

  return <QueueContext.Provider value={{}}>{children}</QueueContext.Provider>;
}

export default function useQueue() {
  return useContext(QueueContext);
}
