import './App.css';
import {Route, Routes } from "react-router-dom";
import AddContact from './containers/AddContact';
import Contacts from './containers/Contacts';
import EditContact from './containers/EditContact';
import { ContactContext } from './content';
import { useState } from 'react';
import { IPerson } from './types.ts';

function App() {
  type contactOptions = IPerson[] | [];
  const [contacts, setContacts] = useState<contactOptions>([]);
  
  return (
    <ContactContext.Provider
    value={{
      contacts,
      setContacts
    }}
  >
      <Routes>
        <Route path="/" element={<Contacts />}></Route>
        <Route path="/add" element={<AddContact />}></Route>
        <Route path='/edit/:id' element={<EditContact/>} />
      </Routes>
      </ContactContext.Provider>
  );
}

export default App;
