import React, {Component} from 'react';

var lrcArr = [];
class Lrc extends Component {
  componentDidMount () {
    fetch (this.props.lrc).then (function(res) {
    if (res.ok) {
      res.text().then(function(obj) {
        lrcArr = obj.split('\n');
      });
    }}, function(ex) {
        console.log(ex)
    });
  }

  componentWillReceiveProps (nextProps) {
    let time = parseInt(nextProps.time);
    const len = lrcArr.length;
    for (let i = 0; i < len; i++) {
      if (/(\d{2}.){3}/.test(lrcArr[i])) {
        let lrcTime = lrcArr[i].slice(1, 8);
        let tmp = lrcTime.split(':');
        let numTime = tmp[0] * 60 + parseInt(tmp[1]);

        if(numTime < time) {
          this.setState({
            lrc : lrcArr[i].slice(10),
          })
        }
      }
    }
  }

  render () {
    return (
      <div>
        {this.state ? this.state.lrc : 'lyric'}
      </div>
    );
  }
}

export default Lrc;
