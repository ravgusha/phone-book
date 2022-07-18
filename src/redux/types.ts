import { IPerson } from '../types';

export interface IState {
  contacts: Array<IPerson>;
  currentContact: number | null;
}
