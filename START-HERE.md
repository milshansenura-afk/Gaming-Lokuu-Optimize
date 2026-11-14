# Gaming Lokuu Optimize

## 1. Preview the site

Windows File Explorer එකේ ZIP එකට **Right-click → Extract All** කරන්න. `website/index.html` double-click කරලා full site එක බලන්න. `github-free/index.html` එකෙන් GitHub Pages version එක බලන්න පුළුවන්.

## 2. Update your existing GitHub Pages site

1. Open your existing repository at <https://github.com/milshansenura-afk/Gaming-Lokuu-Optimize>.
2. In **Code → Add file → Upload files**, drag the contents of `github-free` from File Explorer. Upload `index.html`, `styles.css`, `app.js`, `.nojekyll` and the `assets` folder. The upload list should show `assets/hero.webp` and `assets/mark.svg`.
3. Click **Commit changes** on the `main` branch. Keep `index.html` in the repository root. If Pages is already enabled, it will publish the new commit. Otherwise use **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
4. Once the deployment succeeds, open <https://milshansenura-afk.github.io/Gaming-Lokuu-Optimize/> and test with your own phone details. If the old design still appears after deployment, try a hard refresh.

## 3. Publish the full site with WhatsApp orders

1. In Cloudflare, open **Workers & Pages → Create application → Get started → Drag and drop your files**. Choose Pages if the dashboard asks you to select a product.
2. For a new project, use a name such as `gaming-lokuu-optimize`. For an existing Direct Upload project, choose **Create a new deployment**.
3. Drag the `website` folder into the upload box, then select **Deploy site**. This version has the free tool and the Rs. 1,500 pack on the same page. Upload the `website` folder by itself so the private guide stays with you.
4. Open the resulting `.pages.dev` link and press **Order on WhatsApp**. The order draft opens for the configured business number. You can edit the number in `website/config.js`.

GitHub Pages restricts commercial storefronts. The GitHub files are for the free tuner. The Cloudflare files are for the combined tuner and paid pack.

## 4. Handle orders in WhatsApp Business

1. Save a `/pay` shortcut in **Tools → Quick replies**. Send the bank transfer details in the buyer's WhatsApp chat.
2. Match the customer's transfer reference to the **LKR 1,500** deposit in your banking app.
3. Open `private-pack/Hot-60i-Optimization-Guide.html`, click **Print / Save as PDF**, then send that PDF in the order chat.
4. Ask for screenshots of the in-game Display/Graphics menu and HUD, plus the player's game version, finger layout and main issue. Send one written review with a graphics/FPS starting point, a HUD change to try and a repeatable Training Ground check.

Suggested `/pay` reply:

> Hi! Hot 60i 4G Full Optimization Pack එක රු. 1,500යි. Transfer එක කරලා reference එක එවන්න. Payment එක confirm කළාම PDF guide එක එවන්නම්. Graphics සහ HUD screenshots එව්වම setup එක එක වරක් review කරලා changes ටික කියන්නම්.  
> Bank: [bank name]  
> Account holder: [account holder]  
> Account number: [account number]

## Hosting references

- [GitHub Pages source settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
