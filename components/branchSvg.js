import React from 'react';

const COLOR = {
  black: '#333333',
  red: '#f44336',
  yellow: '#ffc107',
  background: '#e5e7eb',
  white: '#ffffff',
};
const NODE = {
  space: 74,
  radius: 12,
  head_radius: 15,
};
const LINE = {
  space: 60,
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
  constructor(snap, x1, y1, x2, y2, color, is_main = false) {
    this.snap = snap;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.nodes = [];
    this.is_main = is_main;

    this._drawLine = this._drawLine.bind(this);
    this.draw = this.draw.bind(this);
    this.drawCurve = this.drawCurve.bind(this);
    this.pushNode = this.pushNode.bind(this);
  }

  draw() {
    if (this.is_main) {
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
        this.x1 + LINE.space,
        this.y1 + NODE.space + NODE.radius / 2,
        this.y2
      );
      return { curve, subline };
    }
  }

  _drawLine(x, y1, y2) {
    let line = this.snap
      .line(x, y1, x, y2)
      .attr({ stroke: this.color, strokeWidth: 5 });

    return line;
  }

  drawCurve(x, y) {
    let curve = this.snap
      .path(
        `m ${x} ${y} S ${x + LINE.space} ${y} ${x + LINE.space} ${
          y + NODE.space
        }`
      )
      .attr({
        stroke: this.color,
        strokeWidth: 5,
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
  constructor(svg, buttom) {
    this.snap = Snap(svg);
    this.buttom = buttom;

    this.x = 0;
    this.y = 0;

    this.draw = this.draw.bind(this);
    this.getLineByLineId = this.getLineObjByLineId.bind(this);
    this.getColorByLineId = this.getColorByLineId.bind(this);
  }

  draw(lineObj) {
    let { color, is_main } = lineObj;
    // Draw Line
    if (is_main) {
      this.x = this.x + 80;
      this.y = this.y + 33;
      color = COLOR.black;
    }

    let line = new Line(
      this.snap,
      this.x,
      this.y,
      this.x,
      this.buttom,
      color,
      is_main
    );
    line.draw();

    // Draw Nodes
    if (!is_main) {
      this.x = this.x + LINE.space;
    }

    let items = this.getAllItemsByLineObj(lineObj);
    items.sort((a, b) => a.due_date - b.due_date);

    for (let i = 0; i < items.length; i++) {
      this.y = this.y + NODE.space;
      let item = items[i];

      if (item.type == 'node') {
        let node = new Node(
          this.snap,
          this.x,
          this.y,
          NODE.radius,
          this.getColorByLineId(item.branch_line_id)
        );
        node.draw(item.done);
        line.pushNode(node);
      } else if (item.type == 'line') {
        this.draw(item);
        this.x = this.x - LINE.space;
      }
    }
  }

  // TODO: Put child line before parent
  // TODO: A event handle the (x,y) list from expanding task

  getAllItemsByLineObj(lineObj) {
    let items = [];
    items = items.concat(
      lineObj.nodes.map((node) => {
        node.type = 'node';
        return node;
      })
    );
    items = items.concat(
      lineObj.branch_line_id.map((lineId) => {
        let line = this.getLineObjByLineId(lineId);
        line.type = 'line';
        return line;
      })
    );

    return items;
  }

  getColorByLineId(id) {
    let colors = {
      0: COLOR.black,
      1: COLOR.red,
      2: COLOR.yellow,
    };
    return colors[id];
  }

  getLineObjByLineId(id) {
    let lineObjs = {
      1: {
        title: 'Branch 1',
        content: '11111 ~~~',
        color: COLOR.red,
        create_date: new Date(2),
        is_main: false,
        contain_branch: false,
        branch_line_id: [2],
        nodes: [
          {
            done: false,
            branch_line_id: 1,
            create_date: new Date(2),
          },
          {
            done: true,
            branch_line_id: 1,
            create_date: Date.now(6),
          },
        ],
      },
      2: {
        title: 'Branch 2',
        content: '22222 ~~~',
        color: COLOR.yellow,
        create_date: new Date(3),
        is_main: false,
        contain_branch: false,
        branch_line_id: [],
        nodes: [
          {
            done: false,
            branch_line_id: 2,
            create_date: new Date(3),
          },
          {
            done: true,
            branch_line_id: 2,
            create_date: new Date(5),
          },
          {
            done: true,
            branch_line_id: 2,
            create_date: new Date(7),
          },
        ],
      },
    };
    return lineObjs[id];
  }
}
class BranchSvg extends React.Component {
  constructor(props) {
    super(props);

    this.svg = React.createRef();
  }

  componentDidMount() {
    this.svgRender();
  }
  componentDidUpdate() {
    this.svgRender();
  }

  svgRender() {
    let TOP = this.svg.current.getBoundingClientRect().top;
    let RIGHT = this.svg.current.getBoundingClientRect().right;
    let BOTTOM = this.svg.current.getBoundingClientRect().bottom;
    let LEFT = this.svg.current.getBoundingClientRect().left;
    console.log(this.svg.current.getBoundingClientRect());

    let snap = Snap(this.svg.current);
    // snap.filter(Snap.filter.shadow(-3, 2, 0.3));

    let lineObj = {
      title: 'Test',
      content: 'I am test ~~~',
      color: COLOR.black,
      create_date: Date.now(),
      is_main: true,
      contain_branch: false,
      branch_line_id: [1],
      // dev only
      nodes: [
        {
          done: false,
          branch_line_id: 0,
          create_date: new Date(1),
        },
        {
          done: true,
          branch_line_id: 0,
          create_date: new Date(4),
        },
        {
          done: true,
          branch_line_id: 0,
          create_date: new Date(8),
        },
      ],
    };

    let drawer = new Drawer(this.svg.current, BOTTOM);
    drawer.draw(lineObj);
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
