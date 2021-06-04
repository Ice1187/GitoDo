import React from 'react';

class BranchCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    let HEIGHT = this.canvas.current.height;
    let WIDTH = this.canvas.current.width;
    /*
    let REAL_HEIGHT = this.canvas.current.offsetWidth;
    let REAL_WIDTH = this.canvas.current.offsetHeight;

    console.log(this.canvas.current.height, this.canvas.current.width);
    console.log(
      this.canvas.current.offsetHeight,
      this.canvas.current.offsetWidth
    );
    */

    const ctx = this.canvas.current.getContext('2d');
    // ctx.scale(1, 0.25);

    let NODE_SIZE = 18;
    let NODE_RADIUS = NODE_SIZE / 2 + 4;

    // Color
    let black = '#646464';
    let red = '#f44336';
    let yellow = '#ffc107';

    // Dummy head node
    //ctx.fillStyle = black;
    //ctx.fillRect(45, 0, 30, 30);
    this.drawCircle(60, 15, 15, black, true);

    // Main line
    let linePlace = (w, head_x, head_w) => {
      let headMid = (head_x + (head_x + head_w)) / 2;
      return headMid - w / 2;
    };
    let circlePlace = (head_x, head_w) => (head_x + (head_x + head_w)) / 2;
    ctx.fillStyle = black;
    ctx.fillRect(linePlace(5, 45, 30), 30, 5, HEIGHT - 5);

    // Nodes
    //ctx.fillStyle = red;
    //ctx.fillRect(linePlace(NODE_SIZE, 45, 30), 98, NODE_SIZE, NODE_SIZE);
    for (let i = 0; i < 8; i++) {
      this.drawCircle(
        circlePlace(45, 30),
        107 + 74 * i,
        NODE_RADIUS,
        i % 2 ? yellow : red
      );
    }
  }

  drawCircle(x, y, radius, color, solid = false) {
    let ctx = this.canvas.current.getContext('2d');

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (!solid) {
      ctx.fillStyle = '#f3f4f6';
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        height='720'
        width='362'
        className='top-24 left-0 h-5/6 absolute w-1/5'
      />
    );
  }
}

export default BranchCanvas;
