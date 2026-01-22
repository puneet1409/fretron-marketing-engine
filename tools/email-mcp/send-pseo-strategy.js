import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
  // Read the strategy document
  const strategyPath = path.join(__dirname, '../../docs/plans/2026-01-22-pseo-strategy-for-vikas.md');
  const strategyContent = fs.readFileSync(strategyPath, 'utf-8');
  
  const emailHtml = `
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<p>Hi Vikas,</p>

<p>I've been working on a programmatic SEO strategy for Fretron and I'd like you to own and execute this initiative.</p>

<h2 style="color: #2563eb;">The Opportunity</h2>
<p>We're sitting on unique data assets that competitors don't have:</p>
<ul>
  <li>87 value levers with quantified impact metrics</li>
  <li>36 KPIs with formulas and industry benchmarks</li>
  <li>Deep expertise across Steel, Chemical, and FMCG</li>
</ul>

<p>Currently, we're invisible for key searches like "What is TMS" and "best TMS India" - SAP and Oracle dominate. Our 155+ blog posts are scattered without topical structure.</p>

<h2 style="color: #2563eb;">The Proposal</h2>
<p>Use programmatic SEO to generate <strong>150+ pages</strong> from our structured data:</p>
<ul>
  <li>Lever-based content (87 pages)</li>
  <li>Industry-specific variants (Steel, Chemical, FMCG)</li>
  <li>KPI/glossary pages for topical authority</li>
  <li>Comparison pages (vs Locus, vs SAP, etc.)</li>
</ul>

<h2 style="color: #2563eb;">Technical Approach</h2>
<p>Leverage our existing Webflow site with:</p>
<ul>
  <li>Airtable as the data layer</li>
  <li>Whalesync for two-way sync to Webflow CMS</li>
  <li>Claude Code for content generation at scale</li>
  <li>Full instrumentation (GA4 + Search Console + HubSpot attribution)</li>
</ul>

<h2 style="color: #2563eb;">Investment Required</h2>
<ul>
  <li><strong>Monthly cost:</strong> ~$100-150/mo (Webflow Business + Whalesync)</li>
  <li><strong>One-time setup:</strong> 20-30 hours (data schema, templates, configuration)</li>
  <li><strong>Ongoing:</strong> Weekly content review and performance monitoring</li>
</ul>

<h2 style="color: #2563eb;">Expected Results (90 days)</h2>
<ul>
  <li>Indexed pages: 207 → 400+</li>
  <li>Keywords in top 100: ~50 → 300+</li>
  <li>Organic traffic: 2-3x current</li>
  <li>Foundation for AI citation (ChatGPT, Perplexity mentioning Fretron)</li>
</ul>

<h2 style="color: #2563eb;">Full Strategy Document</h2>
<p>The complete strategy document is included below for reference.</p>

<p><strong>Next steps:</strong> Let's set up a 30-min call to review and align on timeline. Please check our current Webflow plan (Account Settings → Billing) before we meet.</p>

<p>Let me know your thoughts.</p>

<p>Puneet</p>

<hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">

<h2 style="color: #6b7280;">Full Strategy Document</h2>
<pre style="background: #f9fafb; padding: 20px; border-radius: 8px; font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;">
${strategyContent}
</pre>

</body>
</html>
`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Fretron MIS <mis@updates.fretron.com>',
      to: ['vikas@fretron.com'],
      cc: ['somesh@buildrun.app', 'puneet@fretron.com'],
      subject: 'Programmatic SEO Strategy for Fretron - Need You to Drive This',
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      process.exit(1);
    }

    console.log('Email sent successfully!');
    console.log('Email ID:', data.id);
    console.log('To: vikas@fretron.com');
    console.log('CC: somesh@buildrun.app, puneet@fretron.com');
  } catch (err) {
    console.error('Failed to send email:', err);
    process.exit(1);
  }
}

sendEmail();
