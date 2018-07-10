import base from './base';
import attachRotate from './rotate';
import boom from '/animate'

const { drawBG, setStars, drawTitle, canvas } = base;

drawBG();
const nodes = setStars([], 0);
drawTitle();

const startGame = () => {
  boom(nodes);
  canvas.removeEventListener('click', startGame);
  attachRotate(nodes);
};

canvas.addEventListener('click', startGame);
