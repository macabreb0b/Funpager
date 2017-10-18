import React, { Component } from 'react';


class PhotoField extends Component {
    render() {
        const { src, caption } = this.props;

        return (
            <div>
                <img 
                    className="inline-image"
                    src={src} />

                <p className="caption">{caption}</p>
            </div>
        )
    }
}


export default PhotoField;