module Jekyll
  module HomeContent
    def render_home_content(page)
      site = @context.registers[:site]
      original_page = @context.registers[:page]

      @context.stack do
        @context["page"] = page
        @context.registers[:page] = page
        template = site.liquid_renderer.file("home/#{page['path']}").parse(page["content"])
        site.find_converter_instance(Jekyll::Converters::Markdown).convert(template.render!(@context))
      end
    ensure
      @context.registers[:page] = original_page
    end
  end
end

Liquid::Template.register_filter(Jekyll::HomeContent)
