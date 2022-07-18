import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddContact from './containers/AddContact';
import Contacts from './containers/Contacts';
import EditContact from './containers/EditContact';
import { Provider } from 'react-redux';
import store from './redux/configureStore';

function App() {
  type contactOptions = IPerson[] | [];
  type currentContactOptions = number | null;

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
