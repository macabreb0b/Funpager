import React, {Component} from 'react';
// import CanvasLoader from 'heartcode-canvasloader'


class LoadingWidget extends Component {
    componentDidMount() {
        const canvasLoader = new CanvasLoader('canvasloader-container');

        canvasLoader.setColor('#F2591D'); // default is '#000000'
        canvasLoader.setShape('spiral'); // default is 'oval'
        canvasLoader.setDiameter(64); // default is 40
        canvasLoader.setDensity(25); // default is 40
        canvasLoader.setRange(0.6); // default is 1.3
        canvasLoader.setFPS(30); // default is 24
        canvasLoader.show(); // Hidden by default
    }

    render() {
        return (
            <div id='canvasloader-container' className='loading-wrapper'></div>
        )
    }
}

export default LoadingWidget