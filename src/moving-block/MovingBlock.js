import React from 'react';
import "./MovingBlock.css";

class MovingBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1
            //1 - top left
            //2 - top right
            //3 - bottom left
            //4 - bottom right
        }
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateInnerSvg);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateInnerSvg);
    }

    getSvgRect = () => {
        if (!this.outerSquare) {
            return { outerSquare: {}, innerSquare: {} };
        }
        return {
            outerSquare: this.outerSquare.getBoundingClientRect(),
            innerSquare: this.innerSquare.getBoundingClientRect()
        };
    }

    updateInnerSvg = () => {
        const { outerSquare, innerSquare } = this.getSvgRect();

        let newx = null;
        let newy = null;

        switch (this.state.position) {
            case 1:
            default:
                newx = 0;
                newy = 0;
                break;
            case 2:
                newx = outerSquare.right - innerSquare.width;
                newy = 0;
                break;
            case 3:
                newx = outerSquare.right - innerSquare.width;
                newy = outerSquare.height - innerSquare.height;
                break;
            case 4:
                newx = 0;
                newy = outerSquare.height - innerSquare.height;
        }

        this.innerSquare.setAttribute('x', newx);
        this.innerSquare.setAttribute('y', newy);
    }

    moveForward = () => {
        let currentPosition = this.state.position;
        let newPosition = currentPosition + 1;
        if (currentPosition === 4) {
            newPosition = 1;
        }
        this.setState({
            position: newPosition
        })
    }

    moveBackward = () => {
        let currentPosition = this.state.position;
        let newPosition = currentPosition - 1;
        if (currentPosition === 1) {
            newPosition = 4;
        }
        this.setState({
            position: newPosition
        })
    }

    getBoxPosition = () => {
        let boxCoordinates = { boxX: 0, boxY: 0 }; // position 1
        const { outerSquare, innerSquare } = this.getSvgRect();

        switch (this.state.position) {
            case 2:
                boxCoordinates.boxX = outerSquare.width - innerSquare.width;
                break;
            case 3:
                boxCoordinates.boxX = outerSquare.width - innerSquare.width;
                boxCoordinates.boxY = outerSquare.height - innerSquare.height;
                break;
            case 4:
                boxCoordinates.boxY = outerSquare.height - innerSquare.height;
                break;
            default:
                boxCoordinates.boxX = 0;
                boxCoordinates.boxY = 0;
        }
        return boxCoordinates;
    }

    render() {
        const { boxX, boxY } = this.getBoxPosition();
        return (<React.Fragment>
            <h2> Block </h2>
            <div className="float-left">
                <svg x="0" y="0" width="50vw" height="50vh" ref={(ref) => { this.svgContainer = ref; }}>
                    <rect width="100%" height="100%" ref={(ref) => { this.outerSquare = ref; }}
                        style={{ fill: '#fff', strokeWidth: 3, stroke: '#006400' }} />
                    <rect x={boxX} y={boxY} width="100" height="100" ref={(ref) => { this.innerSquare = ref; }}
                        style={{ fill: '#000' }} />
                </svg>
            </div>
            <div className="float-left button-container">
                <button onClick={this.moveForward} className="forward-button"> Forward </button>
                <button onClick={this.moveBackward} className="backward-button"> Backward </button>
            </div>
        </React.Fragment>)
    }
}

export default MovingBlock;