# RSS Feed Removal Guide

This guide outlines the steps to remove RSS functionality and links from the site.

## Overview

To completely remove RSS feeds, you need to:
1. Remove footer links
2. Remove RSS link from HTML head
3. Disable RSS output in Hugo config
4. Remove Netlify redirects
5. (Optional) Delete RSS template

---

## Step 1: Remove Footer Links

**File:** `themes/bloggin/layouts/partials/footer.html`

**Original:**
```html
<footer>
    <ul class="footer-links">
        <li>&#169;2014-{{ dateFormat "2006" now }} Winston Hearn</li>
        <li><a href="/wrote/index.xml">RSS (posts only)</a></li>
        <li><a href="/index.xml">RSS (all content)</a></li>
        <li><a href="https://github.com/wnstn/">github</a></li>
        <li><a href="https://twitter.com/suchwinston/">@suchwinston</a></li>
        <li><a href="mailto:hello+blog@wnstn.com">hello@wnstn.com</a></li>
    </ul>
```

**Final:**
```html
<footer>
    <ul class="footer-links">
        <li>&#169;2014-{{ dateFormat "2006" now }} Winston Hearn</li>
        <li><a href="https://github.com/wnstn/">github</a></li>
        <li><a href="https://twitter.com/suchwinston/">@suchwinston</a></li>
        <li><a href="mailto:hello+blog@wnstn.com">hello@wnstn.com</a></li>
    </ul>
```

---

## Step 2: Remove RSS Link from HTML Head

**File:** `themes/bloggin/layouts/partials/head.html`

**Original:**
```html
  {{ partial "head-json-ld.html" }}

  {{ with .OutputFormats.Get "rss" -}}
  {{ printf `<link rel=%q type=%q href=%q title=%q>` .Rel .MediaType.Type .Permalink site.Title | safeHTML }}
  {{ end }}

  {{ with resources.Get "scss/makeup.scss" }}
```

**Final:**
```html
  {{ partial "head-json-ld.html" }}

  {{ with resources.Get "scss/makeup.scss" }}
```

---

## Step 3: Disable RSS Output in Hugo Config

**File:** `config.toml`

**Original:**
```toml
[services]
  [services.rss]
    limit = 20

[outputs]
  home = ['html', 'rss']
  section = ['html', 'rss']
  taxonomy = ['html']
  term = ['html']
```

**Final:**
```toml
[outputs]
  home = ['html']
  section = ['html']
  taxonomy = ['html']
  term = ['html']
```

*Note: The `[services.rss]` section can be removed entirely or left commented out.*

---

## Step 4: Remove Netlify Redirects

**File:** `netlify.toml`

**Original:**
```toml
[dev]
framework = "hugo"


[[redirects]]
from="/rss/"
to="/wrote/index.xml"
[[redirects]]
from="/feed.xml"
to="/wrote/index.xml"
[[redirects]]
from="/late-2018-reading-list/"
```

**Final:**
```toml
[dev]
framework = "hugo"


[[redirects]]
from="/late-2018-reading-list/"
```

---

## Step 5: (Optional) Delete RSS Template

**File:** `themes/bloggin/layouts/_default/rss.xml`

This file can be deleted entirely. Hugo won't generate RSS feeds if RSS is not included in the `[outputs]` configuration, so this template won't be used.

---

## Result

After completing these steps:
- ✅ No RSS links in the footer
- ✅ No RSS link in the HTML `<head>`
- ✅ Hugo won't generate RSS XML files
- ✅ Old RSS URLs (`/rss/`, `/feed.xml`, `/wrote/index.xml`, `/index.xml`) will return 404 errors

**Note:** If you want to redirect old RSS URLs to the homepage instead of 404, you can add redirects in `netlify.toml`:
```toml
[[redirects]]
from="/rss/"
to="/"
[[redirects]]
from="/feed.xml"
to="/"
[[redirects]]
from="/wrote/index.xml"
to="/"
[[redirects]]
from="/index.xml"
to="/"
```

