# Environment Variables Setup Guide

This guide explains how to set up all environment variables for the Joshina International Properties website.

## Quick Start

1. Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Update the values in `.env.local` with your actual credentials

3. Restart your development server

## Environment Variables Reference

### Application Configuration

#### NEXT_PUBLIC_APP_URL
- **Purpose**: Base URL of your application
- **Development**: `http://localhost:3000`
- **Production**: `https://joshina.com`
- **Required**: Yes

#### NEXT_PUBLIC_APP_NAME
- **Purpose**: Application name for branding
- **Value**: `"Joshina International Properties"`
- **Required**: Yes

### Contact Information

#### NEXT_PUBLIC_CONTACT_EMAIL
- **Purpose**: Email address for contact form submissions
- **Value**: `info@joshina.com`
- **Required**: Yes

#### NEXT_PUBLIC_SUPPORT_EMAIL
- **Purpose**: Support email address
- **Value**: `support@joshina.com`
- **Required**: Yes

#### NEXT_PUBLIC_PHONE
- **Purpose**: Business phone number
- **Value**: `+254712345678`
- **Required**: Yes

---

## Email Service Setup

### Option 1: Resend (Recommended for Next.js)

**Why Resend?**
- Built specifically for Next.js
- Simple API
- Free tier: 100 emails/day
- Excellent documentation

**Setup Steps:**

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to [API Keys](https://resend.com/api-keys)
4. Copy your API key
5. Add to `.env.local`:
   \`\`\`
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   \`\`\`

**Pricing:**
- Free: 100 emails/day
- Paid: $20/month for 50,000 emails

---

### Option 2: SendGrid

**Why SendGrid?**
- Industry standard
- Reliable delivery
- Free tier: 100 emails/day
- Advanced analytics

**Setup Steps:**

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for a free account
3. Navigate to [API Keys](https://app.sendgrid.com/settings/api_keys)
4. Create a new API key
5. Add to `.env.local`:
   \`\`\`
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   \`\`\`

**Pricing:**
- Free: 100 emails/day
- Paid: $19.95/month for 50,000 emails

---

## CAPTCHA Setup (reCAPTCHA v3)

**Why reCAPTCHA v3?**
- No user interaction required
- Invisible protection
- Free
- Google-backed security

**Setup Steps:**

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" or "+" button
3. Fill in the form:
   - **Label**: Joshina Properties
   - **reCAPTCHA type**: reCAPTCHA v3
   - **Domains**: 
     - `localhost` (development)
     - `joshina.com` (production)
4. Accept terms and submit
5. Copy your keys:
   - **Site Key** → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret Key** → `RECAPTCHA_SECRET_KEY`

**Add to `.env.local`:**
\`\`\`
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
\`\`\`

---

## Google Maps API Setup

**Why Google Maps?**
- Industry standard
- Accurate location data
- Free tier: 28,000 requests/month
- Easy integration

**Setup Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the Maps JavaScript API:
   - Search for "Maps JavaScript API"
   - Click "Enable"
4. Create an API key:
   - Go to "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the key
5. Restrict the key (recommended):
   - Click on the key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domains:
     - `localhost:3000/*` (development)
     - `joshina.com/*` (production)
   - Under "API restrictions", select "Maps JavaScript API"
6. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDummyKeyForDevelopmentOnly1234567890
   \`\`\`

**Pricing:**
- Free: 28,000 requests/month
- Paid: $7 per 1,000 requests after free tier

---

## Google Analytics Setup (Optional)

**Why Google Analytics?**
- Free website analytics
- Track user behavior
- Monitor performance
- Understand traffic sources

**Setup Steps:**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new property:
   - **Property name**: Joshina Properties
   - **Reporting timezone**: Africa/Nairobi
   - **Currency**: KES (Kenyan Shilling)
5. Select "Web" as your platform
6. Enter your website details:
   - **Website URL**: `https://joshina.com`
   - **Stream name**: Joshina Properties
7. Copy your **Measurement ID** (starts with `G-`)
8. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   \`\`\`

**Pricing:** Free

---

## Calendly Integration (Optional)

**Why Calendly?**
- Easy appointment scheduling
- No backend required
- Free tier available
- Integrates with calendar apps

**Setup Steps:**

1. Go to [calendly.com](https://calendly.com)
2. Sign up for a free account
3. Create your calendar and availability
4. Get your public URL (e.g., `https://calendly.com/your-username`)
5. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
   \`\`\`

**Pricing:**
- Free: Basic scheduling
- Paid: $10-20/month for advanced features

---

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - Go to "Settings" → "Environment Variables"
   - Add all variables from `.env.local`
   - Make sure to add both `NEXT_PUBLIC_*` and secret variables
5. Deploy

### Environment Variables in Vercel

**For Production:**
\`\`\`
NEXT_PUBLIC_APP_URL=https://joshina.com
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDummyKeyForDevelopmentOnly1234567890
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
\`\`\`

---

## Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use different keys for development and production**
3. **Rotate API keys regularly**
4. **Restrict API keys** to specific domains/IPs
5. **Use environment-specific values** for sensitive data
6. **Monitor API usage** to detect unusual activity

---

## Troubleshooting

### Email not sending?
- Check `RESEND_API_KEY` or `SENDGRID_API_KEY` is correct
- Verify email address is valid
- Check spam folder
- Review API logs for errors

### CAPTCHA not working?
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` matches your domain
- Check that reCAPTCHA is enabled for your domain
- Clear browser cache and cookies

### Maps not displaying?
- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is correct
- Check that Maps JavaScript API is enabled
- Verify domain is whitelisted in API restrictions

### Analytics not tracking?
- Verify `NEXT_PUBLIC_GA_ID` is correct
- Check that Google Analytics is properly initialized
- Wait 24-48 hours for data to appear

---

## Support

For issues with specific services:
- **Resend**: [docs.resend.com](https://docs.resend.com)
- **SendGrid**: [sendgrid.com/docs](https://sendgrid.com/docs)
- **reCAPTCHA**: [developers.google.com/recaptcha](https://developers.google.com/recaptcha)
- **Google Maps**: [developers.google.com/maps](https://developers.google.com/maps)
- **Google Analytics**: [support.google.com/analytics](https://support.google.com/analytics)
- **Calendly**: [calendly.com/help](https://calendly.com/help)
