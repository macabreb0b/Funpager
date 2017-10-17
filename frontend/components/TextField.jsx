import React, { Component } from 'react';


class TextField extends Component {
    render() {
        const { field } = this.props;

        const fieldHasNoContent = !field.content;
        if (fieldHasNoContent) return '';

        const TagName = field.tag;

        return (
            <TagName>
                {field.content.replace(/\r\n/g, "<br><br>")}
            </TagName>
        )
       
    }
}


export default TextField;