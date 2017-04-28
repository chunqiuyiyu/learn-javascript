import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lrc from './Lrc';
const content = require('../public/content.json');

class App extends Component {
  setTime (e) {
    this.setState({
      time: this.refs.audio.currentTime
    });
  }

  render() {
    const name = content.data[0].lrc_name;
    const music = 'content/songs/' + name + '.mp3';
    const lrc = 'content/songs/' + name + '.lrc';
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Music Colletion</h2>
          <audio controls src={music} onTimeUpdate={this.setTime.bind(this)} ref="audio"></audio>
        </div>
        <Lrc lrc={lrc} time={this.state ? this.state.time : 0}/>
      </div>
    );
  }
}

export default App;
