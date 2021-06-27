import React from 'react';

const COLOR = {
  white: '#ffffff',
};
const NODE = {
  space: 74,
  radius: 11,
  head_radius: 15,
};
const LINE = {
  begin_x: 40,
  begin_y: 10,
  space: 40,
  v_space: 20,
  width: 5,
  curve: NODE.space / 2,
  opacity: 0.7,
  branchView_y_space: 0,
};

class Drawer {
  constructor(svg, bottom) {
    this.snap = Snap(svg);
    this.bottom = bottom;

    this.snap.clear();

    this.drawLine = this.drawLine.bind(this);
    this.drawHorizontal = this.drawHorizontal.bind(this);
    this.drawVertical = this.drawVertical.bind(this);
    this.drawNode = this.drawNode.bind(this);
  }

  drawLine(line, x, y) {
    if (line.is_host !== true) {
      if (line.is_main)
        this.drawHorizontal(line, LINE.begin_x + LINE.width / 2, x, y);
      else this.drawHorizontal(line, x - LINE.space + LINE.width / 2, x, y);
    }
    this.drawVertical(line, x, y - LINE.width / 2, this.bottom);
  }

  drawHorizontal(line, x1, x2, y) {
    this.snap.line(x1, y, x2, y).attr({
      stroke: line.color,
      strokeWidth: LINE.width,
      opacity: LINE.opacity,
    });
  }

  drawVertical(line, x, y1, y2) {
    this.snap.line(x, y1, x, y2).attr({
      stroke: line.color,
      strokeWidth: LINE.width,
      opacity: LINE.opacity,
    });
  }

  drawNode(node, x, y) {
    //    console.log(node.color, x, y);
    this.snap.circle(x, y, NODE.radius).attr({ fill: node.color });
    this.snap.circle(x, y, NODE.radius * 0.7).attr({ fill: COLOR.white });

    if (node.achieved) {
      this.snap.circle(x, y, NODE.radius * 0.5).attr({ fill: node.color });
    }
  }
}
class SvgTaskView extends React.Component {
  constructor(props) {
    super(props);

    this.svg = React.createRef();

    this.getIndexOfTaskById = this.getIndexOfTaskById.bind(this);
    this.getIndexOfLineById = this.getIndexOfLineById.bind(this);
    //    this.getDataFromProps = this.getDataFromProps.bind(this);
    this.colorArrayToHex = this.colorArrayToHex.bind(this);
  }

  componentDidMount() {
    const Snap = require('snapsvg-cjs');
    let { lines, tasks, positions } = this.props;
    this.svgRender(lines, tasks, positions);
  }
  componentDidUpdate() {
    const Snap = require('snapsvg-cjs');
    let { lines, tasks, positions } = this.props;
    this.svgRender(lines, tasks, positions);
  }

  svgRender(linesObj, tasksObj, positionsObj) {
    //    console.log('Rerender~');
    if (
      linesObj === undefined ||
      tasksObj === undefined ||
      positionsObj === undefined
    )
      return;
    let TOP = this.svg.current.getBoundingClientRect().top;
    let BOTTOM = this.svg.current.getBoundingClientRect().bottom;

    let lines = [];
    for (let line of linesObj) {
      //      console.log(line);
      lines.push({
        _id: line.Line._id,
        is_main: line.Line.is_main,
        color: this.colorArrayToHex(line.Line.color_RGB),
        due_date: line.Node.due_date,
      });
    }
    lines.sort((a, b) => -(a.due_date < b.due_date));

    let line_index = false;
    let tasks = [];
    for (let task of tasksObj) {
      if (task._id === '0' || task.task.branch_line_id !== null) continue;
      line_index = this.getIndexOfLineById(lines, task.task.mother_line_id);
      tasks.push({
        _id: task.task._id,
        line_id: task.task.mother_line_id,
        color: line_index !== null ? lines[line_index].color : COLOR.white,
        achieved: task.task.achieved,
      });
    }
    for (let pos of positionsObj) {
      tasks[this.getIndexOfTaskById(tasks, pos.task_id)]['pos'] = pos;
    }

    let x, y;
    let drawer = new Drawer(this.svg.current, BOTTOM);

    // Draw Main Line
    x = LINE.begin_x;
    y = LINE.begin_y;
    let line;

    line = { is_host: true, color: '#000000' };
    drawer.drawLine(line, x, y);
    x += LINE.space;
    y += LINE.v_space;

    for (let i = 0; i < lines.length; i++) {
      line = lines[i];
      drawer.drawLine(line, x, y);
      lines[i]['x'] = x;
      x += LINE.space;
      y += LINE.v_space;
    }
    //    console.log(lines);
  }

  getIndexOfTaskById(tasks, _id) {
    for (let i = 0; i < tasks.length; i++) if (tasks[i]._id === _id) return i;
    return null;
  }
  getIndexOfLineById(lines, _id) {
    for (let i = 0; i < lines.length; i++) if (lines[i]._id === _id) return i;
    return null;
  }
  colorArrayToHex(arr) {
    let hex =
      '#' + arr.map((c) => ('0' + (c & 0xff).toString(16)).slice(-2)).join('');
    //      console.log(colorCode);
    return hex;
  }

  render() {
    if (this.svg.current !== null) {
      const Snap = require('snapsvg-cjs');
      this.svgRender();
    }
    return (
      <svg
        ref={this.svg}
        className='top-24 left-0 h-5/6 absolute w-1/5'
        xmlns='http://www.w3.org/2000/svg'
        lines={this.props.lines}
        tasks={this.props.tasks}
        positions={this.props.positions}
      />
    );
  }
}

export default SvgTaskView;
