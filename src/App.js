import './App.css';
import Home  from './components/Home';
import { BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        GIFT CARDS
      </h3>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
