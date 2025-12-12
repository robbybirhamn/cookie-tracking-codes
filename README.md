# Tracking Project

A Laravel + Inertia.js + React application with tracking code management and cookie consent features.

## Features

- **Tracking Code Management (CRUD)**: Create, edit, delete, and manage tracking codes
- **Cookie Consent System**: GDPR-compliant cookie consent banner for customer pages
- **Automatic Script Injection**: Tracking codes are automatically executed when cookies are accepted

## Setup

### Prerequisites

- PHP 8.3+
- Composer
- Node.js and npm
- Database (SQLite, MySQL, or PostgreSQL)

### Installation

1. **Install PHP dependencies:**
   ```bash
   composer install
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup:**
   ```bash
   php artisan migrate
   ```

5. **Generate Wayfinder routes:**
   ```bash
   php artisan wayfinder:generate --with-form
   ```

6. **Build frontend assets:**
   ```bash
   npm run build
   # Or for development:
   npm run dev
   ```

7. **Start the development server:**
   ```bash
   composer run dev
   # Or separately:
   php artisan serve
   npm run dev
   ```

## Testing Guide

### 1. Testing Tracking Code Management (CRUD)

#### Access the Tracking Codes Page

1. Log in to the application
2. Navigate to **Settings → Tracking Codes**
3. You should see the tracking codes list page

#### Create a Tracking Code

1. Click the **"Create Tracking Code"** button
2. Fill in the form:
   - **Name**: Enter a descriptive name (e.g., "Google Analytics")
   - **Script Content**: Enter your tracking script code **without** `<script>` tags
   
   Example script content:
   ```javascript
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'GA_MEASUREMENT_ID');
   ```

3. Click **"Create"**
4. You should see a success message and be redirected to the list page
5. Your new tracking code should appear in the list

#### Edit a Tracking Code

1. On the tracking codes list page, click the **pencil icon** next to a tracking code
2. Modify the name or script content
3. Click **"Update"**
4. You should see a success message and the changes should be reflected

#### Delete a Tracking Code

1. On the tracking codes list page, click the **trash icon** next to a tracking code
2. A confirmation dialog will appear
3. Click **"Delete"** to confirm
4. The tracking code should be removed from the list

#### Search/Filter Tracking Codes

1. On the tracking codes list page, use the search input
2. Type part of a tracking code name
3. Press Enter or click **"Search"**
4. The list should filter to show matching results

### 2. Testing Cookie Consent System

#### Test on Customer Pages

1. Navigate to **`/customer`** page
2. You should see a cookie consent banner at the bottom of the page

#### Accept Cookies

1. Click **"Accept All"** on the cookie banner
2. The banner should disappear
3. Check the browser console - you should see:
   - `[Cookie Consent] Tracking scripts enabled`
   - `[Tracking Code] Executed: [Your Tracking Code Name]`
4. Check the browser's localStorage:
   - Open DevTools → Application → Local Storage
   - You should see `cookie_consent: "accepted"`
   - You should see `cookie_consent_expiry` with a timestamp
5. Refresh the page - the banner should **not** appear again
6. Check `document.head` in the console - you should see script elements with `data-tracking-code-id` attributes

#### Reject Cookies

1. Clear localStorage and sessionStorage (or use a new incognito window)
2. Navigate to **`/customer`** page
3. Click **"Reject All"** on the cookie banner
4. The banner should disappear
5. Check the browser console - you should see:
   - `[Cookie Consent] Tracking scripts disabled`
6. Check sessionStorage:
   - Open DevTools → Application → Session Storage
   - You should see `cookie_consent: "rejected"`
7. Refresh the page - the banner should **not** appear (until you close the tab)
8. Check `document.head` - there should be **no** tracking code scripts

#### Test Consent Persistence

**Accept All (30 days):**
1. Accept cookies
2. Close the browser completely
3. Reopen and navigate to `/customer`
4. Banner should **not** appear (consent persists for 30 days)

**Reject All (Session only):**
1. Reject cookies
2. Close the browser tab
3. Open a new tab and navigate to `/customer`
4. Banner **should** appear (rejection only lasts for the session)

### 3. Testing Tracking Code Execution

#### Verify Script Execution

1. Create a tracking code with a test script:
   ```javascript
   console.log('Tracking code executed!');
   window.testTrackingCode = true;
   ```

2. Accept cookies on the `/customer` page
3. Open browser console
4. You should see:
   - `[Tracking Code] Executed: [Your Code Name]`
   - `Tracking code executed!` (from your script)
5. Check `window.testTrackingCode` - should be `true`
6. Check `document.head` - should contain a `<script>` element with your code

#### Verify Script Removal

1. Accept cookies (scripts should be injected)
2. Click **"Reject All"** (or clear consent)
3. Check `document.head` - all tracking code scripts should be removed
4. Check `window.testTrackingCode` - should be `undefined` (if your script set it)

#### Test Multiple Tracking Codes

1. Create multiple tracking codes (e.g., "Google Analytics", "Facebook Pixel", "Custom Tracker")
2. Accept cookies on `/customer` page
3. Check browser console - you should see execution logs for each code
4. Check `document.head` - you should see multiple script elements, each with unique `data-tracking-code-id` attributes

### 4. Testing Global Customer Routes

#### Verify Tracking Codes Work on All `/customer/*` Routes

1. Create a tracking code
2. Navigate to `/customer` - tracking codes should be available
3. If you create additional customer routes (e.g., `/customer/orders`, `/customer/profile`), they should also have access to tracking codes automatically

#### Test Route Detection

The middleware automatically detects routes starting with `customer`:
- `/customer` ✅
- `/customer/orders` ✅
- `/customer/profile` ✅
- `/customers` ✅ (if you create this route)
- `/dashboard` ❌ (not a customer route)

### 5. Testing Edge Cases

#### Empty Tracking Codes

1. Create a tracking code with empty script content
2. Accept cookies
3. Check console - should see a warning: `[Tracking Code] Empty script content for: [Name]`
4. No script should be injected

#### Invalid Script Content

1. Create a tracking code with invalid JavaScript
2. Accept cookies
3. Check console - should see an error message
4. The page should still work (errors are caught and logged)

#### User-Specific Tracking Codes

1. Log in as User A
2. Create tracking codes
3. Log out and log in as User B
4. Navigate to `/customer` - User B should only see their own tracking codes
5. User B's tracking codes should execute, not User A's

#### Cookie Consent Expiration

1. Accept cookies
2. Manually modify `cookie_consent_expiry` in localStorage to a past date
3. Refresh the page
4. Banner should appear again (consent expired)

## Manual Testing Checklist

### Tracking Codes CRUD
- [ ] Create a new tracking code
- [ ] Edit an existing tracking code
- [ ] Delete a tracking code (with confirmation)
- [ ] Search/filter tracking codes
- [ ] View empty state when no codes exist
- [ ] Verify only own tracking codes are visible

### Cookie Consent
- [ ] Banner appears on first visit to `/customer`
- [ ] "Accept All" saves to localStorage for 30 days
- [ ] "Reject All" saves to sessionStorage (session only)
- [ ] Banner hides after making a choice
- [ ] Banner doesn't reappear after refresh (if accepted)
- [ ] Consent expires after 30 days (for Accept All)

### Tracking Code Execution
- [ ] Scripts execute when cookies are accepted
- [ ] Scripts are wrapped in `<script>` tags
- [ ] Scripts are injected into `document.head`
- [ ] Scripts are removed when cookies are rejected
- [ ] Multiple tracking codes execute correctly
- [ ] Scripts have data attributes for identification
- [ ] No duplicate execution on page refresh

### Integration
- [ ] Tracking codes work on all `/customer/*` routes
- [ ] Only page owner's tracking codes execute
- [ ] Tracking codes are shared globally via Inertia props
- [ ] CustomerPageWrapper component works correctly

## Browser Console Commands for Testing

```javascript
// Check cookie consent status
localStorage.getItem('cookie_consent')
localStorage.getItem('cookie_consent_expiry')
sessionStorage.getItem('cookie_consent')

// Check if tracking scripts are injected
document.querySelectorAll('script[data-tracking-code-id]')

// Manually clear consent (for testing)
localStorage.removeItem('cookie_consent')
localStorage.removeItem('cookie_consent_expiry')
sessionStorage.removeItem('cookie_consent')

// Check tracking code execution
window.testTrackingCode // If you set this in a test script
```

## Troubleshooting

### Tracking codes not executing

1. Check if cookies are accepted:
   ```javascript
   localStorage.getItem('cookie_consent') === 'accepted'
   ```

2. Check browser console for errors

3. Verify tracking codes exist for the current user

4. Check that you're on a `/customer/*` route

### Cookie banner not appearing

1. Clear localStorage and sessionStorage
2. Refresh the page
3. Check browser console for errors
4. Verify you're on a `/customer/*` route

### Form errors in settings

1. Run `php artisan wayfinder:generate --with-form`
2. Rebuild frontend: `npm run build` or `npm run dev`
3. Clear browser cache

## Development

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/TrackingCodeTest.php

# Run with filter
php artisan test --filter=tracking
```

### Code Formatting

```bash
# Format PHP code
vendor/bin/pint

# Format JavaScript/TypeScript
npm run format
```

### Regenerating Routes

After adding new routes or controllers:

```bash
php artisan wayfinder:generate --with-form
```

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Settings/
│   │       └── TrackingCodeController.php
│   ├── Middleware/
│   │   └── HandleInertiaRequests.php (shares tracking codes)
│   └── Requests/
│       └── Settings/
│           ├── StoreTrackingCodeRequest.php
│           └── UpdateTrackingCodeRequest.php
├── Models/
│   ├── TrackingCode.php
│   └── User.php (has trackingCodes relationship)

resources/js/
├── components/
│   ├── cookie-consent-banner.tsx
│   ├── customer-page-wrapper.tsx
│   └── tracking-code-form-fields.tsx
├── hooks/
│   ├── use-cookie-consent.ts
│   └── use-tracking-codes.ts
└── pages/
    ├── customer.tsx
    └── settings/
        └── tracking-codes/
            ├── index.tsx
            ├── create.tsx
            └── edit.tsx

database/migrations/
└── 2025_12_12_065958_create_tracking_codes_table.php
```

## Notes

- Tracking codes are stored **without** `<script>` tags - they are automatically wrapped when injected
- Cookie consent for "Accept All" persists for **30 days** in localStorage
- Cookie consent for "Reject All" only lasts for the **current session** in sessionStorage
- Tracking codes are automatically shared on all routes starting with `/customer`
- Only the authenticated user's own tracking codes are loaded and executed

