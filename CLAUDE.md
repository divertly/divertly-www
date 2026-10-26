# Divertly's 2026 Launch-Day Website

Creating a fully-fledged website for Launch Day 2026. This site will be published via Cloudflare Pages and should be pre-rendered and static at commit time.

# Project Layout

The public-facing site lives in `./dist` -- everything that should _NOT_ be publicly available should live outside that folder. `dist` will be the root of the site, so links within the directly may be relative. 

Images, css, js, etc. may be put in their separate directories under `dist` to keep things organized.

The `resources` directory contains various resources to draw copy, design elements, etc. from.

# Site Layout

* Home Page -- The first page people see. This page should give a good overview of the product, what it does, who uses it, and where to go to get started. This page should have CTA's at the top, midpoint, and bottom of the page that go do `app.divert.ly/sign-up` 
* Platform -- Goes into more details about the product, its use cases, and benefits, etc. (target audience: technical champion)
* Solutions -- Details about use cases across various industries and verticals (target audience: executive-level)
* Why Divertly? -- Compare and contrast to competition in the space, making us look good
* Pricing -- Pricing table.
* Resources -- Dropdown with links to docs, support, 
* About Us -- Company bio with photos of Pete and Ben, short personal bios, etc.


# Look & Feel

Maintain the design language of the existing site. Some elements should carry over, like the big interactive routing strategy diagrom that is currently featured at the top of the main page.

# Voice

Website copy should not appear to be written by an LLM. Use the voicing skill that we developed to write the website in a natual syntax, vocabulary, and voicing.

# Conventions
The goal of the site is to drive self-signups; thus, calls-to-action should be placed thruought the entire site, with an emphasis placed on the Free tier as a generous no-risk way to try the platform.

# Important Links

* Sign Up --> https://app.divert.ly/sign-up
* Log In --> https://app.divert.ly/login
* Documentation --> https://docs.divert.ly
* Support --> https://support.divert.ly
