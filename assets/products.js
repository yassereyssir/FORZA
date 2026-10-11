/* ==========================================================
   CATEGORIES & PRODUCTS - the whole catalogue lives here.

   CATEGORIES
   - status: "live" shows it, "soon" shows it as coming soon
   - image: a file in /images (e.g. "statues.jpg"). If the file
     isn't uploaded yet, a plain colour panel shows instead.

   PRODUCTS
   - A product only appears once it has an image. That keeps
     the site free of empty "photo coming soon" boxes.
   - specs: any labels you like, e.g. Power: "UK plug" for lights.

   Only list original designs, and only use your own photos.
   ========================================================== */
window.CATEGORIES = [
  {
    id: "statues",
    name: "Statues",
    status: "live",
    image: "statues.jpg",
    priceBand: "Usually £250 to £1,000",
    intro: "Large fibreglass figures and animals, finished and painted by hand. They work indoors or out, and we can make them in your colours."
  },
  {
    id: "furniture",
    name: "Furniture",
    status: "live",
    image: "furniture.jpg",
    priceBand: "Priced to your design",
    intro: "Tables, seating and display pieces made to your measurements. Send us a drawing, a photo or a rough idea."
  },
  {
    id: "decor",
    name: "Décor and planters",
    status: "live",
    image: "decor.jpg",
    priceBand: "Usually £250 to £800",
    intro: "Big planters and decorative pieces that make a corner, a doorway or a terrace feel finished."
  },
  {
    id: "lighting",
    name: "LED lighting",
    status: "live",
    image: "lighting.jpg",
    priceBand: "Priced to your design",
    intro: "Custom light-up signs, neon-style pieces and lamps for homes, shops, weddings and events. Made for UK plugs."
  }
];

window.PRODUCTS = [
  /* Example - add an image to make it appear:
  {
    id: "garden-lion",               // unique, no spaces
    category: "statues",             // must match a category id
    name: "Garden lion",
    image: "garden-lion.jpg",        // file in /images
    priceFrom: 450,                  // or null for "Ask for a price"
    leadTime: "6-8 weeks",
    description: "A life-size lion for a garden or entrance, finished in weatherproof paint.",
    specs: { Height: "1.2m", Material: "Fibreglass", Finish: "Any colour", Use: "Indoor or outdoor" }
  },
  */
];
