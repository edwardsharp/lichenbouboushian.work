# lichen bouboushian

lichen bouboushian's work thrives in spaces between right and wrong, clear and obscure, structure and oblivion.

## where things go

```text
content/
  _pages/
    home.md           homepage text
    about.md          bio and artist statement
    recent.md         recent + upcoming engagements, and archive
    cv.md             CV download link
    projects.md       project index introduction
    press.md          press archive, linked from about
    projects/         one markdown file per project
images/               photographs, including project gallery folders
documents/            downloadable CV
src/
  _layouts/           page templates
  _includes/          navigation, footer, project cards, gallery
  _sass/              styles and light/dark colors
  assets/             CSS entry point, gallery script, self-hosted fonts
_config.yml           site name, contact address, publishing settings
Gemfile               ruby dependencies
```

## edit a page

1. open a file in `content/_pages/`, with github's pencil button or locally if you checked out this github repo on your own computer.
2. keep the `---` lines at the top. the settingz between them control the page title, address, and etc.
3. edit the text underneath. blank lines make paragraphs, `##` makes a section heading, and `[words](https://example.com)` makes a link.
4. preview locally, or save your change on github and let the publishing workflow run.

the `title` is also the navigation label. `nav_order` puts a page in the main menu; omit it for pages that should not appear there. keep `permalink` unchanged to avoid breaking shared links.

the homepage's text is in `home.md`. its photo grid comes from project files with `featured: true`, ordered by `order`. four are featured initially; keep four selected for the intended four-photo layout.

about uses `columns: true` to place its photo carousel beside the writing on larger screens, matching the project layout. edit its `gallery` list to reorder, add, or remove photographs; captions work the same way as project galleries below. when a gallery is present, it replaces the single photograph in the page layout.

## edit or add a project

copy an existing file in `content/_pages/projects/`, give it a descriptive filename, and update its settings:

```yaml
---
title: a project title
layout: project
permalink: /projects/a-project-title/
order: 5
featured: false
medium: performance
description: a short description for search engines and link previews.
image: /images/a-project-photo.jpg
image_alt: describe what someone can see in the photograph.
---
```

write the project text below the second `---`. upload photographs to `images/` and use their exact filenames (including capitalization). `image` is the project card photograph. images on cards are cropped; gallery images are shown in full.

project pages use media and writing columns on larger screens, then stack into a centered single column on smaller screens. the first paragraph is styled as a lead; keep it short. use `**bold**`, `*italics*`, and `>` for quotations where appropriate.

to put a video below the main photograph or gallery, add a `videos` list above the closing `---`:

```yaml
videos:
  - id: youtube-video-id
    title: a descriptive video title or credit
```

to add a gallery, add this above the closing `---`:

```yaml
gallery:
  - src: /images/my-project/01.jpg
    alt: a description of the first photograph.
    caption: optional caption and photographer credit.
  - src: /images/my-project/02.jpg
    alt: a description of the second photograph.
```

galleries support swiping, scroll snapping, buttons, and left/right/home/end keys. they never autoplay, respect reduced-motion preferences, and remain scrollable without javascript. click a photograph for the original image.

## photo and video captionz

captions are optional front-matter fields and support markdown, including links for credits. no placeholder credits are added to the site. quote caption strings when they contain punctuation such as a colon.

for a page's main photograph, add `image_caption` alongside `image` and `image_alt`:

```yaml
image_caption: "photo by [jimmy urine](https://mindlessselfindulgence.com)"
```

this appears below the main photograph on about and project pages, and below the same photo on homepage/project cards. credit links are separate from the project link.

for carousel photographs, add `caption` to each gallery item:

```yaml
gallery:
  - src: /images/my-project/01.jpg
    alt: a description of the photograph.
    caption: "performance documentation. photo by [photographer name](https://example.com)"
```

for youtube videos, keep `title` as a plain-text accessible description and add a separate `caption` for linked credits:

```yaml
videos:
  - id: youtube-video-id
    title: project title, venue, and date
    caption: "video by [videographer name](https://example.com)"
```

without `caption`, the video title is shown below the player. project videos use this YAML list; recent + upcoming uses the inline video include described below.

photographs within the writing use named front-matter objects, such as `notes_photo` or `workshop_photo`. add a `caption` to that object:

```yaml
workshop_photo:
  src: /images/undoingworkshopsitephoto.jpeg
  alt: a description of the photograph.
  caption: "photo by [jimmy urine](https://mindlessselfindulgence.com)"
```

to insert another photograph this way, give it a named object with `src`, `alt`, and an optional `caption`, then place `{% include photo.html image=page.workshop_photo %}` in the page text, using your object's name.

caption fields do not evaluate liquid expressions. use full `https://` links for credits or relative links for pages on this site. alt text describes the image for people who cannot see it; it stays separate from the visible caption.

for internal markdown links, use jekyll's `relative_url` filter so links also work when the site is hosted under a repository path:

```liquid
[about]({{ '/about/' | relative_url }})
![a description]({{ '/images/my-photo.jpg' | relative_url }})
```

## update engagements or the CV

edit `recent.md` as ordinary markdown below its short front-matter block. introductory paragraphs go before the first year. start each year with `##`, put new years first, and separate updates with blank lines. the layout turns those headings into year columns and keeps them sticky while scrolling. use `###` for any subheadings within a year.

```markdown
## 2027

_september_<br>
a performance of **project title** at [a venue](https://example.com).
```

an italic date at the start of a paragraph is styled as a small date label; `<br>` keeps the date on its own line.

place a video anywhere between updates, with a blank line on either side:

```liquid
{% include video.html id="youtube-video-id" title="project title, venue, and date" caption="video by [name](https://example.com)" %}
```

`id` is the youtube video ID, not its full URL. `title` is required for accessibility. `caption` is optional and supports markdown links; without it, the title appears below the video. move the include to move the video. no iframe HTML or YAML entry is needed. internal links can use `relative_url`, just like other markdown pages.

the imported archive ends in 2025; no new engagements have been invented. historical quotations and credits retain the wording of the original site.

to replace the CV, upload a PDF into `documents/`, then update the link and year in `cv.md`. the existing contact address is retained in `_config.yml`.

## run locally on yr own computer

use ruby 3.3 or later and bundler:

```sh
bundle install
bundle exec jekyll serve --livereload
```

changes to page text, images, styles, and templates rebuild automatically. restart the server after changing `_config.yml`.

## publish on github pages

in the repository's settings → pages, choose github actions as the source. the included workflow builds pull requests, then builds and deploys changes pushed to `main`. enable pages before running the workflow.

for a custom domain, set it in pages settings, configure DNS, and add a root `CNAME` file containing the domain. the workflow supplies `url` and `baseurl` automatically from github pages, including custom domains. for builds outside that workflow, set `url` in `_config.yml` to the published `https://…` origin and `baseurl` to any hosting subpath.

## link previewz

project previews use their `image` and `image_alt` settings. pages without a photograph use `social_image` and `social_image_alt` from `_config.yml`. a page can override its preview without changing its visible photograph by setting `social_image` and `social_image_alt` in its front matter. keep the default image dimensions in `_config.yml` in sync if replacing the default photograph.

_note:_ preview services cache results and decide how to crop and display images; changes may not appear immediately after deployment.

## design and assets

- atkinson hyperlegible next is self-hosted, including italics, with a variable 200–800 weight range. its extra-light 200 weight is used for large headings; body copy stays at 400.
- font license: `src/assets/fonts/OFL.txt` (SIL open font license).
- light and dark colors follow `prefers-color-scheme`, including changes made while the page is open. dark mode uses pure black. hot-pink accents use darker magenta for readable links on light backgrounds. palette values are at the top of `src/_sass/_site.scss`.
