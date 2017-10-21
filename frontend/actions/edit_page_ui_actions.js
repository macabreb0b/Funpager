export const OPEN_WIDGET_FOR_EDITING = 'OPEN_WIDGET_FOR_EDITING';
export const SHOW_LOADING_FOR_WIDGET = 'SHOW_LOADING_FOR_WIDGET';
export const HIDE_LOADING = 'HIDE_LOADING';

export const openWidgetForEditing = widgetId => ({
    type: OPEN_WIDGET_FOR_EDITING,
    widgetId
})

export const showLoadingForWidget = widgetId => ({
    type: SHOW_LOADING_FOR_WIDGET,
    widgetId
})

export const hideLoading = () => ({
    type: HIDE_LOADING
})