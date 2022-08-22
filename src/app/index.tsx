import { Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Header from '../components/Header';
import store from '../redux/configureStore';
import routes from './routes';

import './style.css';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        {routes.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Routes>
      <ToastContainer autoClose={2000} />
    </Provider>
  );
}

export default App;
