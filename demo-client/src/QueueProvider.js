import React, { createContext, useContext } from "react";
import { useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const QueueContext = createContext({});

export function QueueProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Set Cookie
  if (searchParams.get('queue-token')) {
    cookies.set('queue-token', searchParams.get('queue-token'));
  }

  return <QueueContext.Provider value={{}}>{children}</QueueContext.Provider>;
}

export default function useQueue() {
  return useContext(QueueContext);
}
