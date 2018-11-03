import React from 'react';

class GridCell extends React.Component{
    render(){
        return <div className="col">{this.props.data}</div>;
    }
}

export default GridCell;