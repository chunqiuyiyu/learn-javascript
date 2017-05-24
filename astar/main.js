class Astar {
  constructor(row = 10, col = 10) {
    this.myMap = [];
    this.row = row;
    this.col = col;

    this.startPoint = this.endPoint = {x: 0, y: 0};

    this.openList = [];
    this.closeList = [];

    this.UNIT = 30;
    this.CELL = 32;

    // up, right, down, left
    this.offset = [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }];

    this.isOver = this.isSetStart = this.isSetEnd = false;
    this.isDrawStart = this.isDrawEnd = false;
    this.status = '';
    this.msg = '';

    this.setupMap();
    this.drawMap();
  }

    setupMap() {
        // generate map
        for (let i = 0; i < this.row; i++) {
          this.myMap[i] = [];
          for (let j = 0; j < this.col; j++) {
            this.myMap[i][j] = '0';
          }
        }
        // set walls
        let tmpRow, tmpCol;
        for (let i = 19; i >= 0; i--) {
          this.setWalls();
        }

        // set up canvas
        const canvas = document.getElementById('canvas');
        canvas.width = this.col * this.CELL + this.CELL - this.UNIT;
        canvas.height = this.row * this.CELL + this.CELL - this.UNIT;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.addEventListener('click', event => {
          if (!this.isSetStart && !this.isSetEnd) {
            return;
          }

          if (this.isDrawStart ) {
            alert('只能设置一个起点！');
            return;
          }

          if (this.isDrawEnd ) {
            alert('只能设置一个终点！');
            return;
          }

          let tempX = Math.floor((event.clientX - canvas.offsetLeft) / this.CELL);
          let tempY = Math.floor((event.clientY - canvas.offsetTop) / this.CELL);

          let type = '0';
          if (this.isSetStart) {
            type = '2';
            this.isDrawStart = true;
            this.startPoint = {x: tempY, y: tempX};
          } 

          if (this.isSetEnd) {
            type = '3';
            this.isDrawEnd = true;
            this.endPoint = {x: tempY, y: tempX};
          } 

          if (this.myMap[tempY][tempX] !== '0') {
          alert('当前位置无效，请重新设置！');
              this.isDrawStart = false; 
              this.isDrawEnd = false;
              return;
          }
          this.clearPoint(type);
          this.myMap[tempY][tempX] = type;
          this.drawMap();
        });
    }

    drawMap() {
        this.myMap.map((str, i) => {
            str.forEach((fill, j) => {
                switch (fill) {
                    case '0':
                        this.ctx.fillStyle = '#f3f3f3';
                        break;
                    case '1':
                        // wall
                        this.ctx.fillStyle = '#000000';
                        break;
                    case '2':
                        // start point
                        this.ctx.fillStyle = '#ff0000';
                        break;
                    case '3':
                        // end point
                        this.ctx.fillStyle = '#0000ff';
                        break;
                    default:
                        break;
                }
                this.ctx.fillRect(
                    j * this.CELL + (this.CELL - this.UNIT),
                    i * this.CELL + (this.CELL - this.UNIT),
                    this.UNIT,
                    this.UNIT
                );
            });
        });
    }
    navigate() {
        if (this.getF(this.startPoint) === 1) {
          this.msg = '无需寻路！';
          return;
        }
        this.currentPoint = this.startPoint;
        do {
            this.closeList.push(this.currentPoint);
            this.checkAround(this.currentPoint);
            if (this.openList.length === 0) {
                this.isOver = true;
                this.status = 'fail';
                this.msg = '无路可走！'
            }
            if (this.isOver) {
                console.log(`navigate ${this.status}!`);
                break;
            }
            let FList = [];
            this.openList.map((item, i) => {
                // find the floor F value
                FList[i] = this.getF(item);
            });
            let index = this.getMinIndex(FList);
            let minList = [];
            let i = 0,
                currentIndex;
            if (index.length > 1) {
                index.map((item, i) => {
                    minList[i] = this.distance(this.openList[item]);
                });
                const tmp = this.getMinIndex(minList);
                i = tmp[0];
            }
            currentIndex = index[i];
            this.currentPoint = this.openList[currentIndex];
            this.openList.splice(currentIndex, 1);
        } while (this.openList)
    }
    checkAround(point) {
        for (let i = 0; i < 4; i++) {
            const tmp = this.calc(point, i);
            // the checked point beyond boundary || attach wall || already in open/close List
            if (!this.myMap[tmp.x] || !this.myMap[tmp.x][tmp.y] || this.myMap[tmp.x][tmp.y] === '1' || this.isInList(tmp, this.closeList) || this.isInList(tmp, this.openList)) {
                continue;
            }
            // find the endpoint
            if (tmp.x === this.endPoint.x && tmp.y === this.endPoint.y) {
                this.isOver = true;
                this.status = 'success';
                this.msg = '寻路成功！';
                const pathArr = [];
                let tmp = this.closeList[this.closeList.length - 1];
                while (tmp.parent) {
                    pathArr.push(tmp);
                    tmp = tmp.parent;
                }
                pathArr.reverse();
                pathArr.map((item, i) => {
                    let timer = null;
                    timer = setTimeout(() => {
                        this.drawPath(item);
                        clearTimeout(timer);
                    }, i * 100);
                });
                break;
            }
            tmp.parent = point;
            this.openList.push(tmp);
        }
    }
    getF(point) {
            const G = Math.abs(this.startPoint.x - point.x) + Math.abs(this.startPoint.y - point.y);
            const H = Math.abs(this.endPoint.x - point.x) + Math.abs(this.endPoint.y - point.y);
            return G + H;
        }
        // get the distance of current point and checked point
    distance(point) {
            return Math.abs(this.currentPoint.x - point.x) + Math.abs(this.currentPoint.y - point.y);
        }
        // return index array or an index
    getMinIndex(arr) {
            let valueList = [];
            const min = Math.min(...arr);
            arr.map((item, i) => {
                if (item === min) {
                    valueList.push(i);
                }
            });
            return valueList;
        }
        // add the offset value for current point
    calc(point, i) {
        if (this.offset[i]) {
            return {
                x: point.x + this.offset[i].x,
                y: point.y + this.offset[i].y,
            }
        }
    }
    drawPath(point) {
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(
            point.y * this.CELL + (this.CELL - this.UNIT),
            point.x * this.CELL + (this.CELL - this.UNIT),
            this.UNIT,
            this.UNIT);
    }
    isInList(point, list) {
        let tmp;
        list.map((item) => {
            if (item.x === point.x && item.y === point.y) {
                tmp = true;
            }
        });
        return tmp;
    }

    clearPoint(type) {
      for (let i = this.row - 1 ; i >= 0; i--) {
        for (let j = this.col - 1; j >= 0; j--) {
          if (this.myMap[i][j] === type) {
            this.myMap[i][j] = '0';
          }
        }
      }
    }
    setStart() {
      this.isSetStart = true;
      this.isDrawStart = this.isDrawEnd = this.isSetEnd = false;
    }

    setEnd() {
      this.isSetEnd = true;
      this.isDrawEnd = this.isDrawStart = this.isSetStart = false;
    }

    setWalls() {
      const row = Math.floor(Math.random() * this.row);
      const col = Math.floor(Math.random() * this.col);

      if (this.myMap[row][col] === '1') {
        this.setWalls();
      } else {
        this.myMap[row][col] = '1';
      }
    }
}

var app = new Astar();
// event handle
document.getElementById('setStart').onclick = () => {
    app.setStart();
}

document.getElementById('setEnd').onclick = () => {
    app.setEnd();
}

document.getElementById('navigate').onclick = () => {
    if (app.startPoint.x === app.endPoint.x && app.startPoint.y === app.endPoint.y) {
      alert('请先设置起始点！');
      return;
    }
    app.navigate();
    document.getElementById('msg').innerText = app.msg;
}
