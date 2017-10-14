json.array! @widgets do |json, widget|
  json.id widget.id
  json.rank widget.rank
  json.name widget.name
  json.page_id widget.page_id

  json.fields widget.fields do |json_sub_item, field|
    json_sub_item.id field.id
    json_sub_item.widget_id field.widget_id
    json_sub_item.tag field.tag
    json_sub_item.label field.label
    json_sub_item.content field.content
    json_sub_item.placeholder field.placeholder
    json_sub_item.content_type field.content_type

    if field.tag == 'img'
      json_sub_item.inline_url field.image.url(:inline)
      json_sub_item.image_url field.image.url
    end
  end
end
