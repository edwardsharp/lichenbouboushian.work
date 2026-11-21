# artist website template

a content-first jekyll website with project galleries, writing, a recent activity archive, responsive layouts, and light and dark themes. the `main` branch starts without pages or images; the `demo` branch contains an example site.

## getting started

use this repository as a template, then edit `_config.yml` to set the site title, description, email, and optionally a social preview image. add content under `content/`:

```text
content/
  _pages/           markdown pages
    projects/       one file per project
    writing/        one file per writing piece
  images/           photographs
  documents/        downloadable files
src/
  _layouts/         page templates
  _includes/        reusable components
  _plugins/         homepage content rendering
  _sass/            styles and colors
  assets/           javascript, CSS entry point, and fonts
```

create these folders when needed. put front matter between the opening `---` lines and write markdown below them. file and image paths are case-sensitive.

## create pages

create `content/_pages/home.md`:

```markdown
---
title: Home
layout: home
permalink: /
heading: Artist name
show_project_text: true
---

An introduction.
```

create `content/_pages/about.md`:

```markdown
---
title: About
permalink: /about/
nav_order: 1
columns: true
show_collection_on_home_page: true
image: /content/images/portrait.jpg
image_alt: Describe the photograph.
---

## Bio

Write a biography here.
```

`nav_order` adds a page to the navigation and controls its order. `nav_link_title` optionally supplies a shorter navigation label when space is limited. `show_collection_on_home_page: true` also displays the page on the homepage; omit it or set it to `false` to keep the page separate. the navigation still links to the separate page. two-column pages show media beside text on larger screens; omit image fields for text-only pages.

## projects and writing

create `content/_pages/projects.md` to enable the project index:

```yaml
---
title: Select Projects
nav_link_title: Projects
layout: projects
permalink: /projects/
nav_order: 3
show_collection_on_home_page: true
---
```

create a file in `content/_pages/projects/` for each project:

```markdown
---
title: Project title
layout: project
permalink: /projects/project-title/
order: 1
show_on_home_page: true
medium: Performance
image: /content/images/project.jpg
image_alt: Describe the photograph.
description: A short description for link previews.
---

Project text goes here.
```

`show_on_home_page` selects individual project cards. the project index's `show_collection_on_home_page` controls whether the grid is shown at all. the navigation link appears when at least one project exists, even if none are selected for the homepage. set `show_project_text: false` in `home.md` to hide titles and captions under its cards.

create `content/_pages/writing.md` to enable the writing index:

```yaml
---
title: Writing
layout: writing-index
permalink: /writing/
nav_order: 5
---
```

add markdown files in `content/_pages/writing/`, each with a `title` and `permalink`. writing pages use the two-column layout by default. the writing navigation link appears when at least one writing piece exists.

## media and captions

add a `gallery` list to a two-column page or project to show a carousel instead of its single image:

```yaml
gallery:
  - src: /content/images/first.jpg
    alt: Describe the first photograph.
    caption: "Photo by [photographer](https://example.com)."
  - src: /content/images/second.jpg
    alt: Describe the second photograph.
```

captions are optional and support markdown links. add `image_caption` for a single image. galleries support swiping, buttons, and keyboard navigation. project pages can also list videos:

```yaml
videos:
  - id: youtube-video-id
    title: A descriptive video title.
    caption: An optional credit.
```

to add an image in page text, define an object such as `detail_photo` with `src`, `alt`, and an optional `caption` in front matter, then insert:

```liquid
{% include photo.html image=page.detail_photo %}
```

## recent activity

create `content/_pages/recent.md` with `layout: agenda`, a `title`, `permalink: /recent/`, and a `nav_order`. write an introduction followed by year headings using `##`; use `###` for subsections. add videos between entries:

```liquid
{% include video.html id="youtube-video-id" title="A descriptive video title" caption="An optional credit" %}
```

for internal links, use `relative_url` so they work on a site hosted under a repository path:

```liquid
[about]({{ '/about/' | relative_url }})
```

## run locally

install ruby 3.3 or later and bundler, then run:

```sh
bundle install
bundle exec jekyll serve --livereload
```

restart the server after changing `_config.yml`. the empty template has no homepage until `home.md` is created.

## publish on github pages

in repository settings, choose github actions as the pages source. the workflow builds pull requests and pushes to `main` and `demo`; it deploys `main` by default. to deploy `demo` instead, add the repository actions variable `PAGES_BRANCH` with value `demo`. this setting belongs to each repository and is not copied when creating a repository from the template.

the workflow supplies the deployment URL and base path automatically. for other hosting, set `url` and `baseurl` in `_config.yml`. pages can provide `description`, `social_image`, and `social_image_alt` for link previews. a page's `image` and `image_alt` are used as a fallback, followed by the site-wide values. preview services may cache images and choose their own crops.

## fonts and design

atkinson hyperlegible next is self-hosted under `src/assets/fonts/`; its license is in that folder. colors are defined at the top of `src/_sass/_site.scss`, with dark mode following the visitor's system preference.
