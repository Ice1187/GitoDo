import React from 'react';
import { connect } from 'react-redux';

const COLOR = {
  white: '#ffffff',
};
const NODE = {
  space: 74,
  radius: 12,
  head_radius: 15,
};
const LINE = {
  begin_x: 40,
  begin_y: 33,
  space: 40,
  curve: NODE.space / 2,
  opacity: 0.5,
  branchView_y_space: 0,
};

class Node {
  constructor(snap, x, y, radius, color) {
    this.snap = snap;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = this.draw.bind(this);
  }

  draw(solid = false, filter = null) {
    let node = this.snap.circle(this.x, this.y, this.radius);
    node.attr({ fill: this.color, filter: filter });

    if (!solid) {
      this.snap
        .circle(this.x, this.y, this.radius * 0.7)
        .attr({ fill: COLOR.white });
    }

    return this;
  }
}

class Line {
  constructor(snap, x1, y1, x2, y2, color) {
    this.snap = snap;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.nodes = [];

    this._drawLine = this._drawLine.bind(this);
    this.draw = this.draw.bind(this);
    this.drawCurve = this.drawCurve.bind(this);
    this.pushNode = this.pushNode.bind(this);
  }

  draw(is_main = false) {
    if (is_main) {
      let head_node = new Node(
        this.snap,
        this.x1,
        this.y1,
        NODE.head_radius,
        this.color
      ).draw(true);

      this._drawLine(this.x1, this.y1, this.y2);
      let main_line = this;

      return { head_node, main_line };
    } else {
      let curve = this.drawCurve(this.x1, this.y1 + NODE.radius / 2);
      let subline = this._drawLine(
        //this.x1 + LINE.space,
        this.x2,
        //this.y1 + NODE.space / 2 + NODE.radius / 2,
        this.y1 + NODE.radius / 2 - 2,
        this.y2
      );
      return { curve, subline };
    }
  }

  _drawLine(x, y1, y2) {
    let line = this.snap
      .line(x, y1, x, y2)
      .attr({ stroke: this.color, strokeWidth: 5, opacity: LINE.opacity });

    return line;
  }

  drawCurve(x, y) {
    let curve = this.snap
      //      .path(
      //`m ${x} ${y} S ${x + LINE.space} ${y} ${x + LINE.space} ${
      //  y + NODE.space / 2
      //}`
      //`m ${x} ${y} S ${x + LINE.space} ${y} ${this.x2} ${y + NODE.space / 2}`
      //      )
      .line(x, y, this.x2, y)
      .attr({
        stroke: this.color,
        strokeWidth: 5,
        opacity: LINE.opacity,
        fill: 'none',
        filter: 'none',
      });

    return curve;
  }

  pushNode(node) {
    this.nodes.push(node);
  }
}

class Drawer {
  constructor(svg, bottom) {
    this.snap = Snap(svg);
    this.bottom = bottom;

    // Constants
    this.radius = 10;

    this.snap.clear();

    this.draw_line = this.drawLine.bind(this);
    this.draw_node = this.drawNode.bind(this);
  }

  drawLine(x, y, color, isMain = false) {
    let line = new Line(this.snap, LINE.begin_x, y, x, this.bottom, color);
    if (isMain) {
      line = new Line(this.snap, 0, y, x, this.bottom, color);
    }
    line.draw();
  }

  drawNode(x, y, color, isDone) {
    let node = new Node(this.snap, x, y, 10, color);
    node.draw(isDone);
  }
}
class BranchSvg extends React.Component {
  constructor(props) {
    super(props);

    this.svg = React.createRef();
  }

  componentDidMount() {
    const Snap = require('snapsvg-cjs');
    this.svgRender();
  }
  componentDidUpdate() {
    this.svgRender();
  }

  svgRender() {
    function toColorCode(arr) {
      let colorCode =
        '#' +
        arr.map((c) => ('0' + (c & 0xff).toString(16)).slice(-2)).join('');
      //      console.log(colorCode);
      return colorCode;
    }

    let BOTTOM = this.svg.current.getBoundingClientRect().bottom;

    let x = LINE.begin_x,
      y = LINE.begin_y;
    let is_main = true;
    let tasks = this.props.tasks;
    let lines = {};

    let drawer = new Drawer(this.svg.current, BOTTOM);
    for (let task of tasks) {
      // Skip head node
      if (
        task._id == '0' ||
        task.line.color_RGB == null ||
        task.task.achieved_at == null
      )
        continue;

      // Draw line if haven't
      let color = toColorCode(task.line.color_RGB);
      let line_id = task.line._id;
      let line = lines[line_id];
      if (line == null) {
        // TODO: change is_main type to bool
        is_main = task.line.is_main === 'true';
        drawer.drawLine(x, y - NODE.radius / 2, color, is_main);
        line = lines[line_id] = {
          x: x,
          color: color,
        };
        if (is_main) {
          y = y + NODE.space;
          is_main = false;
        }
        x = x + LINE.space;
        // Branch view don't draw nodes
        if (this.props.isBranchView) {
          y = y + NODE.space;
        }
      }
      // Branch view don't draw nodes
      if (this.props.isBranchView) {
        continue;
      }

      // Draw node
      drawer.drawNode(line.x, y, color, task.task.achieved);
      y = y + NODE.space;
    }
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

const mapStateToProps = (state) => ({
  tasks: state.branch.task,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BranchSvg);
