import React, { Component } from 'react';


class EditableField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.field.content
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            content: event.target.value
        }, () => { 
            this.props.updateFieldContent(
                this.props.field.id, 
                this.state.content,
            )
        });
    }

    render() {
        const { field } = this.props;

        if (field.content_type === 'textarea')  {
            return (
                <div>
                    <label>
                        { field.label }
                        <textarea
                            onChange={ this.handleInputChange }
                            className="form-control"
                            placeholder={ field.placeholder }
                            value={ this.state.content } />
                    </label>
                </div>
            )
        } else {
            return (
                <div>
                    <label>
                        { field.label }
                        <input
                            className="form-control"
                            onChange={ this.handleInputChange }
                            placeholder={ field.placeholder }
                            type={ field.content_type }
                            value={ this.state.content } />
                    </label>
                </div>
            )
        }
    }
}


export default EditableField;