import React, { Component } from 'react';


class EditableField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.field.content,
            image: this.props.field.image
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        if (this.props.field.content_type === 'file') {
            const input = event.target
            const file = input.files[0]

            const reader = new FileReader();
            reader.onload = (event) => {
                this.setState({
                    image: reader.result
                }, () => {
                    this.props.updateField({
                        id: this.props.field.id,
                        image: this.state.image,
                    })
                })
            }

            reader.readAsDataURL(file)
        } else {
            this.setState({
                content: event.target.value
            }, () => { 
                this.props.updateField({
                    id: this.props.field.id, 
                    content: this.state.content,
                })
            });
        }
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