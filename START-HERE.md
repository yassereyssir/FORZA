# Start here: put your website online in about 15 minutes

No coding needed. You only need a web browser and a free GitHub account.

## 1. Unzip the folder
Double-click `website.zip`. You'll get a folder with files like `index.html`, `shop.html` and an `assets` folder.

## 2. Make your edits (5 minutes)
Open these two files in any text editor (TextEdit on Mac: Format > Make Plain Text; Notepad on Windows):

- `assets/config.js` - change `[BRAND]` to your brand name and put in your WhatsApp number (e.g. `447912345678`, no + or spaces).
- `assets/products.js` - your categories and products. You can leave the examples for now.

Save both files. You can do the Formspree ID later (step 7).

## 3. Create a GitHub account
Go to https://github.com and sign up (free). Verify your email.

## 4. Create a repository (a folder for your site)
1. Click the **+** in the top right, then **New repository**.
2. Name it, e.g. `my-website`.
3. Choose **Public**.
4. Tick **Add a README file**.
5. Click **Create repository**.

## 5. Upload your files
1. In your new repository, click **Add file > Upload files**.
2. Open your unzipped folder, select **everything inside it** (not the folder itself) and drag it into the browser window. Make sure the `assets` and `images` folders come too.
3. Scroll down and click **Commit changes**.

Tip: on a Mac, press Cmd+Shift+. in Finder to show the hidden `.nojekyll` file so it uploads too. If it doesn't upload, the site still works.

## 6. Switch the website on
1. In the repository, click **Settings** (top menu).
2. In the left menu, click **Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
4. Wait 1-2 minutes and refresh. A link appears at the top: `https://your-username.github.io/my-website/`. That's your live site.

## 7. Make the quote form send you emails
1. Go to https://formspree.io and sign up (free).
2. Click **New form**, name it "Website quotes" and use your email.
3. Copy the form ID - the code after `/f/` in the address it shows (e.g. `xyzabcd`).
4. Back on GitHub, open `assets/config.js`, click the pencil icon, replace `YOUR_FORM_ID` with your code, then **Commit changes**.
5. Wait a minute, then send yourself a test quote from the live site.

## 8. Changing things later
- To edit any file: open it on GitHub, click the **pencil icon**, edit, then **Commit changes**. The site updates within a minute or two.
- To add photos: open the `images` folder on GitHub, **Add file > Upload files**, then type the file name (e.g. `planter.jpg`) into that product's `image` in `assets/products.js`.
- To add a new category: copy one block in `CATEGORIES` in `assets/products.js`. Use `status: "soon"` to tease it, `"live"` when it has products.

## 9. Your own domain (optional, about £10 a year)
1. Buy a `.co.uk` domain from a registrar (e.g. Namecheap, 123 Reg, Cloudflare).
2. On GitHub: **Settings > Pages > Custom domain**, type your domain, **Save**.
3. At your registrar, add the DNS records GitHub lists (four `A` records and one `CNAME` for `www`). Your registrar's help pages show where.
4. After it connects (can take a few hours), tick **Enforce HTTPS**.

## Stuck?
- Page shows without styling: the `assets` folder didn't upload. Upload it again.
- 404 error: check step 6 and wait a few more minutes.
- Form says "isn't connected yet": the Formspree ID in `config.js` is still `YOUR_FORM_ID`.
