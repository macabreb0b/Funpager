import React, { Component } from 'react';


class Field extends Component {

    handleContentChanged(event) {
        this.setState({
            newContent: event.target.value
        })
    }
    render() {
        const { field } = this.props;

        if (!this.props.isOpen) {
            const fieldHasNoContent = !field.content;
            if (fieldHasNoContent) return '';

            const TagName = field.tag;
            const isLinkType = TagName === 'a';

            if (isLinkType) {
                return (
                    <a 
                        href={this.props.field.content}
                        target="_blank">

                        { field.content }
                    </a>
                )
            } else {
                return (
                    <TagName>
                        {field.content.replace(/\r\n/g, "<br><br>")}
                    </TagName>
                )
            }
        } else {
            const index = this.props.index;
            const hiddenFieldIDInputElement = field.id ? (
                <input
                    readOnly
                    type="hidden"
                    name={ "widget[fields_attributes][" + index + "][id]" }
                    value={ field.id } />
            ) : ''

            let userInputElement;
            if (field.content_type === 'textarea')  {
                userInputElement = (
                    <label>
                        { field.label }
                        <textarea
                            defaultValue={ field.content }
                            className="form-control"
                            name={"widget[fields_attributes][" + index + "][content]"} />
                    </label>
                )
            } else {
                userInputElement = (
                    <label>
                        { field.label }
                        <input
                            className="form-control"
                            placeholder={ field.placeholder }
                            type={ field.content_type }
                            name={ "widget[fields_attributes][" + index + "][content]" }
                            defaultValue={ field.content } />
                    </label>
                )
            }

            return (
                <div id='form-group'>
                    <input
                        readOnly
                        type="hidden"
                        name={ 'widget[fields_attributes][' + index + '][label]' }
                        value={ field.label } />
                    <input
                        readOnly
                        type="hidden"
                        name={ 'widget[fields_attributes][' + index + '][placeholder]' }
                        value={ field.placeholder } />
                    <input 
                        readOnly
                        type="hidden"
                        name={"widget[fields_attributes][" + index + "][content_type]"}
                        value={ field.content_type } />

                    { hiddenFieldIDInputElement }

                    { userInputElement}

                </div>
            )
        }
    }
}


export default Field;