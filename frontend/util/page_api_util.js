export const fetchPage = pageId => (
  $.ajax({
    method: 'GET',
    url: `/pages/${pageId}`,
  })
);