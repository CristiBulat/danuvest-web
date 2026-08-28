# Icon map

The site used emoji as its icon system. Emoji render differently on every
operating system, cannot be brand-coloured, and read as consumer-casual rather
than professional — the wrong register for a contractor's website.

They were replaced by `src/components/Icon.astro`, which inlines an SVG. No
icon font, no runtime JavaScript, no network request. Colour is inherited via
`currentColor`, so icons pick up the gold accent from CSS.

## Usage

```astro
---
import Icon from '../components/Icon.astro'
---
<Icon name="crane" />
<Icon name="phone" size={22} class="contact-action-icon" />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | string | — | Required. Unknown names **throw at build time**. |
| `size` | number | `20` | Sets both width and height. |
| `class` | string | — | Passed through to the `<svg>`. |

Icons render with `aria-hidden="true"`, because every current usage sits next to
a visible text label. If you ever use one as the *only* content of a control,
give that control an `aria-label`.

**Failing loudly on an unknown name is deliberate.** A silently missing icon on
a CMS-edited site would ship unnoticed. To keep an editor from ever triggering
that, the `icon` fields in `public/admin/config.yml` are `select` dropdowns, not
free text — so an invalid name cannot be entered in the first place.

## Migration table

### Services — `src/data/services.json` → `items[].icon`

| Was | Now | Service |
|---|---|---|
| 🏗️ | `crane` | Construcții la Cheie |
| 🏘️ | `homes` | Construcții Rezidențiale |
| 🏢 | `building` | Construcții Comerciale |
| 🔧 | `wrench` | Renovări și Reabilitări |
| 🎨 | `excavator` | Terasamente și Demolări — was *Lucrări de Finisare*, on `brush` |
| 📐 | `ruler` | Proiectare și Consultanță |

### Mission values — *section removed*

The Mission section and `src/data/mission.json` were deleted when the page was
cut down to at most two renders per fact. These three icons still exist in
`Icon.astro` and remain selectable in the Services icon dropdown in
`public/admin/config.yml`, so they are not dead — they simply no longer have a
dedicated section.

| Was | Now | Value it carried |
|---|---|---|
| 🏆 | `trophy` | Calitate |
| 🤝 | `handshake` | Integritate |
| ⚡ | `bolt` | Profesionalism |

### Contact + footer — `contact.json` → `info[].icon`, `footer.json` → `contactItems[].icon`

| Was | Now | Meaning |
|---|---|---|
| 📍 | `pin` | Address |
| 📞 | `phone` | Telephone |
| ✉️ | `mail` | Email |
| 🕐 | `clock` | Opening hours |

### Hero trust marks — *removed*

The hero's `trust[]` bullets were deleted: they restated the subtitle above them
and the CTA label below them. `check` still exists in `Icon.astro` and remains
selectable in the Services icon dropdown.

| Was | Now |
|---|---|
| `✓` (literal text) | `check` |

### Footer social — `footer.json` → `social[].icon`

The old markup rendered two-letter text labels (`fb`, `ig`, `in`) inside round
buttons. These are now brand glyphs: `facebook`, `instagram`, `linkedin`.

> The social block is **commented out** in `Footer.astro`: all three `href`
> values are still `"#"`. Dead social icons read as an abandoned company.
> Add real profile URLs to `footer.json`, then uncomment the block.

### Direct contact buttons — `contact.json` → `actions[].icon`

New in this version; these replaced the contact form.
`phone`, `whatsapp`, `viber`, `mail`.

### Interface

| Name | Used for |
|---|---|
| `arrow-right` | Trailing arrow on the primary hero CTA. It used to be a literal `→` typed into the JSON label. |
| `menu`, `close` | Available for the mobile navigation toggle (which currently animates three CSS bars). |

### Dropped with their features

| Was | Where | Why it's gone |
|---|---|---|
| 🏗️ | Mobile welcome banner | Banner removed — it told users to scroll. |
| 👋 | Mascot speech bubble | Mascot removed. |
| ✅ | Form success panel | Contact form removed; it discarded enquiries. |

## Full icon set

`crane` · `excavator` · `homes` · `building` · `wrench` · `brush` · `ruler` ·
`trophy` · `handshake` · `bolt` · `pin` · `phone` · `mail` · `clock` ·
`check` · `facebook` · `instagram` · `linkedin` · `whatsapp` · `viber` ·
`arrow-right` · `menu` · `close`

Outline icons are adapted from [Lucide](https://lucide.dev) (ISC licence);
brand marks from [Simple Icons](https://simpleicons.org) (CC0-1.0). `crane` and
`excavator` are hand-authored — neither set has an equivalent, and a generic
tool icon on an earthworks service reads as maintenance.

`brush` is still in the set and still selectable, but no section uses it since
finisajele were replaced by terasamente.

## Adding an icon

1. Add the entry to the `ICONS` map in `src/components/Icon.astro`
   (24×24 viewBox, `currentColor`, round linecap/linejoin).
2. Add the name to the relevant `options:` list in `public/admin/config.yml`,
   or editors will not be able to select it.
3. Add a row to this table.
