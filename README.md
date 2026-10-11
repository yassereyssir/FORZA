# [BRAND] website

Static website: a UK storefront for Egyptian makers, organised by category so new products and manufacturers can be added without a redesign. Quote-then-deposit model. Plain HTML, CSS and JavaScript - no build step, hosted free on GitHub Pages.

## What's where

| File | What to edit |
| --- | --- |
| `assets/config.js` | Brand name, WhatsApp number, Formspree form ID, reply time, lead time |
| `assets/products.js` | Categories and products - the whole catalogue lives here |
| `images/` | Product and hero photos (your own photos only) |
| `*.html` | Page copy (Home, Shop, Category, Product, For businesses, Commission and sourcing, Our makers, How it works, Quote, FAQ, Legal) |
| `assets/styles.css` | Colours, fonts and layout (tokens at the top) |

## Put it online with GitHub Pages

Step-by-step version for non-coders: see `START-HERE.md`.

1. Create a free account at github.com and a new **public** repository (e.g. `brand-website`).
2. Upload everything in this folder (drag and drop on the repo page, then **Commit changes**). Keep `.nojekyll`.
3. In the repo go to **Settings > Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

### Use your own domain (optional, about £10 a year)

1. Buy a `.co.uk` domain from any registrar.
2. In **Settings > Pages > Custom domain**, enter it and save (GitHub adds a `CNAME` file).
3. At your registrar, add the DNS records GitHub shows (four `A` records for the root domain and a `CNAME` for `www`).
4. Tick **Enforce HTTPS** once it's available.

## Connect the quote form

GitHub Pages can't receive form submissions itself, so the form posts to Formspree (free tier is enough to start).

1. Sign up at formspree.io and create a form. Copy its ID (the part after `/f/`).
2. Paste it into `formspreeId` in `assets/config.js`.
3. Send a test request from the live site and confirm the email arrives.

## Add a product or a whole new category

All catalogue changes happen in `assets/products.js`:

- **New product:** copy a block in `PRODUCTS`, give it a new `id`, set `category` to an existing category id, and fill in `specs` (any labels you like - e.g. add `Power: "UK plug, 230V"` for lighting). Put its photo in `images/`.
- **New category:** add an entry to `CATEGORIES`. Use `status: "soon"` to tease it on the home and shop pages, then switch to `"live"` once its products are added. It automatically gets a category page, a filter on the shop page and an option in the quote form.
- **Our makers:** add a card to `makers.html` (craft and city only - no names or contact details).

Before a category goes live, run the new-category checklist in the site plan (maker vetted, UK rules checked, test shipment, own photos, margin).

Only list original designs. Don't upload copies of known characters, logos or branded products, and don't reuse photos from suppliers' social media.

## New arrivals signup

The signup form posts to the same Formspree form with a hidden field `form=new-arrivals`, so you can filter signups from quote requests. When the list grows, move it to a newsletter tool.

## Before launch

- [ ] Brand name in `config.js` and in the page titles
- [ ] Real WhatsApp number and Formspree ID
- [ ] Real photos, prices, sizes and lead times
- [ ] Terms, privacy and delivery text in `legal.html`, checked by a solicitor
