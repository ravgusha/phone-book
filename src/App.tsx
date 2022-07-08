import './App.css';
import Header from './components/Header/Header';
import Table from './components/ContactList/ContactList';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
      <Header />
     <Table></Table>
      </Routes>

    </div>
  );
}

export default App;
