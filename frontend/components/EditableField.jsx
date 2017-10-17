import React, { Component } from 'react';


class EditableField extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { field } = this.props;

        const fieldHasNoContent = !this.props.field.content;
        if (fieldHasNoContent) return '';

        const TagName = this.props.field.tag;
        const isLinkType = TagName === 'a';

        if (isLinkType) {
            return (
                <a 
                    href={this.props.field.content}
                    target="_blank">

                    {this.props.field.content}
                </a>
            )
        } else {
            return (
                <TagName>
                    {field.content.replace(/\r\n/g, "<br><br>")}
                </TagName>
            )
        }
    }
}


export default EditableField;