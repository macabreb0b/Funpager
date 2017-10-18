import merge from 'lodash/merge';
import React, { Component } from 'react';

import EditableFieldContainer from './EditableFieldContainer'
import WidgetActionsContainer from './WidgetActionsContainer'

const NAME_TO_GLYPH_MAP = {
    'Text': 'glyphicon-font',
    'Headline': 'glyphicon-header',
    'Contact': 'glyphicon-envelope',
    'Social': 'glyphicon-comment',
    'Button': 'glyphicon-unchecked',
}

class EditableWidget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editedFields: {},
        }

        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickDone = this.handleClickDone.bind(this);
        this.handleClickDestroy = this.handleClickDestroy.bind(this);
        this.updateFieldContent = this.updateFieldContent.bind(this);
    }

    handleClickDone(event) {
        event.preventDefault();

        this.props.updateWidget( 
            Object.values(this.state.editedFields),
        );
    }

    handleClickDestroy(event) {
        this.props.destroyWidget()
    }

    handleClickCancel(event) {
        this.props.cancelEditing();
    }

    updateFieldContent(fieldId, fieldContent) {

        const newState = merge({}, this.state.editedFields, {
            [fieldId]: { 
                id: fieldId,
                content: fieldContent,
            }
        })
        this.setState({
            editedFields: newState
        })
    }

    renderFields() {
        return this.props.fields.map((field) => (
            <EditableFieldContainer 
                key={field.id} 
                field={field} 
                updateFieldContent={ this.updateFieldContent } />   
        ))
    }

    render() {
        const { widget, fields } = this.props;

        const renderedFields = this.renderFields();

        const iconClassName = [
            'glyphicon',
            NAME_TO_GLYPH_MAP[widget.name],
        ].join(' ');

        const trashButton = (
            <a 
                className="btn btn-danger btn-sm trash" 
                onClick={ this.handleClickDestroy }
                href="javascript:;">

                <span className="glyphicon glyphicon-trash"></span>
            </a>
        )

        return (
            <form className="form widget-form">
                <div className="widget-form_header">
                    <h4><span className={ iconClassName }></span> {widget.name}</h4>
                </div>

                <div className="widget-form_fields">
                    { renderedFields }
                </div>

                <div className="widget-form_footer">
                    { widget.name !== 'Headline' ? trashButton : '' }

                    <a 
                        href="javascript:;" 
                        className='btn'
                        onClick={this.handleClickCancel}>
                        Cancel
                    </a>

                    <a 
                        href="javascript:;"
                        className="btn btn-primary"
                        onClick={this.handleClickDone}>
                        Done
                    </a>
                </div>
            </form>
        )
        
    }
}


export default EditableWidget;