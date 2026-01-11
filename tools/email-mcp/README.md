# Email MCP - MIS Notification Sender

Sends daily MIS digest emails to AEs using Resend.

## Quick Setup (5 minutes)

### 1. Get Resend API Key

1. Go to https://resend.com/signup (free account)
2. Create an API key at https://resend.com/api-keys
3. Copy the key (starts with `re_`)

### 2. Configure

```bash
cd tools/email-mcp
cp .env.example .env
```

Edit `.env`:
```
RESEND_API_KEY=re_your_key_here
SENDER_EMAIL=onboarding@resend.dev  # For testing
TEST_MODE=true  # Set to false to actually send
```

### 3. Install & Test

```bash
npm install
npm run send-digest
```

## Usage

### Send to all AEs
```bash
npm run send-digest
```

### Send to specific AE
```bash
node send-digest.js --ae avinash
node send-digest.js --ae abhishek
```

## Production Setup

1. **Verify your domain** in Resend dashboard
2. Update `SENDER_EMAIL` to your domain (e.g., `mis@fretron.com`)
3. Set `TEST_MODE=false`

## How It Works

1. Reads notification from `.claude/mis-state/notification-history/{ae}-{date}.json`
2. Generates HTML email from the notification data
3. Sends via Resend API
4. Updates notification tracking with sent timestamp

## Integration with MIS Workflow

After running compliance check:
```
"Run compliance check"    → Generates notifications
"Send daily digests"      → Runs this script
```

## Email Template

The digest includes:
- Priority action with context
- Secondary items (max 3)
- Weekly progress bars
- Actionable CTAs
