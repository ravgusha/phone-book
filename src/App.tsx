import './App.css';
import {Route, Routes } from "react-router-dom";
import AddContact from './containers/AddContact';
import Contacts from './containers/Contacts';
import EditContact from './containers/EditContact';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Contacts />}></Route>
        <Route path="/add" element={<AddContact />}></Route>
        <Route path='/edit/:id' element={<EditContact/>} />
      </Routes>
  );
}

export default App;
