# Cloudflare Pages Deployment

## First-time setup

1. Go to https://dash.cloudflare.com
2. Pages → Create a project → Connect to Git
3. Select `sentorixhq/sentorix-landing`
4. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command:    `npm run build`
   - Build output:    `out`
5. Environment variables:
   - `NEXT_PUBLIC_FORMSPREE_ID` = your-form-id
6. Save and Deploy

## Custom domain setup

1. Pages project → Custom domains → Add custom domain
2. Enter: `sentorix.io`
3. Enter: `www.sentorix.io`
4. Cloudflare will configure DNS automatically
   (since sentorix.io is already on Cloudflare)

## Subsequent deployments

Automatic — every push to `main` branch deploys automatically. No manual action needed.

Preview deployments are created for every PR at:
`https://{branch}.sentorix-landing.pages.dev`

## Formspree setup (one-time)

1. Go to https://formspree.io and create a free account
2. Create a new form named "Sentorix Demo Request"
3. Copy the form ID from the form URL (the part after `/f/`)
4. Add it to Cloudflare Pages environment variables:
   - Key: `NEXT_PUBLIC_FORMSPREE_ID`
   - Value: your-form-id
5. Free tier: 50 submissions/month
