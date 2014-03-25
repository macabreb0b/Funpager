json.array! @widgets do |json, widget|
  json.id widget.id
  json.rank widget.rank
  json.name widget.name
  json.page_id widget.page_id

  json.fields widget.fields do |jj, field|
    jj.id field.id
    jj.widget_id field.widget_id
    jj.tag field.tag
    jj.label field.label
    jj.content field.content
    jj.placeholder field.placeholder
    jj.content_type field.content_type

    if field.tag == 'img'
      jj.inline_url field.image.url(:inline)
      jj.image_url field.image.url
    end
  end
end
