import React from 'react';
import { connect } from 'react-redux';

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
  begin_y: 33,
  space: 40,
  width: 5,
  curve: NODE.space / 2,
  opacity: 0.8,
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
    if (line.is_main) this.drawHorizontal(line, 0, x, y);
    else this.drawHorizontal(line, LINE.begin_x, x, y);
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
class BranchSvg extends React.Component {
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
    console.log('Rerender~');
    if (
      linesObj === undefined ||
      tasksObj === undefined ||
      positionsObj === undefined
    )
      return;
    //    console.log(tasksObj);
    let TOP = this.svg.current.getBoundingClientRect().top;
    let BOTTOM = this.svg.current.getBoundingClientRect().bottom;

    //    this.getDataFromProps();
    //    this.getDataFromProps(lines, tasks, positions);
    let lines = [];
    for (let line of linesObj) {
      lines.push({
        _id: line._id,
        is_main: line.is_main,
        color: this.colorArrayToHex(line.color_RGB),
      });
    }

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

    //    console.log('lines___', lines);
    //    console.log('tasks___', tasks_);

    let x, y;
    let drawer = new Drawer(this.svg.current, BOTTOM);

    // Draw Main Line
    x = LINE.begin_x;
    y = LINE.begin_y;
    let line;
    for (let i = 0; i < lines.length; i++) {
      line = lines[i];
      if (line.is_main) {
        drawer.drawLine(line, x, y);
        lines[i]['x'] = x;
      }
    }

    let task;
    for (let i = 0; i < tasks.length; i++) {
      task = tasks[i];
      if (task.pos === undefined) continue;

      let line_index = this.getIndexOfLineById(lines, task.line_id);
      y = task.pos.y - TOP + NODE.radius - 2;
      if (lines[line_index]['x'] === undefined) {
        x = x + LINE.space;
        drawer.drawLine(lines[line_index], x, y);
        lines[line_index]['x'] = x;
      }
      if (task.pos !== undefined) {
        drawer.drawNode(task, lines[line_index]['x'], y);
      }
    }
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

export default BranchSvg;
