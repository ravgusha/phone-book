import { Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Notification from '../containers/Notification';
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
      <Notification />
    </Provider>
  );
}

export default App;
