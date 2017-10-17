import React, { Component } from 'react';

import WidgetContainer from './WidgetContainer'
import EditableWidgetContainer from './EditableWidgetContainer'
import WorkstationContainer from './WorkstationContainer'


class Page extends Component {
    componentWillMount() {
        this.props.fetchPage(this.props.pageId)
    }

    render() {
        const isLoading = !this.props.page;
        const widgetContainers = this.props.widgets.map(widget => {
            if (this.props.openWidgetId && this.props.openWidgetId == widget.id) {
                return (<EditableWidgetContainer key={widget.id} widget={widget} />)
            }
            return (
                <WidgetContainer key={widget.id} widget={widget} />
            )
        })
        return (
            isLoading ? <p>Please wait ...</p> : <div className="page-content">
                <h4>{ 'theme - ' + this.props.page.theme }</h4>
                <ul className="widgets">
                    { widgetContainers }                    
                </ul>
                <div className="page-content_footer">
                    <p className="copyright">
                        <span 
                            title="Change your company name and page title in dashboard settings">
                            &copy; 2017 { this.props.page.company }
                        </span>
                    </p>
                </div>

                <WorkstationContainer pageId={this.props.page.id} /> 
            </div>
        );
    }
}


export default Page;