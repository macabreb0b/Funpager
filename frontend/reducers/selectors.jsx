export const selectPage = ({ pages, widgets }, id) => {
    const page = pages[id] || {};
    return page
};

export const selectAllWidgets = ({ widgets }) => (
    Object.keys(widgets).map(key => widgets[key])
);

export const selectWidget = ({ widgets }, id) => {
    const widget = widgets[id] || {};
    return widget
}