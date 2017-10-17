export const fetchPage = pageId => (
    $.ajax({
        method: 'GET',
        url: `/pages/${pageId}`,
    })
);

export const updatePageTheme = (pageId, themeName) => (
    $.ajax({
        method: 'PUT',
        url: `/pages/${pageId}`,
        data: {
            page: {
                theme: themeName,
            }
        }
    })

)