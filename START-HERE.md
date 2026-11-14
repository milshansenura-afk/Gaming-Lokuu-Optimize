# Gaming Lokuu Optimize setup

## 1. Publish Headshot Tuner

1. Open <https://github.com/new> and make a public repository called `gaming-lokuu-optimize`. If you already created a repository for the free generator, upload the updated files there to keep your current site URL.
2. Extract this bundle. In the repository, choose **Add file → Upload files**.
3. Open the extracted `free-site` folder. Drag its **contents** (`index.html`, `styles.css`, `app.js`, and the `assets` folder) into GitHub. Put `index.html` at the repository root. The included `.nojekyll` is optional. Click **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then **main**, **/(root)**, and **Save**.
5. Wait for GitHub to display the published link on the Pages settings screen. Open it and generate a sample profile using **Infinix Hot 60i**, **4 GB**, **128 GB**, and **Short** drag. Then choose **Long** and generate again.

You can also preview the free tool locally by opening `free-site/index.html`. The tool generates starting values from grip, play style, drag length, optional swipe calibration and reported stutter. The results show six headshot sliders and separate Graphics and In-game FPS recommendations. RAM, storage and observed stutter inform the performance guidance. Training Ground feedback tunes the tested slider in 5-point steps. Saved profiles stay in the visitor's browser. Copy offers selectable text when clipboard access is unavailable.

[GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 2. Take orders for the Rs. 1,500 Hot 60i 4G pack

1. Create a WhatsApp Business profile for **Gaming Lokuu Optimize** with the public number you want customers to use.
2. In `pro-store/config.js`, set `whatsappNumber` to your business number. For Sri Lankan mobile numbers you can use the local format (starting with `07`) or the international format (starting with `+947`). Optionally set `generatorUrl` to your live GitHub Pages URL.
3. Publish the contents of `pro-store` on the host you use for commercial pages. For example, go to **Cloudflare → Workers & Pages → Create application → Get started → Drag and drop your files**, then deploy the `pro-store` folder.
4. Open the live page and tap **Order on WhatsApp**. Verify that the business chat opens with a draft naming **Gaming Lokuu Optimize** and the **Infinix Hot 60i 4G Full Optimization Pack** and showing **රු. 1,500**. The customer sends the draft from their own WhatsApp.
5. On your phone, open WhatsApp Business and go to **Tools → Quick replies**. Create a `/pay` shortcut with the message below. Fill in your bank details in WhatsApp Business and send the reply privately when an order comes in.
6. Check your banking app for the **LKR 1,500** deposit and match the customer's transfer reference before marking it paid. Open `private-pack/Hot-60i-Optimization-Guide.html` and select **Print / Save as PDF**. Save the PDF, then attach it in the buyer's WhatsApp chat. Keep the `private-pack` folder outside the public website.

Suggested `/pay` quick reply:

> Hi! Gaming Lokuu Optimize එකේ Infinix Hot 60i 4G Full Optimization Pack එක රු. 1,500යි. පහළ account එකට transfer කරලා transfer reference එක මේ chat එකට එවන්න. Payment එක confirm කළාම PDF guide එක මේ chat එකටම එවන්නම්.  
> Bank: [bank name]  
> Account holder: [account holder]  
> Account number: [account number]

Orders, payment verification and PDF delivery are handled manually. GitHub Pages limits commercial use, so publish the free generator there and host the pack page separately.

- [WhatsApp click to chat](https://faq.whatsapp.com/5913398998672934)
- [WhatsApp Business quick replies](https://faq.whatsapp.com/1791149784551042/)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
