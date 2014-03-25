json.widget do |j|
  json.id @widget.id
  json.rank @widget.rank
  json.name @widget.name
  json.page_id @widget.page_id

  json.fields @widget.fields do |field|
    json.id field.id
    json.widget_id field.widget_id
    json.tag field.tag
    json.label field.label
    json.content field.content
    json.content_type field.content_type
      json.inline_url field.image.url(:inline)
      json.image_url field.image.url
  end
end

