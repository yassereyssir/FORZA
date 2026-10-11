/* ==========================================================
   CATEGORIES & PRODUCTS - the whole catalogue lives here.

   To add a new category (e.g. when a new maker is found):
   1. Add an entry to CATEGORIES with status "live" (or "soon" to tease it).
   2. Add its products to PRODUCTS with the same category id.
   Run the new-category checklist in the site plan before going live.

   Only list original designs - never copies of known characters or logos.
   Only use your own photos (put files in /images).
   ========================================================== */
window.CATEGORIES = [
  {
    id: "sculpture",
    name: "Statement sculpture",
    status: "live",                     // live | soon
    image: "Test-1.HEIC",
    priceBand: "Typically £[X]-£[Y]",
    maker: "Fibreglass studios in Egypt",
    intro: "Life-size fibreglass figures and animals for gardens, homes and venues. Weatherproof finishes in any colour."
  },
  {
    id: "decor",
    name: "Décor and planters",
    status: "live",
    image: "Test-2.jpg",
    priceBand: "Typically £[X]-£[Y]",
    maker: "Fibreglass studios in Egypt",
    intro: "Oversized planters and sculptural décor that turn a corner into a feature. Sold singly or as sets."
  },
  {
    id: "furniture",
    name: "Omars a wanker",
    status: "live",
    image: "",
    priceBand: "Quoted to your spec",
    maker: "Furniture workshops in Egypt",
    intro: "Tables, seating and display pieces made to your drawings or brief."
  },
  {
    id: "lighting",
    name: "LED lighting",
    status: "soon",
    image: "",
    priceBand: "",
    maker: "",
    intro: "Custom signs, neon-style pieces and lamps for homes, shops, weddings and events. Built for UK plugs."
  }
];

window.PRODUCTS = [
  {
    id: "statement-figure", category: "sculpture", name: "Statement figure", image: "", priceFrom: null,
    specs: { Dimensions: "1m / 1.5m / 2m tall", Material: "Fibreglass, hand-finished", Finish: "Gloss lacquer, any colour", Use: "Indoor or outdoor" },
    leadTime: "[X-Y] weeks",
    description: "A bold, life-size figure that anchors a room, garden or venue entrance. Made to order in your choice of colour."
  },
  {
    id: "animal-sculpture", category: "sculpture", name: "Animal sculpture", image: "", priceFrom: null,
    specs: { Dimensions: "1m / 1.5m tall", Material: "Fibreglass, hand-finished", Finish: "Weatherproof paint", Use: "Garden or indoor" },
    leadTime: "[X-Y] weeks",
    description: "Oversized animal pieces in bright, weatherproof finishes. A favourite for gardens, play spaces and café terraces."
  },
  {
    id: "oversized-planter", category: "decor", name: "Oversized planter", image: "", priceFrom: null,
    specs: { Dimensions: "80cm / 1.2m tall", Material: "Fibreglass", Finish: "Gold, matte or custom colour", Use: "Indoor or outdoor" },
    leadTime: "[X-Y] weeks",
    description: "Sculptural planters that turn a single plant into a feature. Sold singly or as a set."
  },
  {
    id: "custom-table", category: "furniture", name: "Made-to-measure table", image: "", priceFrom: null,
    specs: { Dimensions: "Made to your measurements", Material: "To your brief", Finish: "To your brief", Use: "Indoor" },
    leadTime: "[X-Y] weeks",
    description: "Dining, coffee or display tables made to your drawings by our partner workshops."
  }
];
