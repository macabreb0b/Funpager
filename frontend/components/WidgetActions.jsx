import React, { Component } from 'react';

import { WidgetTypes } from './CreateWidgetButton';
import CreateWidgetButtonContainer from './CreateWidgetButtonContainer';

const RankDestinations = {
    ONE_DOWN: 'increment',
    ONE_UP: 'decrement',
    SEND_TO_TOP: 'top',
    SEND_TO_BOTTOM: 'bottom',
}

class WidgetActions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showForm: false,
        }

        this.handleClickAddContent = this.handleClickAddContent.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.handleClickMoveUp = this.handleClickMoveUp.bind(this);
        this.handleClickMoveToTop = this.handleClickMoveToTop.bind(this);
        this.handleClickMoveDown = this.handleClickMoveDown.bind(this);
        this.handleClickMoveToBottom = this.handleClickMoveToBottom.bind(this);
    }
    
    closeForm() {
        this.setState({
            showForm: false
        });
    }

    handleClickAddContent(event) {
        this.setState({
            showForm: true,
        })
    }

    handleClickCancel(event) {
        this.closeForm();
    }

    handleClickMoveUp(event) {
        event.preventDefault();

        this.props.adjustRank(RankDestinations.ONE_UP)
        this.closeForm();
    }

    handleClickMoveToTop(event) {
        event.preventDefault();

        this.props.adjustRank(RankDestinations.SEND_TO_TOP)
        this.closeForm();
    }

    handleClickMoveDown(event) {
        event.preventDefault();

        this.props.adjustRank(RankDestinations.ONE_DOWN)
        this.closeForm();
    }

    handleClickMoveToBottom(event) {
        event.preventDefault();

        this.props.adjustRank(RankDestinations.SEND_TO_BOTTOM)
        this.closeForm();
    }

    render() {
        if (!this.state.showForm) {
            return (
                <div className='widget_add-widget'>
                    <a 
                        href='javascript:;' 
                        onClick={this.handleClickAddContent}
                        className='btn btn-default btn-sm btn-add-content'>
                        ↪️ Add Content Below
                    </a>
                    <a 
                        href='javascript:;' 
                        onClick={this.handleClickMoveUp}
                        className='btn btn-default btn-sm btn-add-content'>
                        🔼
                    </a>
                    <a 
                        href='javascript:;' 
                        onClick={this.handleClickMoveDown}
                        className='btn btn-default btn-sm btn-add-content'>
                        🔽
                    </a>
                    <a 
                        href='javascript:;' 
                        onClick={this.handleClickMoveToTop}
                        className='btn btn-default btn-sm btn-add-content'>
                        ⏫
                    </a>
                    <a 
                        href='javascript:;' 
                        onClick={this.handleClickMoveToBottom}
                        className='btn btn-default btn-sm btn-add-content'>
                        ⏬
                    </a>
                </div>
            );
        } else {
            const widgetButtonContainers = Object.values(WidgetTypes).map(widgetType => (
                <CreateWidgetButtonContainer 
                    widgetType={widgetType} 
                    key={widgetType} 
                    rankAfter={this.props.rank} 
                    closeFormAfterCreate={ this.closeForm }/>
            ))
            return (
                <div id="newWidget">
                    <div className="widget-form">
                        <div className="widget-form_header">
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