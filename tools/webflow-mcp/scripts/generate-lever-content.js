/**
 * Generate SEO-optimized content for lever pages
 * Reads from data/levers.json and generates rich HTML content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Theme display names
const themeNames = {
  'buying_rate': 'Freight Procurement & Rate Optimization',
  'load_cube': 'Load Optimization & Consolidation',
  'routing_scheduling': 'Route Planning & Scheduling',
  'network_footprint': 'Network Design & Optimization',
  'capacity_vendor': 'Capacity & Vendor Management',
  'visibility_control_tower': 'Visibility & Control Tower',
  'yard_plant': 'Yard & Plant Operations',
  'docs_billing': 'Documentation & Billing',
  'risk_compliance': 'Risk & Compliance',
  'sustainability': 'Sustainability & ESG',
  'order_customer': 'Order & Customer Management'
};

// Industry display names
const industryNames = {
  'steel': 'Steel & Metals',
  'cpg': 'FMCG & Consumer Goods',
  '3pl': '3PL & Logistics Service Providers',
  'chemicals': 'Chemicals & Oil/Gas',
  'cement': 'Cement & Building Materials'
};

// Pillar names
const pillarNames = {
  'cost': 'Cost Reduction',
  'service': 'Service Improvement',
  'efficiency': 'Operational Efficiency',
  'compliance': 'Compliance & Governance',
  'esg': 'Sustainability & ESG'
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateLeverContent(lever) {
  const themeName = themeNames[lever.theme] || lever.theme;
  const industries = (lever.industries || []).map(i => industryNames[i] || i).join(', ');
  const pillars = (lever.pillars || []).map(p => pillarNames[p] || p).join(', ');

  // Calculate impact summary
  let impactSummary = '';
  if (lever.impactedKPIs && lever.impactedKPIs.length > 0) {
    const impacts = lever.impactedKPIs.map(kpi => {
      const range = kpi.expectedImpactRange;
      if (range && range.length === 2) {
        const direction = range[0] < 0 ? 'reduction' : 'improvement';
        return `${Math.abs(range[0])}-${Math.abs(range[1])}% ${direction}`;
      }
      return null;
    }).filter(Boolean);
    impactSummary = impacts.join(', ');
  }

  // Generate SEO title and description
  const seoTitle = `${lever.name}: How to Improve Logistics Performance | Fretron TMS`;
  const seoDescription = `Learn how ${lever.name.toLowerCase()} can help you ${lever.description.toLowerCase().substring(0, 100)}. Typical ROI: ${lever.typicalROI || 'Significant cost savings'}.`;

  // Generate main content HTML
  const mainContent = `
<h2>What is ${lever.name}?</h2>
<p>${lever.description}</p>

<h2>Why It Matters</h2>
<p>In today's competitive logistics landscape, ${lever.name.toLowerCase()} is a critical lever for organizations looking to optimize their supply chain operations. This capability directly impacts ${pillars.toLowerCase()} metrics.</p>

<h3>Key Benefits</h3>
<ul>
<li><strong>Measurable Impact:</strong> ${impactSummary || 'Significant improvements in operational KPIs'}</li>
<li><strong>Industry Application:</strong> Proven results across ${industries}</li>
<li><strong>ROI:</strong> ${lever.typicalROI || 'Typically delivers positive ROI within 6-12 months'}</li>
</ul>

<h2>How It Works</h2>
<p>Implementing ${lever.name.toLowerCase()} involves systematic changes to your logistics operations:</p>
<ol>
<li><strong>Assessment:</strong> Evaluate current processes and identify improvement opportunities</li>
<li><strong>Configuration:</strong> Set up the TMS capabilities to enable this lever</li>
<li><strong>Execution:</strong> Roll out the changes with proper change management</li>
<li><strong>Optimization:</strong> Continuously monitor and refine based on results</li>
</ol>

<h2>Implementation Requirements</h2>
<p>Before implementing ${lever.name.toLowerCase()}, ensure you have:</p>
<ul>
<li><strong>Data Readiness:</strong> ${lever.readiness?.data === 'green' ? 'Standard data requirements - most organizations are ready' : lever.readiness?.data === 'amber' ? 'Some data preparation needed' : 'Significant data preparation required'}</li>
<li><strong>Process Readiness:</strong> ${lever.readiness?.process === 'green' ? 'Minimal process changes needed' : lever.readiness?.process === 'amber' ? 'Moderate process adjustments required' : 'Significant process re-engineering needed'}</li>
<li><strong>Technology Readiness:</strong> ${lever.readiness?.technology === 'green' ? 'Standard TMS capabilities sufficient' : lever.readiness?.technology === 'amber' ? 'Some technology enhancements needed' : 'Advanced technology integration required'}</li>
</ul>

<h2>Industries That Benefit Most</h2>
<p>${lever.name} delivers particularly strong results in:</p>
<ul>
${(lever.industries || []).map(ind => `<li><strong>${industryNames[ind] || ind}:</strong> Industry-specific applications and proven use cases</li>`).join('\n')}
</ul>

<h2>Expected Results</h2>
<p><strong>Typical ROI:</strong> ${lever.typicalROI || 'Significant operational improvements'}</p>
${lever.benchmarkSource ? `<p><em>Industry Benchmark:</em> ${lever.benchmarkSource}</p>` : ''}

<h2>How Fretron TMS Enables This</h2>
<p>Fretron's cloud-based TMS platform provides built-in capabilities for ${lever.name.toLowerCase()}, including:</p>
<ul>
<li>Real-time visibility and control tower</li>
<li>Automated workflow execution</li>
<li>Analytics and reporting dashboards</li>
<li>Integration with existing ERP systems</li>
<li>Indian compliance (GST, e-way bill) built-in</li>
</ul>

<h2>Get Started</h2>
<p>Ready to implement ${lever.name.toLowerCase()} in your organization? Book a demo with our logistics experts to see how Fretron TMS can help you achieve these results.</p>
`.trim();

  return {
    name: lever.name,
    slug: slugify(lever.name),
    theme: themeName,
    description: `<p>${lever.description}</p>`,
    mainContent: mainContent,
    industries: industries,
    impactRange: impactSummary,
    typicalRoi: lever.typicalROI || '',
    seoTitle: seoTitle.substring(0, 60),
    seoDescription: seoDescription.substring(0, 160),
    leverId: lever.id,
    maturityLevel: lever.maturityLevel
  };
}

async function main() {
  // Read levers data
  const leversPath = path.join(__dirname, '../../../data/levers.json');
  const leversData = JSON.parse(fs.readFileSync(leversPath, 'utf-8'));

  console.log(`Processing ${leversData.length} levers...`);

  const generatedContent = leversData.map(lever => generateLeverContent(lever));

  // Save generated content to file
  const outputPath = path.join(__dirname, '../generated/lever-content.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(generatedContent, null, 2));

  console.log(`Generated content for ${generatedContent.length} levers`);
  console.log(`Output saved to: ${outputPath}`);

  // Show sample
  console.log('\nSample content (first lever):');
  console.log('Name:', generatedContent[0].name);
  console.log('SEO Title:', generatedContent[0].seoTitle);
  console.log('Theme:', generatedContent[0].theme);
  console.log('Industries:', generatedContent[0].industries);

  return generatedContent;
}

export { generateLeverContent };
export default main;

// Run if called directly
main().catch(console.error);
