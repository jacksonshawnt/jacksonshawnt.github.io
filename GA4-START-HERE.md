# Portfolio analytics: publish and verify

The package uses your GA4 measurement ID, `G-2E8MTGZ11D`.
It installs the Google tag directly. A Google Tag Manager container is not required.

## Upload the update to GitHub

If you already uploaded the National Guard update, replace these files at the
top level of the repository:

- `index.html`
- `404.html`
- `credits.html`

Add these new files at the top level:

- `analytics.js`
- `GA4-START-HERE.md` (these instructions; optional for the public repository)

Replace all seven HTML files inside the existing `case-studies` folder:

- `corporate-communications.html`
- `digital-adoption.html`
- `lifecycle-email.html`
- `marketing-operations.html`
- `medicare-advantage.html`
- `national-guard.html`
- `podcast-relaunch.html`

Commit the changes and wait for GitHub Pages to finish publishing. Keep the
folder structure intact. Do not upload the ZIP itself to serve the website.
The complete package also retains all existing styles, images, and work samples.

## Check the installation

1. Open https://analytics.google.com/ and select **Shawn Jackson Portfolio**
   in the property selector near the top left.
2. Go to **Reports > Realtime**.
3. In another browser tab, open https://jacksonshawnt.github.io/.
4. Open a case study and click one of its work-sample images. Then click a
   resume link and the LinkedIn button. Clicking the email address opens your
   email application; you do not need to send a message to test that click.
5. Return to Realtime and look for page views and the event names listed below.
   Allow a few minutes. The initial installation may take up to 30 minutes
   to start collecting data.
6. If no data appears, confirm GitHub Pages has published, check that you selected
   the portfolio property, and test in a browser without an analytics blocker.
   Google's Tag Assistant at https://tagassistant.google.com/ can check the tag.

Tracking starts after publication. The package does not collect historical visits.
The code was checked locally; successful receipt in your private GA4 property
must be confirmed after you upload it.

## What is measured

| Event | Trigger | Interpretation |
| --- | --- | --- |
| `page_view` | Google tag on a page | A page was viewed; GA4 owns this event |
| `resume_click` | Any link to your resume PDF | Resume interest; not proof a file was saved or read |
| `contact_click` | Email link or LinkedIn profile link | Contact intent; not a sent email, message, or qualified lead |
| `case_study_click` | A link to a different case-study page | A project was selected, including next-project links |
| `work_sample_open` | An image-enlargement link | A visitor chose to inspect a work sample |

Custom events include `page_path` and `link_position`. Contact events include
`contact_method` (`email` or `linkedin`); case selections include `case_study`;
work-sample events include `sample_name`.

Leave **Admin > Data collection and modification > Data streams > Portfolio
website stream > Enhanced measurement** enabled for Google's automatic engagement,
outbound-link, PDF-link, and scroll measurement. Its default scroll event fires
near 90% page depth. It does not establish that someone read the page.

Enhanced measurement may report `file_download` for the same resume click and
`click` for the same LinkedIn visit. These are different views of the same action.
Use `resume_click` and `contact_click` for the portfolio KPIs below; do not add
their counts to the automatic events or you will double-count those actions.
The custom script does not send email addresses, link query strings, form data,
or link text. Google Analytics still performs its normal page and traffic collection.

## Mark useful actions as key events

After the events have appeared:

1. Go to **Admin > Data display > Events**.
2. Find `contact_click` in **Recent events** and click its star to mark it as a
   key event. This includes both email and LinkedIn intent.
3. Mark `resume_click` as a secondary key event if you want resume interest in
   the same reports. It is a weaker signal than actual inbound inquiries.
4. Leave `case_study_click` and `work_sample_open` as engagement events.

Standard reports can take longer than Realtime. Key-event changes apply from
when they are enabled; they do not relabel earlier events retroactively.

## Optional: make the custom details available in reports

Go to **Admin > Data display > Custom definitions > Create custom dimension**.
Create the following with **Event** scope. Enter the event parameter exactly:

| Dimension name | Event parameter |
| --- | --- |
| Contact method | `contact_method` |
| Case study | `case_study` |
| Link position | `link_position` |
| Sample name | `sample_name` |

These dimensions let you break down custom events in reports or Explorations.
They are not needed for the event totals to be collected.

## A small monthly scorecard

- Sessions and acquisition sources: **Reports > Acquisition > Traffic acquisition**
  (the collection may appear under a business-objective group).
- Popular projects: **Pages and screens**, filtered to `/case-studies/`.
- Engagement: compare average engagement time by case-study page.
- Resume interest: sessions with `resume_click` / total sessions.
- Contact intent: sessions with `contact_click` / total sessions.
- Actual outcomes: separately record real inquiries, interviews, and offers.

Use session-based counts for rates, rather than dividing raw click counts by
sessions. A visitor can click more than once.

For a distinguishable LinkedIn profile link, use:
https://jacksonshawnt.github.io/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio

## If you use Google Tag Manager later

Migrate the existing Google tag to GTM and test it, rather than running the same
GA4 configuration in both places. The custom-event implementation would also
need to be reviewed as part of that migration. The site already uses the
`googletagmanager.com` domain to load the Google tag; that alone does not mean
a GTM container is installed.

## Google documentation

- Google tag installation: https://developers.google.com/tag-platform/gtagjs
- Custom events: https://developers.google.com/analytics/devguides/collection/ga4/events
- Enhanced measurement: https://support.google.com/analytics/answer/9216061
- Key events: https://support.google.com/analytics/answer/13128484
- Custom dimensions: https://support.google.com/analytics/answer/14240153
