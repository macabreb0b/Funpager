import React, { Component } from 'react';

import WidgetContainer from './WidgetContainer'

class Page extends Component {
    componentWillMount() {
        this.props.fetchPage(this.props.pageId)
    }

    render() {
        const isLoading = !this.props.page;
        const widgetContainers = this.props.widgets.map(widget => (
            <WidgetContainer key={widget.id} widget={widget} />
        ))
        return (
            isLoading ? <p>Please wait ...</p> : <div className="page-content">
                <ul className="widgets">
                    { widgetContainers }                    
                </ul>
                <div className="page-content_footer">
                    <p className="copyright">
                      <span className="show-tooltip"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Change your company name and page title in dashboard settings">
                        &copy; 2017 { this.props.page.company }
                      </span>
                    </p>
                </div>

                <div id="workstation"></div>
            </div>
        );
    }
}


export default Page;