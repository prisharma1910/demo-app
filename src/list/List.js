import React from 'react';
import './List.css';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listItems: ['India', 'America', 'Australia'],
            newItemName: ''
        }
    }

    updateNewItem = (text) => {
        this.setState({
            newItemName: text.currentTarget.value
        })
    }

    addItem = () => {
        const newList = Object.assign([], this.state.listItems);
        newList.push(this.state.newItemName);
        this.setState({
            listItems: newList,
            newItemName: ''
        })
    }

    render() {
        const { listItems, newItemName } = this.state;
        return (<React.Fragment>
            <h3 className="list-h3">List</h3>
            <div className="new-item">
                <input onChange={this.updateNewItem} value={newItemName} className="new-item-input"></input>
                <button onClick={this.addItem} disabled={!this.state.newItemName} className="add-button">Insert Item</button>
            </div>
            <ul className="list-items">
                {listItems.map((item, index) => { return <li key={index}>{item}</li> })}
            </ul>
        </React.Fragment>)
    }
}

export default List;