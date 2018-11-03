import React from 'react';
import { default as GridCell } from './components/GridCell';
import './Grid.css';

class Grid extends React.Component {
  render() {
    const cells = [];

    for (let i = 0; i < 4; i++) {
      cells.push(<GridCell data={'column ' + i} />);
    }

    //Code that can be used to see grid inside 4th column
    // will need to comment the above for-loop for the same.

    /**
    const cells2 = [];
     for (let i = 0; i < 3; i++) {
     cells.push(<GridCell data={'column ' + i} />);
    }
    for (let i = 3; i < 7; i++) {
      cells2.push(<GridCell data={'column ' + i} />);
    }

    cells.push(<GridCell data={<div className="grid">
      <div className="row">{cells2}</div>
    </div>} />);
     */

    return (<div>
      <h3>Grid</h3>
      <div className="grid">
        <div className="row">{cells}</div>
      </div>
    </div>);
  }
}

export default Grid;