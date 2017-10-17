import React, {Component} from 'react'

const THEMES = [
    'carbon',
    'brushed-steel',
    'tablecloth',
    'paper-cup',
    'skulls',
    'feathers',
    'stardust',
    'crossword',
    'water',
    'spartan'
]

class Workstation extends Component {
    render() {
        var that = this;
        const renderedThemeLinks = THEMES.map(function(themeName) {
            return (
                <a href="javascript:;" 
                    onClick={that.props.setTheme.bind(that, that.props.pageId, themeName)}
                    className={"workstation_theme workstation_theme--" + themeName}
                    key={themeName}></a>
            )
        })
        return (
            <div className="workstation">
                <div className="u-margin-0-auto u-page-width">
                    { renderedThemeLinks }

                    <a href="/"
                        className="btn btn-primary navbar-btn done">Done</a>
                </div>
            </div>
        )
    }
}

export default Workstation