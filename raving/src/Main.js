import React, { Component } from 'react';
import './Main.css';
import Corner from './Corner';
import utils from './utils';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [''],
      index: 0
    };

    utils.getList(data => {
      this.setState({ data, index: parseInt(data.length * Math.random()) });
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const length = this.state.data.length;
    let index = parseInt(length * Math.random());
    if (index === this.state.index) {
      index ++;
      if (index === length) {
        index = 0;
      }
    }
    this.setState({ index });
  }

  render() {
    return (
      <div className="app">
        <div className="main-container" onClick={this.handleClick}>
          {
            this.state.data[this.state.index].split(' ').map(item =>(
              <p key={utils.guid()}><span>{item}</span></p>
            ))
          }
        </div>

        <Corner prev={{ text: '主页', link: '/' }}
            next={{ text: '关于', link: './about' }} />
      </div>
    );
  }
}

export default Main;