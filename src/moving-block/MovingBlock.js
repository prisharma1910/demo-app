import React from 'react';
import "./MovingBlock.css";

class MovingBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            color: '#000',
            //1 - top left
            //2 - top right
            //3 - bottom left
            //4 - bottom right
            blockingBlock: {position: 1, boxCoordinates: {blockedX: 0, blockedY: 0}}
        }
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateInnerSvg);
        this.setState({
            blockingBlock: {...this.state.blockingBlock, boxCoordinates: this.getBlockerBoxPosition()}
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateInnerSvg);
    }

    getSvgRect = () => {
        if (!this.outerSquare) {
            return { outerSquare: {}, innerSquare: {}, blockerSquare: {} };
        }
        return {
            outerSquare: this.outerSquare.getBoundingClientRect(),
            innerSquare: this.innerSquare.getBoundingClientRect(),
            blockerSquare: this.blockerSquare.getBoundingClientRect()
        };
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

    updateInnerSvg = () => {
        const { boxX, boxY } = this.getBoxPosition();
        const blockingBoxCoordinates = this.getBlockerBoxPosition();

        this.innerSquare.setAttribute('x', boxX);
        this.innerSquare.setAttribute('y', boxY);
        this.setState({
            blockingBlock: {...this.state.blockingBlock, boxCoordinates: blockingBoxCoordinates}
        })
    }

    moveForward = () => {
        let {position: currentPosition, blockingBlock, color: newColor} = this.state;
        const blockedPosition = blockingBlock.position;
        let newPosition = currentPosition + 1;
        newColor = '#000';
        if (currentPosition === 4) {
            newPosition = 1;
        }
        if(newPosition === blockedPosition){
            newPosition = currentPosition;
            newColor = '#FF0000';
        }
        this.setState({
            position: newPosition,
            color: newColor
        })
    }

    moveBackward = () => {
        let {position: currentPosition, blockingBlock, color: newColor} = this.state;
        const blockedPosition = blockingBlock.position;   
        let newPosition = currentPosition - 1;
        newColor = '#000';
        if (currentPosition === 1) {
            newPosition = 4;
        }
        if(newPosition === blockedPosition){
            newPosition = currentPosition;
            newColor = '#FF0000';
        }
        this.setState({
            position: newPosition,
            color: newColor
        })
    }

    getBlockerBoxPosition = () => {
        let boxCoordinates = { blockedX: 0, blockedY: 0 }; // position 1
        const { outerSquare, blockerSquare } = this.getSvgRect();
        if(!outerSquare.height){
            return boxCoordinates;
        }
        switch (this.state.blockingBlock.position) {
            case 2:
                boxCoordinates.blockedX = outerSquare.width - blockerSquare.width;
                break;
            case 3:
                boxCoordinates.blockedX = outerSquare.width - blockerSquare.width;
                boxCoordinates.blockedY = outerSquare.height - blockerSquare.height;
                break;
            case 4:
                boxCoordinates.blockedY = outerSquare.height - blockerSquare.height;
                break;
            default:
                boxCoordinates.blockedX = 0;
                boxCoordinates.blockedY = 0;
        }
        return boxCoordinates;
    }


    render() {
        const { boxX, boxY } = this.getBoxPosition();
        const {blockedX, blockedY} = this.state.blockingBlock.boxCoordinates;
        return (<React.Fragment>
            <h2> Block </h2>
            <div className="float-left">
                <svg x="0" y="0" width="50vw" height="50vh" ref={(ref) => { this.svgContainer = ref; }}>
                    <rect width="100%" height="100%" ref={(ref) => { this.outerSquare = ref; }}
                        style={{ fill: '#fff', strokeWidth: 3, stroke: '#006400' }} />
                    <rect x={boxX} y={boxY} width="100" height="100" ref={(ref) => { this.innerSquare = ref; }}
                        style={{ fill: this.state.color }} />
                    <rect x={blockedX} y={blockedY} width="50" height="50" ref={(ref) => { this.blockerSquare = ref; }}
                        style={{ fill: '#FFC0CB' }} />
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