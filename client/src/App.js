import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  onChange = e => {
    console.log(e);
  }
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h2>Dictionary</h2>
            <input
            type='text'
            onChange={e => this.onChange(e.target.value)}
            />
          </header>
        </div>
      </div>
    );
  }
}

export default App;