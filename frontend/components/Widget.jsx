import React, { Component } from 'react';

import FieldContainer from './FieldContainer'
import WidgetActionsContainer from './WidgetActionsContainer'

const NAME_TO_GLYPH_MAP = {
    'Text': 'glyphicon-font',
    'Headline': 'glyphicon-header',
    'Contact': 'glyphicon-envelope',
    'Social': 'glyphicon-comment',
    'Button': 'glyphicon-unchecked',
}

class Widget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isHovered: false,
            isOpen: false,
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClickEditWidget = this.handleClickEditWidget.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
    }

    handleMouseOver(event) {
        this.setState({
            isHovered: true
        })
    }

    handleMouseLeave(event) {
        this.setState({
            isHovered: false
        })
    }

    handleClickEditWidget(event) {
        this.setState({
            isOpen: true,
            isHovered: false,
        })
    }

    handleClickDestroyWidget(event) {
        // TODO
    }

    handleClickCancel(event) {
        this.setState({
            isOpen: false,
        })
    }

    renderFields() {
        if (this.state.isOpen) {   
            return this.props.fields.map((field, index) => (
                <FieldContainer 
                    key={field.id} 
                    field={field} 
                    isOpen={true} 
                    index={index} />   
            ))
        } else {
            if (this.props.widget.name === 'Button') {
                const url = this.props.fields.find(function(field) {
                    return field.label === 'URL:';  // TODO - convert to enum
                }).content;
                const text = this.props.fields.find(function(field) { 
                    return field.label === 'Title:';  // TODO - convert to enum
                }).content;

                return (
                    <a href={url} target="_blank">🔗 - {text}</a>
                )
            } else {
                return this.props.fields.map((field, index) => (
                    <FieldContainer 
                        key={field.id} 
                        field={field} 
                        isOpen={false} 
                        index={index} />   
                ))
            }
        }
    }

    render() {
        const { widget, fields } = this.props;

        const renderedFields = this.renderFields();

        if (!this.state.isOpen) {
            const classList = [
                'widget'
            ]
            if (this.state.isHovered) classList.push('hovered');

            const isLoading = false; // TODO - show this when updating

            return (
                isLoading ? <p>Please wait ...</p> : <div
                    onMouseOver={ this.handleMouseOver }
                    onMouseLeave={ this.handleMouseLeave }
                    className={ classList.join(' ') }>

                    <div
                        className='widget_fields'
                        onClick={ this.handleClickEditWidget }>
                        <span className="widget_click-to-edit">Click to edit</span>

                        { renderedFields }
                    </div>

                    <WidgetActionsContainer rankAfter={widget.rank} />
                </div>
            );
        } else {
            const iconClassName = [
                'glyphicon',
                NAME_TO_GLYPH_MAP[widget.name],
            ].join(' ');

            const trashButton = (
                <a 
                    className="btn btn-danger btn-sm trash" 
                    onClick={ this.handleClickDestroyWidget }
                    href="javascript:;">

                    <span className="glyphicon glyphicon-trash"></span>
                </a>
            )

            return (
                <form className="form widget-form edit">
                    <div className="form-header">
                        <h4><span className={ iconClassName }></span> {widget.name}</h4>
                    </div>

                    <div className="form-fields">
                        <input 
                            readOnly
                            type="hidden" 
                            name="widget[page_id]" 
                            value={ widget.page_id } />
                        <input 
                            readOnly
                            type="hidden" 
                            name="widget[rank]" 
                            value={ widget.rank } />
                        <input 
                            readOnly
                            type="hidden" 
                            name="widget[name]" 
                            value={ widget.name } />

                        { renderedFields }
                    </div>

                    <div className="form-footer">
                        { widget.name !== 'Headline' ? trashButton : '' }

                        <a 
                            href="javascript:;" 
                            className='cancel'
                            onClick={this.handleClickCancel}>Cancel</a>
                        <button className="btn btn-primary">
                            Done
                        </button>
                    </div>
                </form>
            )
        }
        
    }
}


export default Widget;