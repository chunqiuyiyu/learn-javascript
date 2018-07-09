import React from 'react';
import { Link } from 'react-router-dom';
import './Corner.css';

const Corner = ({ prev, next }) => (
  <nav>
    <span>
    {
      prev.link ? <Link to={prev.link}>{prev.text}</Link> :
      <a href="//www.chunqiuyiyu.com">{prev.text}</a>
    }
    </span>
    <span><Link to={next.link}>{next.text}</Link></span>
  </nav>
);

export default Corner;