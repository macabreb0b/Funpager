import React, { Component } from 'react';

import { WidgetTypes } from './CreateWidgetButton';
import CreateWidgetButtonContainer from './CreateWidgetButtonContainer';

class WidgetActions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
        }

        this.handleClickAddContent = this.handleClickAddContent.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
    }

    handleClickAddContent(event) {
        this.setState({
            isOpen: true,
        })
    }

    handleClickCancel(event) {
        this.setState({
            isOpen: false,
        })
    }

    render() {
        if (!this.state.isOpen) {
            return (
                <div className='widget_add-widget'>
                    <a 
                        href='javascript:;' 
                        onClick={this.handleClickAddContent}
                        className='btn btn-default btn-sm btn-add-content'>
                        + Add Content
                    </a>
                </div>
            );
        } else {
            const widgetButtonContainers = Object.values(WidgetTypes).map(widgetType => (
                <CreateWidgetButtonContainer 
                    widgetType={widgetType} 
                    key={widgetType} 
                    rankAfter={this.props.rankAfter}/>
            ))
            return (
                <div id="newWidget">
                    <div className="widget-form">
                        <div className="form-header">
                            <h4>
                                What would you like to add here?
                                <a 
                                    href="javascript:;" 
                                    className='cancel close'
                                    onClick={ this.handleClickCancel }>
                                    <span className='glyphicon glyphicon-remove'></span>
                                </a>
                            </h4>
                        </div>

                        <div className="form-fields">
                            { widgetButtonContainers }
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}


export default WidgetActions;