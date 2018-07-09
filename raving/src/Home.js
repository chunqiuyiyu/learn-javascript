import React, { Component } from 'react';
import './Home.css';
import Corner from './Corner';

class Home extends Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push('./main');
  }

  render() {
    return (
      <div className="wrap-container">
        <div className="app">
          <div className="title" onClick={this.handleClick}>
            <div className="container">
              <p className="season">虚</p>
              <p className="solar-term">
                立春 雨水 惊蛰 春分 清明 谷雨
              </p>
            </div>
            <div className="container">
              <p className="solar-term">
                立夏 小满 芒种 夏至 小暑 大暑
              </p>
              <p className="season">妄</p>
            </div>
            <div className="container">
              <p className="season">呓</p>
              <p className="solar-term">
                立秋 处暑 白露 秋分 寒露 霜降
              </p>
            </div>
            <div className="container">
              <p className="solar-term">
                立冬 小雪 大雪 冬至 小寒 大寒
              </p>
              <p className="season">语</p>
            </div>
          </div>
        </div>
        <Corner prev={{ text: '博客', link: '' }}
          next={{ text: '呓语', link: './main' }} />
      </div>
    );
  }
}

export default Home;