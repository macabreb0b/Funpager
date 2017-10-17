export const selectPage = ({ pages, widgets }, id) => {
    const page = pages[id] || {};
    return page
};

export const currentPageId = ({ pages, widgets }) => {
    return Object.keys(pages)[0]; // TODO - update when there's >1 page
}

export const selectAllWidgets = ({ widgets }) => (
    Object.keys(widgets).map(key => widgets[key]).sort(function(a, b) {
        a.rank - b.rank
    })
);

export const selectWidget = ({ widgets }, id) => {
    const widget = widgets[id] || {};
    return widget
}