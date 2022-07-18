import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import AddContact from './containers/AddContact';
import Contacts from './containers/Contacts';
import EditContact from './containers/EditContact';
import store from './redux/configureStore';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Contacts />}></Route>
        <Route path="/add" element={<AddContact />}></Route>
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Provider>
  );
}

export default App;
