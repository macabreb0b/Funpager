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
                    <label className='u-display-block u-font-weight-normal'>
                        { field.label }
                        <textarea
                            onChange={ this.handleInputChange }
                            className="form-control"
                            placeholder={ field.placeholder }
                            value={ this.state.content } />
                    </label>
                </div>
            )
        } else if (field.label === 'Alignment:') {
            const radioInputs = ["left", "center"].map((alignment) => (
                <div 
                    key={alignment}
                    className="fieldset fieldset--inline">

                    <label className='u-font-weight-normal'>
                        {alignment + ' '}
                        <input
                            type="radio"
                            value={ alignment }
                            checked={ this.state.content == alignment } 
                            name="alignment"
                            onChange={ this.handleInputChange } />
                    </label>
                </div>
            ))
            return (
                <div>
                    <div><label className='u-font-weight-normal'>Alignment:</label></div>
                    { radioInputs }
                </div>
            )
        } else {
            return (
                <div>
                    <label className='u-display-block u-font-weight-normal'>
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