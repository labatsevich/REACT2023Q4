import { Component, ReactNode } from 'react';
import './App.css';
import { Searchbar } from './components/Searchbar/Searchbar';

class App extends Component {
  constructor(props: {}) {
    super(props);
  }

  render(): ReactNode {
    return <Searchbar />;
  }
}

export default App;
