# Divertly — Positioning & Launch Messaging

**Purpose:** the source document for the launch-day marketing website. It defines the category, the positioning statement, the messaging hierarchy, the customer personas, the use cases, the competitive framing, objection handling, and a section-by-section homepage flow with draft copy.

**Strategic decisions this document is built on (locked):**
- **Audience:** developers and infrastructure teams *only*. No marketing-team messaging on the launch site.
- **Hero:** category-led, not anchored on a single use case. The headline sells the *thing* (programmable link routing); individual use cases are supporting sections.
- **Pricing model:** usage-metered as a value/segmentation lever, unlimited routes and targets, API available on the free tier, seats de-emphasized. (See pricing section.)
- **Reliability posture:** no contractual SLA is offered until the platform migrates off the current home connection to a VPS/CSP. SLA-tier copy is gated until then.

> **A note on honesty in the copy.** Everything in this document is written to be true at launch. Where a capability is not yet live, it is marked `[ROADMAP]` and must not appear on the site as if it ships day one. Do not import the "39% higher CTR" / "24% higher trust" statistics from the older marketing deck onto this site without a verifiable, linkable source — for a developer audience, an unsourced stat costs more trust than it buys.

---

## 1. Category & one-line positioning

Because the hero is category-led, the single most important words on the entire site are the category line. **Locked:**

> **Programmable link routing.**
> Point one short link at many destinations. Weight them, fail over between them, reroute them by API — all on your own domain.

Use this exact line consistently across the hero, the meta title, and social cards. Rationale: it leads with the differentiated concept ("one link → many destinations") in plain language, then lists the infra verbs (weight, fail over, reroute) that signal this is not a marketing shortener; "programmable" earns the developer audience and "on your own domain" cues the BYO-domain strength.

### Formal positioning statement (internal — not website copy)

> For **developers and infrastructure teams** who need to control where their links and short URLs send traffic, **Divertly** is **programmable link-routing infrastructure** that turns any link into a multi-target route you can weight, fail over, and reroute by API on your own domain.
>
> Unlike **marketing link tools** (Bitly, Short.io, Rebrandly, Dub), which treat multi-destination routing as a campaign A/B feature, and unlike **DNS/load-balancer products** (Route 53, Cloudflare Load Balancing), which only route infrastructure you already own, Divertly is a routing layer for **any destination you can reach by URL** — with no link caps and no cloud account required.

---

## 2. Messaging hierarchy

One headline claim, four supporting pillars. Everything on the site should ladder up to one of these.

**Headline claim:** *One link, many destinations — routing you control by API.*

**Pillar 1 — Multi-target routing is the primitive, not a feature.**
Every Divertly route can point at many targets with a selection method. Round-robin and weighted selection ship at launch. `[ROADMAP]` geo- and device-based selection.
*Message:* "A route is one-to-many by default. Distribute, weight, and fail over from a single link."

**Pillar 2 — API-first and programmable.**
The public API ships at launch, with SDKs for JavaScript, Go, and Python plus a plain HTTP/curl interface. Create, update, and reroute links from code, not a dashboard.
*Message:* "Everything the dashboard does, the API does. Wire routing into your own product or pipeline."
*Note:* given the founder's background, the Go SDK is worth featuring prominently. Confirm all four examples are published before launch (see open items).

**Pillar 3 — Bring your own domain, done right.**
Delegate the nameservers of a dedicated link domain to Divertly and get instant subdomains, automatic wildcard SSL, and zero per-link registrar fiddling. Plain CNAME/A custom domains are also supported for teams that keep DNS elsewhere.
*Message:* "Delegate your link domain once. Every subdomain and certificate, handled."

**Pillar 4 — No link caps. Usage-based pricing.**
Routes and targets are unlimited on every paid plan. You're metered on traffic served, not on how many links you create.
*Message:* "Create as many routes and targets as you want. Pay for traffic, not for links."

---

## 3. Customer personas (developers / infra only)

Three personas. Each is written as: who they are, the job they're trying to do, the pain today, and what Divertly gives them. These map directly to the use cases in section 4.

### Persona 1 — The platform / DevOps engineer
- **Who:** owns how traffic reaches services; thinks in canaries, rollouts, and failover.
- **Job-to-be-done:** shift, split, and fail over traffic to endpoints they may not fully control, without code changes or redeploys.
- **Pain today:** doing this at the link/URL layer means hand-rolling redirect logic, or bending a DNS/load-balancer product to route things that aren't their own origins.
- **What Divertly gives them:** weighted cutover, instant rollback, and automatic failover as first-class routing primitives, controllable by API.
- **Primary use cases:** canary/gradual cutover, failover routing.

### Persona 2 — The product engineer (SaaS / API company)
- **Who:** builds the product; needs links generated and managed programmatically at scale, often one per customer or per record.
- **Job-to-be-done:** embed link creation and routing into their own application and generate links in bulk without hitting a cap.
- **Pain today:** marketing link tools cap link counts and price per link; rolling their own means owning SSL, abuse handling, and uptime.
- **What Divertly gives them:** an API-first service with unlimited routes, usage-based pricing, and the operational burden (SSL, domains, abuse) handled.
- **Primary use cases:** programmatic / bulk link generation, branded links on their own domain.

### Persona 3 — The technical founder / small engineering team
- **Who:** has registered a dedicated domain for links and wants infrastructure-grade routing without building or self-hosting it.
- **Job-to-be-done:** get production routing live fast, evaluate by trying it, and not babysit infrastructure.
- **Pain today:** the choice is between a marketing tool that's the wrong shape, self-hosting (Shlink) and owning the maintenance, or building on Cloudflare Workers and owning all of it.
- **What Divertly gives them:** a hosted, API-first router with a genuinely useful free tier and clean domain delegation, so there's nothing to operate.
- **Primary use cases:** all of them, at smaller scale; evaluation via the free tier is the entry point.

> **Deliberately excluded:** marketing teams, social-media managers, and "business owner / non-technical" personas from the earlier deck. They are real potential users, but putting them on the launch site dilutes the developer/infra positioning and pits you directly against tools that out-feature you for marketers. Keep the site single-minded.

---

## 4. Use cases (the supporting sections)

Since there's no single hero use case, these carry the homepage. Order them by how clearly they signal "infrastructure." Each includes the honest "why not the obvious alternative" so the copy survives a skeptical engineer.

### Canary & gradual cutover
Send a small percentage of a link's traffic to a new endpoint, ramp it up as confidence grows, roll back instantly by changing weights. *Why Divertly:* canary semantics at the link layer, by API, for destinations you don't necessarily own.

### Failover routing
Route to a primary target; when it's unhealthy, traffic goes to a backup. *Why Divertly:* failover for any URL destination, without standing up a load balancer in front of infrastructure you control. *Note:* be precise in copy about detection/health-check behavior and switchover timing — claim only what's actually implemented at launch.

### Release & mirror distribution
Distribute downloads or release artifacts across multiple mirrors or CDNs with round-robin or weighted selection, and repoint them without shipping a new build. *Why Divertly:* change where a published link points after it's already in the wild.

### Programmatic & bulk link generation
Generate links — one per customer, per tenant, per record — directly from your application via the API, with no cap on how many you create. *Why Divertly:* unlimited routes plus usage pricing make per-entity links viable instead of cost-prohibitive.

### Split testing as experiment routing
Run weighted splits across destinations and read the results. *Framing note:* present this as *experiment routing*, not "marketing A/B," to stay in the infra voice. This use case overlaps most with marketing tools, so keep it secondary.

### Vendor / provider migration
Move traffic from one provider or endpoint to another gradually and reversibly by adjusting target weights. *Why Divertly:* a safe, controllable cutover path that doesn't require touching the destinations themselves.

### Branded short links on your own domain
Table-stakes, but required for credibility. Clean delegation, wildcard SSL, instant subdomains. *Why Divertly:* the delegation model makes this the smoothest BYO-domain setup of any option here.

---

## 5. Competitive differentiation framing

How to talk about the landscape truthfully. The honest core: **you are not unique on any single feature — you are differentiated by framing, integration, and pricing fit.** Do not claim to be the only tool that does multi-target routing; that's false and checkable.

| You'll be compared to | What they are | How to position against them (truthfully) |
|---|---|---|
| Bitly, Short.io, Rebrandly | Marketing link platforms; some do A/B/rotation | They treat multi-destination routing as a campaign feature, priced and capped per link. Divertly treats routing as infrastructure: unlimited routes, API-first, usage-priced. |
| Dub.co | Open-source, developer-friendly link *attribution* + affiliate platform | Dub's center of gravity is attribution and partner programs, billed on events. Divertly is routing-centric with simple usage pricing — no event-based attribution billing to reason about. |
| Route 53, Cloudflare Load Balancing | DNS/origin-layer traffic management | They route infrastructure *you already own* at the DNS/origin layer and assume a cloud account and health-checked origins. Divertly routes *any URL destination* at the link layer, with no cloud account to configure. |
| Shlink (self-host), Cloudflare Workers (build) | Free, self-hosted / DIY | You could run it yourself — and then you own SSL, domains, abuse handling, uptime, and the routing logic. Divertly is that, hosted, with an API. |

**Honesty guardrails for competitive copy:**
- No naming-and-shaming competitors by name on the site unless you can back every claim. Comparison pages are fine if accurate.
- Don't claim "the only" anything. The defensible claims are about *how it's framed and priced*, not exclusivity.

---

## 6. Objection handling (becomes the FAQ / "why not just…" section)

These are the real objections a developer will have. Answer them head-on; engineers reward candor.

**"Why not just build this on Cloudflare Workers / nginx?"**
You can. You'd then own SSL provisioning, custom-domain handling, abuse and phishing mitigation, analytics storage, uptime, and the multi-target selection logic. Divertly is that infrastructure so you don't maintain it. *(This is honest and it's your strongest answer — lead with it.)*

**"Why not Route 53 or Cloudflare Load Balancing?"**
Those route infrastructure you own, at the DNS/origin layer, and expect health-checked origins and a cloud account. Divertly routes any destination you reach by URL, at the link layer, with an API and your own link domain — no cloud account, no origin config.

**"How is this different from Dub?"**
Dub is excellent at link *attribution* and affiliate/partner programs, billed on events. Divertly is about *routing* — weighting, failover, cutover — with flat usage-based pricing. Different job, different bill.

**"Is it reliable enough for production?"**
*Honest launch answer, gated:* be measured. Until the platform is on production-grade infrastructure, do not advertise an SLA. Frame the free and entry tiers as ideal for non-critical and evaluation use; introduce SLA-backed tiers only after migration. Over-promising reliability to the one audience that checks is the fastest way to lose them.

**"What happens to my links if I leave?"**
Plain, honest answer about export and that delegated domains are yours to re-point. (Confirm export tooling exists before promising it.)

---

## 7. Trust & proof elements (pre-launch reality)

You don't have customers or uptime history yet, so build trust with substance, not theater:
- **Live API docs** and a quickstart that works in under five minutes. For this audience, docs *are* marketing.
- **Transparent pricing** on the site (no "contact us" for the entry tiers).
- **A code snippet in the hero** showing a real `create route` call.
- **A status page** — but only once you've migrated off the home connection and it can tell the truth.
- **Do not** use placeholder customer logos, invented testimonials, or unsourced statistics. A developer audience treats these as red flags.
- **Open-core signal:** the supporting tools and the DNS server will be open-sourced; the core routing services will not. This is a legitimate, honest trust signal for this audience — but frame it precisely as "open-source tools and DNS server," never as "open-source infrastructure," to avoid implying the whole platform is open (it isn't, unlike Dub or Shlink).

---

## 8. Voice & tone

- Precise and concrete. Show the API call. Name the selection methods. Avoid adjectives that don't carry information.
- No growth-marketing hype ("supercharge," "unleash," "revolutionary"). 
- Lead with verbs an engineer recognizes: route, weight, split, fail over, reroute, delegate.
- Sentence-level honesty: if it's coming soon, say "coming soon," don't imply it ships.
- Short. Engineers scan. One idea per section, backed by a snippet or a diagram.

---

## 9. Draft homepage section flow

Hand this to a designer or site builder as the page skeleton, top to bottom.

**1. Hero**
- Headline: "Programmable link routing."
- Subhead: "Point one short link at many destinations. Weight them, fail over between them, reroute them by API — all on your own domain."
- Primary CTA: "Start free" · Secondary: "Read the API docs"
- Visual: a short, real code snippet creating a multi-target route (see below).

**2. The concept in one glance — "How a route works"**
- A simple diagram: one Route (`go.acme.dev/launch`) → multiple Targets, with a selection method (round-robin / weighted) in the middle, and a "change by API" callout. Keep it to one route, 2–3 targets.

**3. Use-case grid**
- 4–6 cards from §4: Canary & cutover, Failover, Release/mirror distribution, Programmatic links, (Experiment routing, Vendor migration). Each card: one-line problem + one-line "how Divertly does it."

**4. Why Divertly, not X**
- The honest comparison framing from §5, condensed: "Not a marketing tool. Not a DNS load balancer. Not another thing to self-host."

**5. Bring your own domain**
- The delegation story (Pillar 3). Emphasize instant subdomains + automatic SSL + no registrar fiddling.

**6. Pricing**
- The tier table from §10. Lead with "Unlimited routes and targets. Pay for traffic." Entry prices visible.

**7. Developer section**
- API docs link, quickstart, SDKs for JavaScript, Go, and Python (plus HTTP/curl), and a second, slightly richer snippet (e.g. updating target weights for a canary ramp). Lead the SDK list with Go.

**8. FAQ**
- The objections from §6, especially "why not build it yourself" and the honest reliability answer.

**9. Final CTA**
- "Start free — no credit card." Reinforce: API on the free tier, no link caps.

### Draft hero snippet (illustrative — confirm against real API shape before publishing)

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

*Caption idea:* "Shift 10% of traffic to a canary. Ramp it, or roll it back, with one API call."

---

## 10. Pricing on the site

Carry over the model we settled on. Numbers are anchors to test, not settled — flag internally that bucket sizes and the Dev price point need real data.

| Tier | Price (anchor) | Domains | Redirects / mo | API | Selection | Retention | Reliability |
|---|---|---|---|---|---|---|---|
| Free | $0 | shared `dvt.fyi` | generous, capped | rate-limited | round-robin + weighted | short | best-effort |
| Dev | ~$15–25 | 1 delegated | high | full rate limits | round-robin + weighted | 90 days | best-effort |
| Team | ~$50–99 | several delegated | very high | full | + RBAC `[ROADMAP]` | 1 year | SLA target* |
| Scale | ~$200–400 | many delegated | very high | full | + geo/device `[ROADMAP]` | multi-year | meaningful SLA* |
| Custom | committed | custom | committed-use | full | all | custom | contractual SLA* |

*Routes and targets are **unlimited** on every paid plan. \*All SLA language is gated until migration off the current connection.*

**Pricing copy principles:**
- Lead with "Unlimited routes and targets. Pay for traffic, not links."
- Keep the API on Free (rate-limited). Make this explicit — it's a differentiator vs. tools that gate the API behind high tiers.
- Don't price per seat.
- Don't show SLA promises on Team/Scale until the infrastructure can keep them.

---

## 11. Open items

**Resolved (baked into this document):**
- **Category headline** — locked to "Programmable link routing" (§1).
- **SDK / example set** — JavaScript, Go, Python, and HTTP/curl; Go featured (§2, §9). Confirm all four are actually published before launch.
- **Open-source posture** — tools and DNS server open-sourced, core services proprietary; framed as "open-source tools and DNS server," not "open-source infrastructure" (§7).

**Still open before the site goes live:**
- **Confirm failover detection/timing behavior** actually implemented, so the failover use-case copy is truthful.
- **Instrument per-account redirect volume** — required before any pricing number (bucket sizes, Dev-tier price) is more than a guess.
- **Verify residential ISP terms / migration plan** before taking paying customers, and keep all SLA copy off the site until migrated.
- **Do not reuse the deck's "39% / 24%" stats** without a verifiable, linkable source.
- **Write the migration trigger down** (e.g. "no SLA-tier or DNS-delegation customer before migration") and reflect it in which tiers are purchasable at launch vs. "contact us."

---

*This document reflects the positioning, audience, and pricing decisions made in the strategy conversation it came from. Figures marked as anchors and items marked `[ROADMAP]` are explicitly unverified or not-yet-shipped and must be confirmed before they appear as fact on a live site.*
