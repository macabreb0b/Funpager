export const selectPage = ({ pages, widgets }, id) => {
    const page = pages[id] || {};
    return page
};

export const currentPageId = ({ pages, widgets }) => {
    return Object.keys(pages)[0]; // TODO - update when there's >1 page
}

export const selectAllWidgets = ({ widgets }) => (
    Object.values(widgets).sort(function(a, b) {
        if(a.rank < b.rank) return -1;
        if(a.rank > b.rank) return 1;

        return 0;
    })
);

export const selectWidget = ({ widgets }, id) => {
    const widget = widgets[id] || {};
    return widget
}
