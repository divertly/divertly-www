# Divertly — Launch Website Copy

Paste-ready copy for the launch homepage, in top-to-bottom order. Companion to the positioning document. Voice: precise, concrete, no hype.

> **Build notes** appear in blockquotes like this one. They are guidance for whoever builds the site — **not for publication.**

> **Build note — global:** Per the reliability decision, no SLA promises appear anywhere in this copy until the platform migrates off its current connection. Team/Scale tiers use "Talk to us," not self-serve checkout, until then. Roadmap features (geo/device selection, RBAC) are intentionally absent. Both code snippets must be checked against the real API shape before they go live.

---

## Meta / SEO

- **Page title:** Divertly — Programmable link routing
- **Meta description:** Point one short link at many destinations. Weight traffic, fail over, and reroute by API — on your own domain. No link caps.
- **Social/OG card:** Programmable link routing. One link, many destinations — controlled by API.

---

## 1. Hero

**Eyebrow:** Routing infrastructure for links

**Headline:** Programmable link routing.

**Subhead:** Point one short link at many destinations. Weight them, fail over between them, reroute them by API — all on your own domain.

**Primary CTA:** Start free
**Secondary CTA:** Read the API docs

**Hero code block:**

```bash
curl -X POST https://api.divert.ly/v1/routes \
  -H "Authorization: Bearer $DIVERTLY_TOKEN" \
  -d '{
    "domain": "go.acme.dev",
    "path": "/launch",
    "targets": [
      { "url": "https://app.acme.dev/v2", "weight": 90 },
      { "url": "https://app.acme.dev/v3-canary", "weight": 10 }
    ],
    "selection": "weighted"
  }'
```

**Snippet caption:** Shift 10% of traffic to a canary. Ramp it — or roll it back — with one API call.

---

## 2. How a route works

**Heading:** One route. Many targets. Your selection logic.

**Body:** A route is a domain and path you own — `go.acme.dev/launch`. Instead of pointing it at a single URL, point it at as many targets as you want and choose how traffic is distributed: evenly with round-robin, or by percentage with weighted selection. Change the targets or the weights whenever you need to, by API or in the dashboard. The link out in the wild never changes — only where it sends people.

> **Build note — diagram:** one route box (`go.acme.dev/launch`) on the left → a "selection: weighted" node in the middle → two or three target boxes on the right (`/v2` 90%, `/v3-canary` 10%). Add a small "change by API" callout on the route. Keep it to one route and 2–3 targets.

---

## 3. What you can build

**Heading:** Built for routing, not just shortening.

**Cards:**

**Canary & gradual cutover**
Send 10% of a link's traffic to a new endpoint, watch how it does, ramp to 100% — or roll back instantly by changing the weights. No redeploy.

**Automatic failover**
Route to a primary target and fall back to a backup when the primary is unhealthy, so a dead endpoint doesn't mean a dead link.

**Release & mirror distribution**
Spread downloads across mirrors or CDNs with weighted or round-robin selection, and repoint them after they're already out in the world.

**Links from your code**
Generate links programmatically — one per customer, per tenant, per record — with no cap on how many you create.

**Experiment routing**
Split traffic across destinations by weight and measure what each one does.

**Provider migration**
Move traffic from one provider to another gradually and reversibly, just by shifting weights.

> **Build note:** geo/device-based selection is on the roadmap, not live — keep it out of these cards until it ships.

---

## 4. Why Divertly

**Heading:** Not a marketing tool. Not a DNS load balancer. Not another thing to self-host.

**Not a marketing link tool.**
Marketing shorteners bolt multi-destination routing on as a campaign feature and cap how many links you can make. Divertly treats routing as the core product: unlimited routes and targets, API-first, priced on traffic instead of per link.

**Not a DNS load balancer.**
DNS and origin-layer products route infrastructure you already own, with health-checked origins and a cloud account to configure. Divertly routes any destination you can reach by URL, at the link layer — nothing to set up in a cloud console.

**Not another thing to self-host.**
You could run this yourself on a worker or an open-source shortener — and then you'd own SSL, custom domains, abuse handling, uptime, and all the routing logic. Divertly is that, hosted, with an API.

---

## 5. Bring your own domain

**Heading:** Your domain, handled.

**Body:** Have a domain for your links? Delegate its nameservers to Divertly and every subdomain and SSL certificate is provisioned automatically — no per-link records to add, nothing to renew. Prefer to keep DNS where it is? Point a CNAME at us instead. Either way, your links live on your brand, not ours.

> **Build note:** do not attach uptime or SLA promises to this section before migration.

---

## 6. Pricing

**Heading:** Unlimited routes and targets. Pay for traffic, not links.

**Subhead:** The API is on every plan — including free.

**Plan cards:**

**Free — $0**
Shared `dvt.fyi` domain · round-robin + weighted routing · rate-limited API · a generous monthly redirect allowance.
*CTA:* Start free

**Dev — $20/mo**
Your own domain · full API rate limits · higher redirect allowance · 90-day analytics retention.
*CTA:* Start building

**Team — $79/mo**
Multiple domains · higher allowances · 1-year retention · priority support.
*CTA:* Talk to us

**Scale**
High committed redirect volume · multi-year retention · dedicated support.
*CTA:* Talk to us

**Custom / Enterprise**
Committed-use pricing · compliance · dedicated infrastructure.
*CTA:* Contact sales

**Footer microcopy:** No per-seat pricing. No link caps. Cancel anytime.

> **Build note:** the dollar figures ($20, $79) are anchors pending real redirect-volume and willingness-to-pay data — confirm before they're final. Routes and targets are unlimited on every paid plan. No SLA language until migration.

---

## 7. For developers

**Heading:** Everything the dashboard does, the API does.

**Body:** Create routes, add targets, change weights, and read analytics from code. SDKs for Go, JavaScript, and Python, plus a plain HTTP API you can hit with curl.

**Code block:**

```bash
# Ramp the canary from 10% to 50% — same route, no redeploy
curl -X PATCH https://api.divert.ly/v1/routes/go.acme.dev/launch \
  -H "Authorization: Bearer $DIVERTLY_TOKEN" \
  -d '{
    "targets": [
      { "url": "https://app.acme.dev/v2", "weight": 50 },
      { "url": "https://app.acme.dev/v3-canary", "weight": 50 }
    ]
  }'
```

**CTA:** Read the API docs

> **Build note:** SDK list leads with Go deliberately. Confirm all three SDKs and the documented endpoints exist before publishing.

---

## 8. FAQ

**Is Divertly production-ready?**
Divertly runs its core routing path today and is a strong fit for evaluation and for traffic where a brief interruption is survivable. We're expanding our infrastructure and our reliability commitments as we grow — if you need a formal SLA, talk to us about timing.

**Why not just build this on Cloudflare Workers or nginx?**
You can. The work isn't the redirect — it's everything around it: SSL provisioning, custom-domain handling, abuse and phishing mitigation, analytics, uptime, and the multi-target selection logic. Divertly is that infrastructure so you don't maintain it.

**How is this different from Bitly or Dub?**
Bitly is a marketing link platform. Dub is excellent at link attribution and affiliate programs, billed on events. Divertly is about routing — weighting, failover, cutover — with simple usage-based pricing and no event billing to reason about.

**Do I have to move my DNS to you?**
No. You can delegate a link domain's nameservers to us for the smoothest setup, or just point a CNAME at us and keep DNS where it is.

**How am I billed?**
On redirects served, not on how many links you create. Routes and targets are unlimited; each plan includes a monthly redirect allowance.

**Is any of it open source?**
Our supporting tools and our DNS server are open source. The core routing services are not.

**Can I export my data and leave?**
Yes. Your routes are exportable, and a delegated domain is yours to point elsewhere at any time.

> **Build note:** keep the "production-ready" answer exactly this measured until migration — do not strengthen it into a reliability promise.

---

## 9. Final CTA

**Heading:** Start routing in five minutes.

**Body:** Free to start, API included, no link caps.

**Primary CTA:** Start free
**Secondary CTA:** Read the docs

---

## Footer

**Tagline under logo:** Programmable link routing.

**Suggested columns:**
- Product: How it works · Use cases · Pricing · Bring your own domain
- Developers: API docs · SDKs · Status *(add Status only once it's live and truthful)*
- Company: About · Open source · Contact

> **Build note:** don't list a Status page link until there's a real one, post-migration. Don't add social proof (logos, testimonials, metrics) until you have genuine, attributable examples.
