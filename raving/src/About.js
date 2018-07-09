import React, { Component } from 'react';
import './Main.css';
import Corner from './Corner';
import utils from './utils';

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: `
        结结巴巴我的嘴 
        二二二等残废 
        咬不住我狂狂狂奔的思维 
        还有我的腿 

        你们四处流流流淌的口水 
        散着霉味 
        我我我的肺 
        多么劳累 

        我要突突突围 
        你们莫莫莫名其妙 
        的节奏 
        急待突围 

        我我我的 
        我的机枪点点点射般 
        的语言 
        充满快慰 

        结结巴巴我的命 
        我的命里没没没有鬼 
        你们瞧瞧瞧我 
        一脸无所谓
      `
    };
  }

  render() {
    return (
      <div className="app">
        <div className="about-container">
          {
            this.state.data.split('\n').map(item =>(
              <p key={utils.guid()}>{item}</p>
            ))
          }
        </div>

        <Corner prev={{ text: '呓语', link: '/main' }}
            next={{ text: '主页', link: './' }} />
      </div>
    );
  }
}

export default About;