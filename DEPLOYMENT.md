# Joshina International Properties - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Vercel account (recommended for Next.js)
- Environment variables configured (see ENVIRONMENT_SETUP.md)

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

## Deployment to Vercel

### Step 1: Connect Repository
1. Push code to GitHub
2. Go to vercel.com and sign in
3. Click "New Project"
4. Select your GitHub repository
5. Click "Import"

### Step 2: Configure Environment Variables
1. In Vercel dashboard, go to Settings > Environment Variables
2. Add all variables from `.env.example` (see ENVIRONMENT_SETUP.md for detailed setup)
3. Required variables:
   - `NEXT_PUBLIC_APP_URL` (production URL)
   - `RESEND_API_KEY` or `SENDGRID_API_KEY` (email service)
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` (CAPTCHA)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Google Maps)
   - `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_PHONE`
4. Set `NODE_ENV=production`

### Step 3: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site is live at `joshina.vercel.app`

### Step 4: Custom Domain
1. Go to Settings > Domains
2. Add your custom domain (joshina.com)
3. Update DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

## Staging Environment

Create a staging environment for testing:

\`\`\`bash
# Create staging branch
git checkout -b staging

# Deploy staging to Vercel
# In Vercel, create new project from same repo
# Set production branch to "staging"
\`\`\`

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables configured securely
- [ ] Security headers set in middleware.ts
- [ ] CAPTCHA (reCAPTCHA v3) integrated for all forms
- [ ] Rate limiting enabled (5 requests per 60 seconds)
- [ ] Input validation active on all forms
- [ ] Email service configured (Resend or SendGrid)
- [ ] Privacy Policy and Terms of Service published
- [ ] Disclaimer page published
- [ ] Backup strategy in place
- [ ] SSL certificate valid and auto-renewing

## Feature Verification Checklist

Before going live, verify all features work:

### Forms & Lead Generation
- [ ] Contact form submits and sends email
- [ ] Property viewing request form works
- [ ] Property valuation form works
- [ ] Property alerts subscription works
- [ ] CAPTCHA verification passes
- [ ] Rate limiting prevents spam

### Property Management
- [ ] All properties display correctly
- [ ] Property search and filters work
- [ ] Property detail pages load
- [ ] Image galleries display properly
- [ ] Google Maps integration works

### Content & SEO
- [ ] XML sitemap generates correctly
- [ ] robots.txt is accessible
- [ ] Schema markup is valid (test with Google's tool)
- [ ] Meta tags are present on all pages
- [ ] Blog posts display correctly

### Performance & Monitoring
- [ ] PageSpeed Insights score 90+
- [ ] Core Web Vitals are good
- [ ] Google Analytics tracking works
- [ ] Error tracking is configured (optional)

## Performance Optimization

- [ ] Images optimized with next/image
- [ ] Code splitting enabled
- [ ] Sitemap generated and submitted
- [ ] Schema markup implemented
- [ ] Core Web Vitals monitored
- [ ] Lazy loading implemented
- [ ] Caching headers configured

See OPTIMIZATION_GUIDE.md for detailed performance optimization strategies.

## Monitoring & Analytics

### Google Analytics
1. Set `NEXT_PUBLIC_GA_ID` environment variable
2. Verify tracking is working
3. Monitor traffic and user behavior
4. Track conversion goals

### Error Tracking (Optional)
- Implement Sentry for error monitoring
- Set up alerts for critical errors
- Review error logs regularly

### Performance Monitoring
- Use Vercel Analytics (included)
- Monitor Core Web Vitals
- Track page load times
- Monitor API response times

## Maintenance

### Regular Tasks
- Update dependencies monthly: `npm update`
- Review security logs and alerts
- Monitor error rates and fix issues
- Check Core Web Vitals monthly
- Review and respond to form submissions

### Backup Strategy
- Vercel automatically backs up deployments
- Keep GitHub repository as source of truth
- Document any manual changes
- Test restore procedures quarterly

### Email Service Monitoring
- Monitor email delivery rates
- Check spam folder for test emails
- Review email logs for errors
- Ensure API quotas are not exceeded

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

### Deployment Issues
- Check environment variables in Vercel dashboard
- Review build logs in Vercel for errors
- Verify all required files are present
- Check that `.env.local` is in `.gitignore`

### Forms Not Submitting
- Verify email service API key is correct
- Check CAPTCHA keys are valid
- Review browser console for errors
- Check rate limiting isn't blocking requests

### Emails Not Sending
- Verify `RESEND_API_KEY` or `SENDGRID_API_KEY` is correct
- Check email address is valid
- Review email service logs
- Check spam folder
- Verify domain is whitelisted (if required)

### Maps Not Displaying
- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is correct
- Check that Maps JavaScript API is enabled
- Verify domain is whitelisted in API restrictions
- Check browser console for errors

### Performance Issues
- Check image optimization
- Review bundle size with `ANALYZE=true npm run build`
- Monitor database queries (if using database)
- Check Core Web Vitals in PageSpeed Insights

## Documentation

- **ENVIRONMENT_SETUP.md** - Detailed setup for all environment variables and third-party services
- **TESTING_GUIDE.md** - Manual and automated testing procedures
- **OPTIMIZATION_GUIDE.md** - Performance and SEO optimization strategies

## Support

For deployment issues, contact:
- Email: support@joshina.com
- Phone: +254 700 000 000
- GitHub Issues: [Create an issue in your repository]

## Post-Launch Checklist

After going live:

- [ ] Monitor error rates for 24 hours
- [ ] Check email notifications are working
- [ ] Verify analytics are tracking correctly
- [ ] Test all forms on production
- [ ] Monitor Core Web Vitals
- [ ] Check search console for indexing
- [ ] Verify backups are working
- [ ] Set up monitoring alerts
- [ ] Document any issues found
- [ ] Plan first maintenance window
