import { createContext } from 'react';
import { IPerson } from './types.ts';

interface IContactContext {
  contacts: Array<IPerson> | [];
  setContacts: (movies: Array<IPerson>) => void;
  currentContact: number | null;
  setCurrentContact: (id: number) => void;
}

export const ContactContext = createContext<IContactContext>({
  contacts: [],
  setContacts: () => {},
  currentContact: null,
  setCurrentContact: () => {},
});
