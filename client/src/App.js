import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elkelmeh: '',
      eltrgmeh: [],
    }
  }

  onChange = e => {
    this.setState({
      elkelmeh: e,
    })
  };

  endari = () => {
    const { elkelmeh } = this.state;
    axios.post('/definition', {
          e: elkelmeh
      })
      .then(({ data }) => {
        let meaning = [];
        let definition = [];
        let bothCat = {}
        data.results[0].lexicalEntries.forEach(element => {
          element.entries.forEach(sens => {
            sens.senses.forEach(def => {
              meaning.push([element.lexicalCategory, def])
            })
          })
        });
        meaning.forEach(mean => {
          if(!bothCat[mean[0]]){
            bothCat[mean[0]] = mean[1]; 
          }
        })
        definition.push(bothCat);
        this.setState({
          eltrgmeh: definition
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    const { eltrgmeh } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h2>Dictionary</h2>
            <input
            type='text'
            onChange={e => this.onChange(e.target.value)}
            />
            <button
              onClick={() => this.endari()}
            >
              button
            </button>
            <div>
              {eltrgmeh.map(ele => {
                return (<div>
                  <h2>category : Noun</h2>
                  <div>
                    <h2>definition</h2>
                  {ele.Noun.definitions[0]}
                  </div>
                      <div>
                        <h2>example</h2>
                        {ele.Noun.examples[0].text}
                      </div>
                    <div>
                      <h2>category : Verb</h2>
                  <div>
                    <h2>definition</h2>
                  {ele.Verb.definitions[0]}
                  </div>
                  <div>
                    <h2>example</h2>
                    {ele.Verb.examples[0].text}
                  </div>
                  </div>
                  </div>
                  )
              })}
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default App;