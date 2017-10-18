import React, { Component } from 'react';

import TextFieldContainer from './TextFieldContainer'
import WidgetActionsContainer from './WidgetActionsContainer'
import PhotoFieldContainer from './PhotoFieldContainer'

class Widget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isHovered: false,
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClickEditWidget = this.handleClickEditWidget.bind(this);
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
            isHovered: false,
        })
        this.props.startEditingWidget(this.props.widget.id)
    }

    renderFields() {
        if (this.props.widget.name === 'Button') {
            // special case links I guess

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
            return this.props.fields.map((field) => {
                if (field.tag === 'img') {
                    return (
                        <PhotoFieldContainer
                            key={field.id}
                            field={field} />
                    )
                } else {
                    return(
                        <TextFieldContainer 
                            key={field.id} 
                            field={field} />   
                    )
                }
            })
        }
    }

    render() {
        const { widget, fields } = this.props;

        const renderedFields = this.renderFields();

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

                <WidgetActionsContainer widgetId={widget.id} rank={widget.rank} />
            </div>
        );
    
        
    }
}


export default Widget;