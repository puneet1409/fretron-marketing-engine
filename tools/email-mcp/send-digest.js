import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const resend = new Resend(process.env.RESEND_API_KEY);

// AE email mapping
const AE_EMAILS = {
  'avinash': 'avinash.soni@fretron.com',
  'abhishek': 'abhishek.dixit@fretron.com'
};

// Format Indian currency
function formatINR(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

// Generate progress bar
function progressBar(current, target) {
  const percentage = Math.min(100, (current / target) * 100);
  const filled = Math.round(percentage / 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
}

// Generate HTML email from notification data
function generateEmailHTML(notification, aeName) {
  const { content, level, subject } = notification;
  const { priority_action, secondary_items, progress, warning } = content;

  const levelColors = {
    1: '#4CAF50', // Green - gentle
    2: '#FF9800', // Orange - reminder
    3: '#f44336', // Red - summary
    4: '#9C27B0'  // Purple - escalation
  };

  const borderColor = levelColors[level] || '#4CAF50';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { border-left: 4px solid ${borderColor}; padding-left: 16px; margin-bottom: 24px; }
    .priority-box { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .priority-box h3 { margin: 0 0 12px 0; color: #333; }
    .context { background: #fff3cd; padding: 12px; border-radius: 4px; margin: 12px 0; font-style: italic; }
    .cta-button { display: inline-block; padding: 10px 20px; margin: 8px 8px 8px 0; background: ${borderColor}; color: white; text-decoration: none; border-radius: 4px; }
    .cta-button.secondary { background: #6c757d; }
    .secondary-items { margin: 20px 0; padding: 16px; background: #f8f9fa; border-radius: 8px; }
    .secondary-items h4 { margin: 0 0 12px 0; }
    .secondary-items ul { margin: 0; padding-left: 20px; }
    .progress-section { margin: 20px 0; font-family: monospace; background: #f8f9fa; padding: 16px; border-radius: 8px; }
    .progress-row { margin: 4px 0; }
    .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 12px; border-radius: 4px; margin: 16px 0; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">📊 Your Day-End Update</h2>
    <p style="margin: 4px 0 0 0; color: #6c757d;">${aeName} | ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  ${warning ? `<div class="warning">⚠️ ${warning}</div>` : ''}

  <div class="priority-box">
    <h3>🎯 TOP PRIORITY</h3>
    <p><strong>${priority_action.deal_name}</strong> (${formatINR(priority_action.deal_value)})</p>
    <p>Last touched: ${priority_action.days_since} days ago</p>
    ${priority_action.context ? `<div class="context">"${priority_action.context}"</div>` : ''}
    <div>
      ${priority_action.cta_options.map((cta, i) =>
        `<a href="#" class="cta-button ${i > 0 ? 'secondary' : ''}">${cta}</a>`
      ).join('')}
    </div>
  </div>

  ${secondary_items && secondary_items.length > 0 ? `
  <div class="secondary-items">
    <h4>📋 Also Needs Attention</h4>
    <ul>
      ${secondary_items.map(item => `<li><strong>${item.deal_name}</strong> → ${item.action_needed}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  ${progress ? `
  <div class="progress-section">
    <h4 style="margin: 0 0 12px 0;">📈 This Week So Far</h4>
    <div class="progress-row">Calls:    ${progressBar(progress.calls.current, progress.calls.target)} ${progress.calls.current}/${progress.calls.target}</div>
    <div class="progress-row">Emails:   ${progressBar(progress.emails.current, progress.emails.target)} ${progress.emails.current}/${progress.emails.target}</div>
    <div class="progress-row">Meetings: ${progressBar(progress.meetings.current, progress.meetings.target)} ${progress.meetings.current}/${progress.meetings.target}</div>
    <div class="progress-row">Notes:    ${progressBar(progress.notes.current, progress.notes.target)} ${progress.notes.current}/${progress.notes.target}</div>
  </div>
  ` : ''}

  <div class="footer">
    <p>This is an automated MIS notification from Fretron Marketing Engine.</p>
    <p>💡 Tip: Update HubSpot after calls to get credit automatically and enable AI-generated reports.</p>
  </div>
</body>
</html>
`;
}

// Send digest to a specific AE
async function sendDigest(aeId) {
  const today = new Date().toISOString().split('T')[0];
  const notificationPath = path.join(__dirname, '../../.claude/mis-state/notification-history', `${aeId}-${today}.json`);

  if (!fs.existsSync(notificationPath)) {
    console.log(`No notification found for ${aeId} on ${today}`);
    return null;
  }

  const notification = JSON.parse(fs.readFileSync(notificationPath, 'utf-8'));
  const aeEmail = AE_EMAILS[aeId];
  const aeName = aeId.charAt(0).toUpperCase() + aeId.slice(1);

  if (!aeEmail) {
    console.error(`No email found for AE: ${aeId}`);
    return null;
  }

  const html = generateEmailHTML(notification, aeName);

  // Check test mode
  const testMode = process.env.TEST_MODE === 'true';
  const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
  const senderName = process.env.SENDER_NAME || 'Fretron MIS';

  console.log(`\n📧 Sending digest to ${aeName} (${aeEmail})...`);
  console.log(`   Subject: ${notification.subject}`);
  console.log(`   Level: ${notification.level}`);
  console.log(`   Test Mode: ${testMode}`);

  if (testMode) {
    console.log('\n⚠️  TEST MODE: Email not actually sent. Set TEST_MODE=false in .env to send.');
    console.log('   Would send to:', aeEmail);
    return { success: true, testMode: true };
  }

  try {
    const result = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: aeEmail,
      subject: notification.subject,
      html: html
    });

    console.log('✅ Email sent successfully!');
    console.log('   ID:', result.data?.id);

    // Update notification with sent status
    notification.tracking.sent_at = new Date().toISOString();
    fs.writeFileSync(notificationPath, JSON.stringify(notification, null, 2));

    return result;
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
}

// Send to all AEs
async function sendAllDigests() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('SENDING MIS DAILY DIGESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const results = {};
  for (const aeId of Object.keys(AE_EMAILS)) {
    results[aeId] = await sendDigest(aeId);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  for (const [aeId, result] of Object.entries(results)) {
    const status = result?.success ? '✅' : result ? '⚠️' : '⏭️ Skipped';
    console.log(`${status} ${aeId}`);
  }

  return results;
}

// CLI
const args = process.argv.slice(2);
if (args[0] === '--ae') {
  sendDigest(args[1]);
} else {
  sendAllDigests();
}
