NIGERIAN YOUTH SPORTS FEDERATION (NYSF) — FRONT-END WEBSITE
===========================================================

CONTENTS
--------
index.html            Home page
athletes.html         Athlete directory, search/filter, sample player profile modal
teams.html            Nigerian football teams and academy directory
competitions.html     Competition calendar and status filter
talent.html           Talent discovery and opportunity board
register.html         Athlete/team/academy/coach registration form (demo only)
dashboard.html        Sample athlete performance dashboard and export button
contact.html          Contact, complaint and urgency form
assets/css/styles.css Shared responsive styles
assets/js/config.js   Editable contact configuration
assets/js/app.js      Shared navigation, form demo behaviour and interactions

HOW TO VIEW
-----------
1. Download and extract the NYSF_Website.zip file.
2. Keep the folder structure unchanged.
3. Open index.html in Chrome, Edge, Firefox or another modern browser.
4. Click through the navigation to visit the other pages.
5. For best results, use a local server such as the VS Code Live Server extension.
   No build process is required. The Google Fonts import requires internet access;
   the site will fall back to standard sans-serif fonts if unavailable.

EDIT CONTACT DETAILS
--------------------
Open assets/js/config.js and edit:
- contactEmail: replace nysf@example.com with the official email.
- whatsappNumber: use the complete number in international format, digits only.
  Example format: 2348012345678 (country code 234, no leading zero or +).
- whatsappDisplay: display-only contact text.
- contactPerson: editable contact-person placeholder.

IMPORTANT: The number provided in the brief appears incomplete (0806318779).
Confirm the full number before publishing. The website currently uses 234806318779
as a provisional link value; WhatsApp links may not work until the full number is entered.

IMPORTANT PROTOTYPE LIMITATIONS
-------------------------------
- All athlete names, stats, academy listings, event names and dates are sample content.
  They are not real NYSF records and must be replaced or confirmed before launch.
- Registration currently validates in the browser only; it does not send, store, or
  verify applications. Do not collect real personal data until a secure backend is added.
- The contact form opens a pre-filled email draft. It does not send the email automatically.
- The dashboard is a front-end demonstration with fictional stats.
- Login, member accounts, admin approval, athlete verification, file upload, database,
  season-by-season analytics and access permissions require a backend.
- As the platform is for young people, implement parental/guardian consent, privacy
  protections, safeguarding/reporting procedures and restricted access to sensitive
  player information before launch.
- Do not represent NYSF as officially recognised or affiliated with any governing body
  unless that status has been confirmed and authorised.

RECOMMENDED NEXT DEVELOPMENT STAGE
----------------------------------
Connect the UI to a secure backend and database. Add:
1. Email verification and secure login (hashed passwords; never store plain-text passwords).
2. Roles: athlete/guardian, team administrator, coach/scout, NYSF reviewer and admin.
3. Registration review workflow with audit trail and document access restrictions.
4. Verified status only after human review.
5. Season/match statistics, validated scoring criteria and coach feedback.
6. Competition creation, team entry, fixtures, results and notifications.
7. Privacy policy, terms, consent records, safeguarding process and data-retention policy.
8. Backups, server-side validation, rate limiting and security testing.

This is a multi-page static front-end starter, not a production-ready membership system.
