import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Home />
    </AppProvider>
  );
}

export default App;
