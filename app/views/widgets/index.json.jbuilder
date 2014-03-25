json.page do
  json.id @page.id
  json.user_id @page.user_id
  json.company @page.company
  json.position @page.position
  json.layout @page.layout
  json.theme @page.theme
  json.slug @page.slug
  json.handle @page.handle
  json.time_ago @page.time_ago
  json.created_at @page.created_at

  json.widgets @widgets do |widget|
    json.id widget.id
    json.rank widget.rank
    json.name widget.name
    json.page_id widget.page_id

    json.fields widget.fields do |field|
      json.id field.id
      json.widget_id field.widget_id
      json.tag field.tag
      json.label field.label
      json.content field.content
      json.placeholder field.placeholder
      json.content_type field.content_type

      if field.tag == 'img'
        json.inline_url field.image.url(:inline)
        json.image_url field.image.url
      end
    end
  end
end