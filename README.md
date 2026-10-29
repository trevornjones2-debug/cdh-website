# Commercial Door & Hardware website

The public website for Commercial Door & Hardware LLC. It is a static site hosted on GitHub Pages.
All of the wording, photos, projects, team members and contact details live in one file,
`_data/site.yml`, so the site can be updated without touching the page layout.

## Editing the live site (no code)

1. Go to **https://app.pagescms.org** and sign in with the GitHub account that owns this repository.
2. Open this repository, then choose **Website content**.
3. Change any text, add or remove projects and team members, or upload new photos.
4. Click **Save**. GitHub Pages rebuilds the site, and the change is live in about a minute.

Tips:
- Photos look best in a 16:9 shape (for example 1280 × 720). Uploads go into the `images` folder.
- In fields that say "use **bold** for bold", wrap words in two asterisks to make them bold.
- To change where quote requests are emailed, change the inbox in the Web3Forms dashboard (app.web3forms.com).

You can also edit `_data/site.yml` directly on github.com with the pencil icon.

## Quote form

The form sends requests through [Web3Forms](https://web3forms.com) using the access key in
`quote.form_access_key`. Requests are emailed to the inbox on the Web3Forms account
(the address used to sign up). The access key is designed to be public, so no email address appears in the page.

- To change which inbox receives requests, sign in at app.web3forms.com and change it there.
- The free plan covers 250 requests a month.
- A hidden "botcheck" box catches simple spam bots; requests with it ticked are ignored.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Page layout (Jekyll/Liquid template). Reads everything from `_data/site.yml`. |
| `_data/site.yml` | All site content. This is the file editors change. |
| `assets/site.css` | Compiled stylesheet. Do not edit by hand; rebuild it from `dev/`. |
| `assets/quote-form.js` | Sends the quote form and shows the confirmation message. |
| `images/` | Logo and project photos. |
| `.pages.yml` | Field setup for the Pages CMS editor. |
| `dev/` | Tailwind CSS source and build settings (not published). |
| `CNAME` | The custom domain, once one is connected. |

## For developers

Styles use [Tailwind CSS](https://tailwindcss.com) 3.4. If you add or change Tailwind classes in
`index.html` or `assets/quote-form.js`, rebuild the stylesheet and commit `assets/site.css`:

```bash
cd dev
npm install
npm run build      # or: npm run watch
```

Design tokens: slate neutrals, `sky-700` accent (matched to the logo blue), Inter type,
`rounded-lg` cards with `shadow-sm`, section spacing `py-16 md:py-24`.

To preview locally with Jekyll (requires Ruby):

```bash
gem install jekyll kramdown-parser-gfm
jekyll serve
```

When you add a new field to `_data/site.yml`, add it to `.pages.yml` too so it shows up in the editor.

## Publishing and the domain

1. In this repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
3. The site appears at `https://<username>.github.io/<repository>/` within a few minutes.
4. To use your own domain, enter it under **Custom domain** on the same page (this creates the `CNAME` file),
   then add the DNS records GitHub shows at your domain registrar. Turn on **Enforce HTTPS** once it is available.
