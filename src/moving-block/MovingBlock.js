import React from 'react';
import "./MovingBlock.css";

class MovingBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position : 1
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
        return {outerSquare: this.outerSquare.getBoundingClientRect(),
            innerSquare: this.innerSquare.getBoundingClientRect()};
    }

    updateInnerSvg = () => {
        const { outerSquare, innerSquare } = this.getSvgRect();        

        let newx = null;
        let newy = null;

        switch(this.state.position){
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
                newx= 0;
                newy = outerSquare.height - innerSquare.height;
        }
        
        this.innerSquare.setAttribute('x', newx);
        this.innerSquare.setAttribute('y', newy);
    }

    moveForward = () => {
        const { outerSquare, innerSquare } = this.getSvgRect();

        let newx = null;
        let newy = null;
        let position = 0;

        if (outerSquare.x === innerSquare.x) {
            if (outerSquare.y === innerSquare.y) {
                newx = outerSquare.width - innerSquare.width;
                position = 2;
            } else {
                newy = 0;
                position = 1;
            }
        } else {
            if (outerSquare.y === innerSquare.y) {
                newy = outerSquare.height - innerSquare.height;
                position = 3;
            } else {
                newx = 0;
                position = 4;
            }
        }
        if (newx !== null) {
            this.innerSquare.setAttribute('x', newx);
        } else {
            this.innerSquare.setAttribute('y', newy);
        }

        this.setState({
            position
        });
    }

    moveBackward = () => {
        const { outerSquare, innerSquare } = this.getSvgRect();        

        let newx = null;
        let newy = null;
        let position = 0

        if (outerSquare.x === innerSquare.x) {
            if (outerSquare.y === innerSquare.y) {
                newy = outerSquare.height - innerSquare.height;
                position = 4;
            } else {
                newx = outerSquare.width - innerSquare.width;
                position = 3;
            }
        } else {
            if (outerSquare.y === innerSquare.y) {
                newx = 0;
                position = 1;
            } else {
                newy = 0;
                position = 2;
            }
        }
        if (newx !== null) {
            this.innerSquare.setAttribute('x', newx);
        } else {
            this.innerSquare.setAttribute('y', newy);
        }

        this.setState({
            position
        });
    }

    render() {
        return (<React.Fragment>
            <h2> Block </h2>
            <div className="float-left">
                <svg x="0" y="0" width="50vw" height="50vh" ref={(ref) => { this.svgContainer = ref; }}>
                    <rect width="100%" height="100%" ref={(ref) => { this.outerSquare = ref; }}
                        style={{ fill: '#fff', strokeWidth: 3, stroke: '#006400' }} />
                    <rect x="0" y="0" width="100" height="100" ref={(ref) => { this.innerSquare = ref; }}
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