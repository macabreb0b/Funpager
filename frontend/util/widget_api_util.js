export const fetchWidgets = pageId => (
  $.ajax({
    method: 'GET',
    url: `/pages/${pageId}/widgets`,
  })
);

export const createWidget = (pageId, type, rankAfter) => (
  $.ajax({
    method: 'POST',
    url: `/widgets`,
    data: {
      widget: {
        rank_after: rankAfter,
        page_id: pageId,
        name: type
      }
    }
  })
);

export const updateWidget = (widgetId, fields) => (
  $.ajax({
    method: 'PUT',
    url: `/widgets/${widgetId}`,
    data: {
      widget: {
        fields_attributes: fields,
      }
    }
  })
);

