import React from 'react';

class BranchSvg extends React.Component {
  constructor(props) {
    super(props);

    this.svg = React.createRef();

    // Color
    this.COLOR = {
      black: '#333333',
      red: '#f44336',
      yellow: '#ffc107',
      background: '#e5e7eb',
      white: '#ffffff',
    };
    // Space
    this.NODE = {
      SPACE: 74,
      RADIUS: 12,
      HEAD_RADIUS: 15,
    };
    this.LINE = {
      SPACE: 60,
    };
  }

  componentDidMount() {
    this.svgRender();
  }
  componentDidUpdate() {
    this.svgRender();
  }

  svgRender() {
    let HEIGHT = this.svg.current.getBoundingClientRect().height;
    let WIDTH = this.svg.current.getBoundingClientRect().width;

    let snap = Snap(this.svg.current);
    let filter = snap.filter(Snap.filter.shadow(-3, 2, 0.3));

    let { head_node, main_line } = this.drawMainLine(
      80,
      this.NODE.HEAD_RADIUS,
      HEIGHT,
      filter
    );

    // Draw nodes
    for (let i = 0; i < 8; i++) {
      this.drawNode(
        80,
        107 + this.NODE.SPACE * i,
        this.NODE.RADIUS,
        i % 2 ? this.COLOR.yellow : this.COLOR.red,
        i >= 2 && i <= 5,
        filter
      );
    }

    // Draw subline
    let { curve, subline } = this.drawSubLine(
      80,
      107,
      HEIGHT,
      this.COLOR.red,
      main_line
    );
    let { x, y } = this._getXYFromElement(subline);

    // Draw sub nodes
    for (let i = 0; i < 6; i++) {
      this.drawNode(
        x,
        107 + this.NODE.SPACE * (i + 1),
        this.NODE.RADIUS,
        this.COLOR.red,
        i <= 1 || i == 4,
        filter
      );
    }
  }

  _getXYFromElement(el) {
    let rect = el.node.getBoundingClientRect();
    let x = rect.x;
    let y = rect.y;
    return { x, y };
  }

  drawLine(x, y1, y2, COLOR) {
    let snap = Snap(this.svg.current);

    let line = snap.line(x, y1, x, y2).attr({ stroke: COLOR, strokeWidth: 5 });

    return line;
  }

  drawNode(x, y, radius, COLOR, solid = false, filter) {
    let snap = Snap(this.svg.current);

    let node = snap.circle(x, y, radius);
    node.attr({ fill: COLOR, filter: filter });

    if (!solid) {
      snap.circle(x, y, radius * 0.7).attr({ fill: this.COLOR.white });
    }

    return node;
  }

  drawCurve(x, y, COLOR, parent_line) {
    let snap = Snap(this.svg.current);

    let curve = snap
      .path(
        `M ${x} ${y} S ${x + this.LINE.SPACE} ${y} ${x + this.LINE.SPACE}, ${
          y + this.NODE.SPACE
        }`
      )
      .attr({ stroke: COLOR, strokeWidth: 5, fill: 'none', filter: 'none' });

    parent_line.after(curve);
    return curve;
  }

  drawMainLine(x, radius, height, filter) {
    let head_node = this.drawNode(
      x,
      this.NODE.HEAD_RADIUS,
      radius,
      this.COLOR.black,
      true,
      filter
    );
    let main_line = this.drawLine(x, 25, height, this.COLOR.black);

    return { head_node, main_line };
  }

  drawSubLine(x, y1, y2, COLOR, parent_line) {
    let curve = this.drawCurve(x, y1, COLOR, parent_line);
    let subline = this.drawLine(
      x + this.LINE.SPACE,
      y1 + this.NODE.SPACE,
      y2,
      COLOR
    );

    return { curve, subline };
  }

  render() {
    return (
      <svg
        ref={this.svg}
        className='top-24 left-0 h-5/6 absolute w-1/5'
        xmlns='http://www.w3.org/2000/svg'
      />
    );
  }
}

export default BranchSvg;
