import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Categories from './components/Categories/Categories';

class App extends Component {
  // Initialize state
  state = {
    entries: [
      {
        title: 'Category article',
        subOptions: [],
      },
    ],
  };

  render() {
    return (
      <div className="App">
        <label id="header">Categories Tree</label>
        {/* Render the Categories component */}
        <Categories
          entries={this.state.entries}
          trigger={() => {
            this.setState({
              entries: this.state.entries,
            });
          }}
          editTrigger={() => {
            this.setState({ entries: this.state.entries });
          }}
        />
      </div>
    );
  }
}

export default App;
