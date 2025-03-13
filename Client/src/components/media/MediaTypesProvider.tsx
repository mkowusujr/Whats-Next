import React, { ReactNode, createContext } from 'react';

type Props = { mediaTypes: string[]; children: ReactNode };

export const MediaTypesContext = createContext<string[]>([]);

export default function MediaTypesProvider({ mediaTypes, children }: Props) {
  return (
    <MediaTypesContext.Provider value={mediaTypes}>
      {children}
    </MediaTypesContext.Provider>
  );
}
