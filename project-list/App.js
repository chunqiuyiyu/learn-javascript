import React, { Component } from 'react';
import './App.css';
import utils from './utils';

class App extends Component {
  constructor () {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    utils.getList(data => {
      this.setState({ data });
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>{'Project List'}</h1>
          <p>{'Some projects of code during the process of study, they witnessed my growth.'}</p>
        </header>
        <table>
          <tbody>
            <tr>
              <th className="name"><h2>{'Name'}</h2></th>
              <th className="desc">{'Description'}</th>
              <th className="tags">{'Tag'}</th>
            </tr>
            {
              this.state.data.map(item => (
                <tr key={utils.guid()}>
                  <td className="name">
                    <a href={item.url}>{item.name}</a>
                  </td>
                  <td className="desc">
                    {item.desc}
                  </td>
                  <td className="tags">{
                    item.tags.map(i => (
                      <span key={utils.guid()}>{i}</span>
                    ))
                  }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <footer>
          <p>
            {'Made by '}
            <a href="http://www.chunqiuyiyu.com">chunqiuyiyu</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
