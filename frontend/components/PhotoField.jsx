import React, { Component } from 'react';


class PhotoField extends Component {
    render() {
        const { field } = this.props;

        const fieldHasNoContent = !field.content;
        if (fieldHasNoContent) return '';

        return (
            <div>
                <img 
                    className="inline-image"
                    src={field.inline_url} />

                <p className="caption">{field.content}</p>
            </div>
        )
    }
}


export default PhotoField;