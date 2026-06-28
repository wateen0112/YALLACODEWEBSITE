# YallaCode.tech - Website Speed Test Report

**Desktop Analysis** | **Generated:** June 28, 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Overall Scores Overview](#2-overall-scores-overview)
3. [Core Web Vitals Analysis](#3-core-web-vitals-analysis)
4. [Performance Opportunities](#4-performance-opportunities)
5. [Detailed Diagnostics](#5-detailed-diagnostics)
6. [Accessibility Assessment](#6-accessibility-assessment)
7. [Best Practices Review](#7-best-practices-review)
8. [SEO Analysis](#8-seo-analysis)
9. [Prioritized Recommendations](#9-prioritized-recommendations)
10. [Appendix: Test Environment](#10-appendix-test-environment)

---

## 1. Executive Summary

This report presents the results of a comprehensive website speed and quality audit for **YallaCode.tech**, conducted using **Google PageSpeed Insights** (powered by Lighthouse 13.4.0) on desktop devices. The analysis evaluates four key dimensions: Performance, Accessibility, Best Practices, and SEO.

> **Key Finding:** The website achieves an overall **Performance score of 70/100** on desktop, which falls in the "Needs Improvement" range. While Core Web Vitals like FCP (0.7s) and LCP (1.0s) are within acceptable thresholds, the **Total Blocking Time of 480ms** and **Speed Index of 3.2s** indicate significant room for improvement. The most impactful optimization opportunity is image delivery, with potential savings of over **5 MB**.

The website excels in SEO with a perfect score of 100, and demonstrates strong accessibility practices (95/100). However, security headers and image optimization require immediate attention to improve both performance and security posture.

| Category | Score | Status |
|----------|-------|--------|
| Performance | 70 / 100 | Needs Improvement |
| Accessibility | 95 / 100 | Good |
| Best Practices | 77 / 100 | Needs Improvement |
| SEO | 100 / 100 | Excellent |

---

## 2. Overall Scores Overview

The Lighthouse scoring system evaluates each category on a scale of 0 to 100:

- **0-49 (Red):** Poor - Requires significant improvement
- **50-89 (Orange):** Needs Improvement - Moderate issues detected
- **90-100 (Green):** Good - Meets best practice standards

### 2.1 Performance: 70/100

The performance score is weighed down by high Total Blocking Time (480ms), render-blocking resources, unoptimized images (5+ MB potential savings), and unused JavaScript. The FCP and LCP metrics are actually strong at 0.7s and 1.0s respectively, but main-thread work (5.6s) and JavaScript execution (2.9s) create noticeable delays.

### 2.2 Accessibility: 95/100

Excellent accessibility score with 23 passed audits. Only three automated issues were found: social media links lacking discernible names, an out-of-order heading element, and a missing captions track for the background video. 10 items require manual verification.

### 2.3 Best Practices: 77/100

The score is affected by missing security headers (CSP, HSTS, COOP, X-Frame-Options, Trusted Types), deprecated API usage, JavaScript source map absence, and browser console errors. These are primarily security-related concerns that should be addressed.

### 2.4 SEO: 100/100

Perfect SEO score with all 8 automated checks passing. Structured data is valid, mobile viewport is configured, and meta tags are properly implemented. One item (structured data validation) requires manual review.

---

## 3. Core Web Vitals Analysis

Core Web Vitals are Google's key user experience metrics. The following values were captured on June 28, 2026 using Lighthouse 13.4.0 with desktop simulation settings.

| Metric | Value | Assessment | Threshold |
|--------|-------|------------|-----------|
| **First Contentful Paint (FCP)** | 0.7 s | Good | < 1.8 s |
| **Largest Contentful Paint (LCP)** | 1.0 s | Good | < 2.5 s |
| **Total Blocking Time (TBT)** | 480 ms | Needs Improvement | < 200 ms |
| **Cumulative Layout Shift (CLS)** | 0 | Good | < 0.1 |
| **Speed Index (SI)** | 3.2 s | Good | < 3.4 s |

### 3.1 LCP Element Breakdown

The LCP element is the **YallaCode logo image** (`<img alt="YallaCode">`), served via Next.js image optimization. The LCP sub-part breakdown reveals:

| Sub-part | Duration | Notes |
|----------|----------|-------|
| Time to First Byte (TTFB) | 100 ms | Good server response time |
| Resource Load Delay | 310 ms | Time before resource starts loading |
| Resource Load Duration | 500 ms | Actual download/render time |
| Element Render Delay | 350 ms | Time to render on screen |

> **Observation:** The total LCP of 1.0s is well within the "Good" threshold (<2.5s), but the resource load delay (310ms) could be reduced by applying `fetchpriority="high"` to the LCP image and ensuring it is not lazy-loaded.

---

## 4. Performance Opportunities

This section details the actionable opportunities identified by Lighthouse, sorted by estimated impact on load performance.

### 4.1 Eliminate Render-Blocking Resources

**Estimated Savings: 480 ms** | **Impact: HIGH**

Two render-blocking requests were identified that delay the First Contentful Paint:

| Resource | Type | Transfer Size | Duration |
|----------|------|---------------|----------|
| `...chunks/0aj4mvuye6y24.css` | First-party CSS | 14.0 KiB | 140 ms |
| `fonts.googleapis.com/css2?family=...` | Google Fonts CSS | 2.7 KiB | 200 ms |

**Recommendation:** Inline critical CSS, defer non-critical stylesheets, and use `preload` with `onload` for Google Fonts. Consider self-hosting fonts to eliminate the external request.

### 4.2 Serve Images in Next-Gen Formats

**Estimated Savings: 5,144 KiB (~5 MB)** | **Impact: HIGH**

Multiple images are served in inefficient formats or at unnecessarily large dimensions:

| Image | Current Size | Potential Saving | Issue |
|-------|-------------|------------------|-------|
| EduFlow (Unsplash) | 2,278 KiB | 2,213 KiB | Wrong dimensions, poor compression |
| StockSense (Unsplash) | 2,005 KiB | 1,933 KiB | Dimensions 3021x4160 vs needed 822x548 |
| HealthAI (Unsplash) | 450 KiB | 380 KiB | Dimensions 1453x2002 vs needed 821x548 |
| UrbanNav (Unsplash) | 390 KiB | 317 KiB | Low compression factor |
| Tamara Logo (PNG) | 96 KiB | 95 KiB | Dimensions 1100x356 vs needed 110x36 |
| AWS Logo (PNG) | 50 KiB | 50 KiB | Dimensions 2472x1566 vs needed 63x40 |

**Recommendation:** Convert all images to WebP or AVIF format. Use responsive images with `srcset` and `sizes` attributes. The Unsplash images are dramatically oversized - request smaller dimensions from Unsplash or use Next.js Image component with proper sizing.

### 4.3 Enable Efficient Cache Policies

**Estimated Savings: 300 KiB** | **Impact: MEDIUM**

16 static assets (primarily partner logos) are served without cache-control headers, forcing re-download on every visit:

- `/logos/Tamara.png` - 96 KiB
- `/logos/AWS.png` - 51 KiB
- `/logos/Odoo.png` - 38 KiB
- `/logos/Cloudflare.png` - 17 KiB
- `/logos/Bitrix24.png` - 17 KiB
- Plus 11 additional logo images

**Recommendation:** Add long-lived cache headers (e.g., `Cache-Control: public, max-age=31536000, immutable`) to all static assets in `/logos/` and other static directories.

### 4.4 Reduce Unused JavaScript

**Estimated Savings: 193 KiB** | **Impact: MEDIUM**

Unused JavaScript was detected in the bundled chunks. This dead code increases download size and parsing time without providing functionality.

**Recommendation:** Review bundle composition using `@next/bundle-analyzer`. Enable tree-shaking, split code by routes, and dynamically import non-critical components.

### 4.5 Remove Legacy JavaScript Polyfills

**Estimated Savings: 13 KiB** | **Impact: LOW**

The bundle includes polyfills for modern JavaScript features that are natively supported in all modern browsers:

- `Array.prototype.at`
- `Array.prototype.flat` / `flatMap`
- `Object.fromEntries` / `Object.hasOwn`
- `String.prototype.trimEnd` / `trimStart`

**Recommendation:** Configure Babel/Next.js to target modern browsers only (Baseline 2022+), eliminating unnecessary polyfill transforms.

---

## 5. Detailed Diagnostics

### 5.1 Main Thread Workload

The browser's main thread was busy for **5.6 seconds**, with the following breakdown:

| Activity | Duration | Percentage |
|----------|----------|------------|
| JavaScript Execution | 2.9 s | 52% |
| Style & Layout | ~1.5 s | ~27% |
| Other (HTML parsing, etc.) | ~1.2 s | ~21% |

### 5.2 Long-Running Tasks

**13 long-running tasks** were detected on the main thread. Tasks longer than 50ms block user interaction. The largest tasks should be split using `requestIdleCallback` or Web Workers.

### 5.3 Forced Reflow

Forced synchronous layout (reflow) was detected in multiple JavaScript chunks, totaling **184ms** in the most expensive function call. This occurs when JavaScript reads a geometric property (like `offsetWidth`) after modifying the DOM, forcing the browser to recalculate styles synchronously.

**Affected files:**

- `...chunks/0xlm~35jsq8bv.js:28:55725` - 138 ms
- `...chunks/0k9s2rygzsswm.js:1:20073` - 36 ms
- `...chunks/0k9s2rygzsswm.js:1:4340` - 5 ms

### 5.4 Network Payload

The total network payload is **6,186 KiB (~6 MB)**, which exceeds the recommended 1,600 KiB threshold:

| Source | Size | Percentage |
|--------|------|------------|
| Unsplash images (project showcases) | 5,125 KiB | 83% |
| Framerusercontent image | 108 KiB | 2% |
| Google Fonts (WOFF2) | 73 KiB | 1% |
| First-party JS/CSS/assets | ~880 KiB | 14% |

### 5.5 DOM Size

The DOM contains **1,224 elements** with a maximum depth of 15 and a maximum of 32 children for any single element.

### 5.6 Animation Issues

**45 non-composited animations** were detected. These animations are not running on the compositor thread and may cause jank. Animations affecting layout properties (width, height, top, left) should be converted to use `transform` and `opacity` instead.

---

## 6. Accessibility Assessment

The website achieves a strong accessibility score of **95/100**, with 23 automated audits passing. Three issues were identified:

### 6.1 Issues Requiring Attention

**Links Lack Discernible Names** | **Impact: MEDIUM**

4 social media links in the footer use generic anchor tags without accessible labels:

```html
<a href="#" class="p-2.5 rounded-full bg-white/5...">
```

**Fix:** Add `aria-label` attributes (e.g., `aria-label="Follow us on Twitter"`) or visually hidden text inside each link.

**Heading Hierarchy Violation** | **Impact: LOW**

An `<h4>` element ("Ahmed R.") appears without a preceding `<h3>`, breaking the document outline.

**Fix:** Adjust heading levels to follow a strict descending order (h1 > h2 > h3 > h4).

**Video Missing Captions** | **Impact: MEDIUM**

The background video element lacks a `<track kind="captions">` child element.

**Fix:** Since this is a decorative background video, add `aria-hidden="true"` and `role="presentation"`.

### 6.2 Passed Audits (23)

The website passes all major accessibility checks including: ARIA attributes validation, color contrast ratios, alt text on images, form labels, skip links, focus management, keyboard navigation, touch target sizing, and semantic HTML structure.

---

## 7. Best Practices Review

The Best Practices score of **77/100** reflects several security header omissions and development issues.

### 7.1 Security Headers (All High Severity)

| Header | Status | Risk | Recommendation |
|--------|--------|------|----------------|
| Content-Security-Policy (script-src) | Missing | XSS attacks | Define script-src directive restricting script sources |
| Content-Security-Policy (object-src) | Missing | Plugin injection | Set object-src to 'none' |
| Strict-Transport-Security (HSTS) | Missing | Protocol downgrade | Add HSTS header with max-age=31536000 |
| Cross-Origin-Opener-Policy | Missing | Cross-origin attacks | Set COOP to same-origin |
| X-Frame-Options / CSP frame-ancestors | Missing | Clickjacking | Add X-Frame-Options: DENY or CSP frame-ancestors |
| Trusted Types CSP | Missing | DOM-based XSS | Add require-trusted-types-for 'script' |

### 7.2 Other Issues

- **Deprecated API Usage:** One warning detected - review and update to modern alternatives
- **Browser Console Errors:** JavaScript errors are being logged to the browser console
- **Missing Source Maps:** Large first-party JavaScript bundles lack source maps

### 7.3 Passed Audits (10)

The site passes: HTTPS enforcement, no mixed content, no geolocation/notifications permission abuse on load, proper image aspect ratios, correct image resolution, HTML5 doctype declaration, proper charset encoding, no Chrome DevTools issues, paste functionality enabled, and third-party cookie awareness.

---

## 8. SEO Analysis

The website achieves a **perfect SEO score of 100/100**. All 8 automated SEO audits pass successfully:

| Audit | Status |
|-------|--------|
| Document has a meta description | Pass |
| Document has a title element | Pass |
| Links have descriptive text | Pass |
| Page has successful HTTP status code | Pass |
| robots.txt is valid | Pass |
| Document has a valid hreflang | Pass |
| Document has a valid canonical link | Pass |
| Document uses legible font sizes | Pass |

The site correctly implements internationalization with proper `hreflang` tags for English content (`/en`), has valid canonical URLs, and maintains a proper `robots.txt` file.

---

## 9. Prioritized Recommendations

Based on the analysis, the following recommendations are ordered by impact and effort ratio. Implementing the top 5 items should push the Performance score above 85.

| Priority | Action | Est. Impact |
|----------|--------|-------------|
| 1 | **Optimize all project showcase images** - Convert Unsplash images to WebP/AVIF, request appropriate dimensions, implement responsive srcset | ~5 MB savings, +15-20 perf points |
| 2 | **Implement proper cache headers** - Add long-lived Cache-Control headers to all static assets | 300 KiB repeat-visit savings |
| 3 | **Fix LCP image loading** - Add fetchpriority="high" to the YallaCode logo, ensure not lazy-loaded | ~200-300ms LCP improvement |
| 4 | **Remove render-blocking resources** - Inline critical CSS, defer non-critical stylesheets, preload Google Fonts | 480ms FCP improvement |
| 5 | **Add security headers** - Implement CSP, HSTS, COOP, X-Frame-Options, Trusted Types | +15-20 Best Practices points |
| 6 | **Reduce unused JavaScript** - Use @next/bundle-analyzer to identify and eliminate dead code | 193 KiB savings |
| 7 | **Fix accessibility issues** - Add aria-labels to social links, correct heading hierarchy, add video captions | +5 Accessibility points |
| 8 | **Remove legacy polyfills** - Update Babel config to target modern browsers only | 13 KiB savings |
| 9 | **Optimize partner logos** - Serve logos as SVG where possible, or resize PNGs to display dimensions | ~200 KiB savings |
| 10 | **Reduce main-thread work** - Split long JS tasks, move non-critical work off the main thread | Improved interactivity |

---

## 10. Appendix: Test Environment

| Parameter | Value |
|-----------|-------|
| Test Tool | Lighthouse 13.4.0 |
| Browser | HeadlessChromium 146.0.7680.177 |
| User Agent | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 |
| Device | Desktop (Simulated) |
| Viewport | 1350 x 940 px, DPR 1 |
| CPU | 1x slowdown (Simulated) |
| Network Throttling | 40ms TCP RTT, 10,240 kb/s throughput |
| Browser Location | Europe |
| Test Date | June 28, 2026, 15:20 GMT+8 |
| Axe Version | 4.12.0 |

> **Note:** This report is based on a single simulated test run. Field data (real user monitoring via Chrome User Experience Report) may differ due to variations in network conditions, device capabilities, and geographic location.

### Reference Links

- PageSpeed Insights Report: https://pagespeed.web.dev/analysis/https-yallacode-tech/qqopy005vv?form_factor=desktop
- Lighthouse Scoring Calculator: https://googlechrome.github.io/lighthouse/scorecalc/
- Web Vitals Documentation: https://web.dev/vitals/

---

*Report generated from Google PageSpeed Insights Desktop Analysis for https://yallacode.tech/*
