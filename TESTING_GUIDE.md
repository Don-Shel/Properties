# Testing Guide for Joshina International Properties

This guide covers manual testing procedures and automated testing setup for the website.

## Manual Testing Checklist

### 1. Form Submissions

#### Contact Form
- [ ] Navigate to `/contact`
- [ ] Fill in all fields with valid data
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check that email is received (check spam folder)
- [ ] Test with invalid email - should show error
- [ ] Test with empty fields - should show validation errors
- [ ] Test CAPTCHA protection (should not see CAPTCHA widget)

#### Property Viewing Request
- [ ] Navigate to any property detail page
- [ ] Scroll to "Request a Viewing" form
- [ ] Fill in all fields
- [ ] Submit form
- [ ] Verify success message
- [ ] Check email received with property details

#### Property Valuation Form
- [ ] Navigate to `/valuation`
- [ ] Fill in all fields
- [ ] Submit form
- [ ] Verify success message
- [ ] Check email received with property details

#### Property Alerts
- [ ] Navigate to `/alerts`
- [ ] Enter email and select criteria
- [ ] Submit form
- [ ] Verify confirmation message
- [ ] Check email received

### 2. Property Search & Filtering

- [ ] Navigate to `/properties`
- [ ] Verify all properties load
- [ ] Test filter by property type (Sale/Rent/Land)
- [ ] Test filter by location
- [ ] Test filter by price range
- [ ] Test filter by bedrooms
- [ ] Test combining multiple filters
- [ ] Test "Reset" button clears all filters
- [ ] Click on property card - should navigate to detail page

### 3. Property Detail Pages

- [ ] Navigate to property detail page
- [ ] Verify all property information displays
- [ ] Check image gallery loads all images
- [ ] Test image gallery navigation
- [ ] Verify Google Maps displays location
- [ ] Check "Request Viewing" form is visible
- [ ] Verify related properties section

### 4. Navigation & Links

- [ ] Test all header navigation links
- [ ] Test mobile menu opens/closes
- [ ] Test mobile menu links
- [ ] Test footer links
- [ ] Test "Get Started" CTA buttons
- [ ] Test breadcrumb navigation (if present)
- [ ] Test internal links work correctly

### 5. Mobile Responsiveness

- [ ] Test on iPhone 12 (390px)
- [ ] Test on iPad (768px)
- [ ] Test on Android phone (375px)
- [ ] Verify text is readable
- [ ] Verify buttons are clickable (min 44px)
- [ ] Verify images scale properly
- [ ] Verify forms are usable on mobile
- [ ] Test landscape orientation

### 6. Performance

- [ ] Check page load time (target: < 3s)
- [ ] Verify images load quickly
- [ ] Check for layout shifts (CLS)
- [ ] Verify smooth scrolling
- [ ] Test form submission speed

### 7. Accessibility

- [ ] Test keyboard navigation (Tab key)
- [ ] Test screen reader (NVDA/JAWS)
- [ ] Verify color contrast ratios
- [ ] Check alt text on images
- [ ] Verify form labels are associated
- [ ] Test focus indicators visible

### 8. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Automated Testing Setup

### Unit Tests

Create test files in `__tests__` directory:

\`\`\`bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
\`\`\`

Example test for validation:

\`\`\`typescript
// __tests__/validation.test.ts
import { validateEmail, validatePhone } from '@/lib/validation'

describe('Validation', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate Kenyan phone number', () => {
      expect(validatePhone('+254712345678')).toBe(true)
      expect(validatePhone('0712345678')).toBe(true)
    })

    it('should reject invalid phone', () => {
      expect(validatePhone('123')).toBe(false)
    })
  })
})
\`\`\`

### E2E Tests with Playwright

\`\`\`bash
npm install --save-dev @playwright/test
\`\`\`

Example E2E test:

\`\`\`typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('http://localhost:3000/contact')
  
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('input[name="phone"]', '+254712345678')
  await page.selectOption('select[name="subject"]', 'General Inquiry')
  await page.fill('textarea[name="message"]', 'Test message')
  
  await page.click('button[type="submit"]')
  
  await expect(page.locator('text=Thank you')).toBeVisible()
})
\`\`\`

---

## Performance Testing

### Google PageSpeed Insights

1. Go to [pagespeed.web.dev](https://pagespeed.web.dev)
2. Enter your website URL
3. Run test for Mobile and Desktop
4. Target scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### Core Web Vitals

Monitor these metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse Audit

Run in Chrome DevTools:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Review recommendations

---

## Security Testing

### OWASP Top 10 Checks

- [ ] SQL Injection - Not applicable (no database)
- [ ] XSS (Cross-Site Scripting) - Test form inputs
- [ ] CSRF (Cross-Site Request Forgery) - Verify tokens
- [ ] Broken Authentication - Test login flows
- [ ] Sensitive Data Exposure - Verify HTTPS
- [ ] XML External Entities - Not applicable
- [ ] Broken Access Control - Test permissions
- [ ] Security Misconfiguration - Review headers
- [ ] Insecure Deserialization - Not applicable
- [ ] Using Components with Known Vulnerabilities - Run npm audit

### Run Security Audit

\`\`\`bash
npm audit
npm audit fix
\`\`\`

### Test HTTPS

- [ ] Verify site loads over HTTPS
- [ ] Check SSL certificate is valid
- [ ] Verify no mixed content warnings

---

## SEO Testing

### On-Page SEO

- [ ] Verify page titles are unique and descriptive
- [ ] Check meta descriptions are present
- [ ] Verify heading hierarchy (H1, H2, H3)
- [ ] Check internal linking
- [ ] Verify images have alt text
- [ ] Check URL structure is clean

### Technical SEO

- [ ] Verify XML sitemap exists
- [ ] Check robots.txt is configured
- [ ] Verify canonical tags
- [ ] Check structured data (Schema.org)
- [ ] Verify mobile-friendly design
- [ ] Check page speed

### Tools

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [SEMrush](https://www.semrush.com)
- [Ahrefs](https://ahrefs.com)

---

## Regression Testing

After each update:

1. Run all manual tests from checklist
2. Run automated tests
3. Check PageSpeed Insights
4. Verify forms still work
5. Check email notifications
6. Test on multiple browsers
7. Test on mobile devices

---

## Bug Reporting Template

When reporting bugs, include:

\`\`\`
Title: [Brief description]

Environment:
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/Mac/Linux/iOS/Android]
- Device: [Desktop/Tablet/Mobile]

Steps to Reproduce:
1. Navigate to [URL]
2. Click on [element]
3. Fill in [form]
4. Submit

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Screenshots/Videos:
[Attach if possible]
\`\`\`

---

## Performance Optimization Tips

1. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Use responsive images

2. **Code Splitting**
   - Split large components
   - Use dynamic imports
   - Lazy load routes

3. **Caching**
   - Enable browser caching
   - Use CDN for static assets
   - Implement service workers

4. **Minification**
   - Minify CSS/JS
   - Remove unused code
   - Tree-shake dependencies

5. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor performance (Vercel Analytics)
   - Track user behavior (Google Analytics)
