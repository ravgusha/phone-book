import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from '../components/Header';
import store from '../redux/configureStore';
import routes from './routes';

import './style.css';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        {routes.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} element={<Component />} /> // warning
        ))}
      </Routes>
    </Provider>
  );
}

export default App;
