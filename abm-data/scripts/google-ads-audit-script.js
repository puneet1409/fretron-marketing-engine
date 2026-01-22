/**
 * Google Ads Campaign Audit Script
 *
 * Extracts all campaign data for analysis.
 * Run this in Google Ads Scripts IDE and copy the output.
 *
 * Instructions:
 * 1. Go to Google Ads → Tools & Settings → Bulk Actions → Scripts
 * 2. Create new script, paste this code
 * 3. Click "Preview" to run without making changes
 * 4. Copy the Logger output and share it
 */

function main() {
  var dateRange = 'LAST_30_DAYS';

  var output = {
    accountInfo: getAccountInfo(),
    campaigns: getCampaigns(dateRange),
    adGroups: getAdGroups(dateRange),
    keywords: getKeywords(dateRange),
    ads: getAds(dateRange),
    summary: {}
  };

  // Calculate summary
  output.summary = calculateSummary(output);

  // Output as JSON for easy parsing
  Logger.log('=== GOOGLE ADS AUDIT DATA START ===');
  Logger.log(JSON.stringify(output, null, 2));
  Logger.log('=== GOOGLE ADS AUDIT DATA END ===');

  // Also log a readable summary
  logReadableSummary(output);
}

function getAccountInfo() {
  var account = AdsApp.currentAccount();
  return {
    customerId: account.getCustomerId(),
    name: account.getName(),
    currencyCode: account.getCurrencyCode(),
    timeZone: account.getTimeZone()
  };
}

function getCampaigns(dateRange) {
  var campaigns = [];
  var iterator = AdsApp.campaigns()
    .withCondition('Status IN [ENABLED, PAUSED]')
    .forDateRange(dateRange)
    .get();

  while (iterator.hasNext()) {
    var campaign = iterator.next();
    var stats = campaign.getStatsFor(dateRange);
    var budget = campaign.getBudget();

    campaigns.push({
      id: campaign.getId(),
      name: campaign.getName(),
      status: campaign.isEnabled() ? 'ENABLED' : 'PAUSED',
      type: campaign.getAdvertisingChannelType(),
      biddingStrategy: campaign.getBiddingStrategyType(),
      budget: {
        amount: budget ? budget.getAmount() : 0,
        isShared: budget ? budget.isExplicitlyShared() : false
      },
      performance: {
        impressions: stats.getImpressions(),
        clicks: stats.getClicks(),
        cost: stats.getCost(),
        conversions: stats.getConversions(),
        ctr: stats.getCtr(),
        avgCpc: stats.getAverageCpc(),
        conversionRate: stats.getConversionRate()
      },
      startDate: campaign.getStartDate() ? formatDate(campaign.getStartDate()) : null,
      endDate: campaign.getEndDate() ? formatDate(campaign.getEndDate()) : null
    });
  }

  return campaigns;
}

function getAdGroups(dateRange) {
  var adGroups = [];
  var iterator = AdsApp.adGroups()
    .withCondition('Status IN [ENABLED, PAUSED]')
    .withCondition('CampaignStatus IN [ENABLED, PAUSED]')
    .forDateRange(dateRange)
    .get();

  while (iterator.hasNext()) {
    var adGroup = iterator.next();
    var stats = adGroup.getStatsFor(dateRange);

    adGroups.push({
      id: adGroup.getId(),
      name: adGroup.getName(),
      campaignName: adGroup.getCampaign().getName(),
      status: adGroup.isEnabled() ? 'ENABLED' : 'PAUSED',
      performance: {
        impressions: stats.getImpressions(),
        clicks: stats.getClicks(),
        cost: stats.getCost(),
        conversions: stats.getConversions(),
        ctr: stats.getCtr(),
        avgCpc: stats.getAverageCpc()
      }
    });
  }

  return adGroups;
}

function getKeywords(dateRange) {
  var keywords = [];
  var iterator = AdsApp.keywords()
    .withCondition('Status IN [ENABLED, PAUSED]')
    .withCondition('AdGroupStatus IN [ENABLED, PAUSED]')
    .withCondition('CampaignStatus IN [ENABLED, PAUSED]')
    .forDateRange(dateRange)
    .orderBy('Clicks DESC')
    .withLimit(200)  // Top 200 keywords
    .get();

  while (iterator.hasNext()) {
    var keyword = iterator.next();
    var stats = keyword.getStatsFor(dateRange);

    keywords.push({
      text: keyword.getText(),
      matchType: keyword.getMatchType(),
      campaignName: keyword.getCampaign().getName(),
      adGroupName: keyword.getAdGroup().getName(),
      status: keyword.isEnabled() ? 'ENABLED' : 'PAUSED',
      qualityScore: keyword.getQualityScore(),
      performance: {
        impressions: stats.getImpressions(),
        clicks: stats.getClicks(),
        cost: stats.getCost(),
        conversions: stats.getConversions(),
        ctr: stats.getCtr(),
        avgCpc: stats.getAverageCpc(),
        avgPosition: stats.getAveragePosition ? stats.getAveragePosition() : null
      }
    });
  }

  return keywords;
}

function getAds(dateRange) {
  var ads = [];
  var iterator = AdsApp.ads()
    .withCondition('Status IN [ENABLED, PAUSED]')
    .withCondition('AdGroupStatus IN [ENABLED, PAUSED]')
    .withCondition('CampaignStatus IN [ENABLED, PAUSED]')
    .forDateRange(dateRange)
    .orderBy('Clicks DESC')
    .withLimit(100)  // Top 100 ads
    .get();

  while (iterator.hasNext()) {
    var ad = iterator.next();
    var stats = ad.getStatsFor(dateRange);

    var adData = {
      id: ad.getId(),
      type: ad.getType(),
      campaignName: ad.getCampaign().getName(),
      adGroupName: ad.getAdGroup().getName(),
      status: ad.isEnabled() ? 'ENABLED' : 'PAUSED',
      finalUrl: ad.urls().getFinalUrl(),
      performance: {
        impressions: stats.getImpressions(),
        clicks: stats.getClicks(),
        cost: stats.getCost(),
        conversions: stats.getConversions(),
        ctr: stats.getCtr()
      }
    };

    // Get ad-specific details based on type
    if (ad.isType().responsiveSearchAd()) {
      var rsa = ad.asType().responsiveSearchAd();
      adData.headlines = rsa.getHeadlines().map(function(h) { return h.text; });
      adData.descriptions = rsa.getDescriptions().map(function(d) { return d.text; });
    } else if (ad.isType().expandedTextAd()) {
      var eta = ad.asType().expandedTextAd();
      adData.headlines = [eta.getHeadlinePart1(), eta.getHeadlinePart2(), eta.getHeadlinePart3()].filter(Boolean);
      adData.descriptions = [eta.getDescription(), eta.getDescription2()].filter(Boolean);
    }

    ads.push(adData);
  }

  return ads;
}

function calculateSummary(data) {
  var totalCost = 0;
  var totalClicks = 0;
  var totalImpressions = 0;
  var totalConversions = 0;

  data.campaigns.forEach(function(c) {
    totalCost += c.performance.cost;
    totalClicks += c.performance.clicks;
    totalImpressions += c.performance.impressions;
    totalConversions += c.performance.conversions;
  });

  var activeCampaigns = data.campaigns.filter(function(c) { return c.status === 'ENABLED'; }).length;
  var pausedCampaigns = data.campaigns.filter(function(c) { return c.status === 'PAUSED'; }).length;

  return {
    dateRange: 'LAST_30_DAYS',
    totalCampaigns: data.campaigns.length,
    activeCampaigns: activeCampaigns,
    pausedCampaigns: pausedCampaigns,
    totalAdGroups: data.adGroups.length,
    totalKeywords: data.keywords.length,
    totalAds: data.ads.length,
    totals: {
      cost: totalCost,
      clicks: totalClicks,
      impressions: totalImpressions,
      conversions: totalConversions,
      ctr: totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) + '%' : '0%',
      avgCpc: totalClicks > 0 ? (totalCost / totalClicks).toFixed(2) : 0,
      costPerConversion: totalConversions > 0 ? (totalCost / totalConversions).toFixed(2) : 0
    }
  };
}

function logReadableSummary(data) {
  Logger.log('\n\n=== READABLE SUMMARY ===\n');
  Logger.log('Account: ' + data.accountInfo.name + ' (' + data.accountInfo.customerId + ')');
  Logger.log('Currency: ' + data.accountInfo.currencyCode);
  Logger.log('\n--- LAST 30 DAYS ---');
  Logger.log('Total Spend: ' + data.accountInfo.currencyCode + ' ' + data.summary.totals.cost.toFixed(2));
  Logger.log('Clicks: ' + data.summary.totals.clicks);
  Logger.log('Impressions: ' + data.summary.totals.impressions);
  Logger.log('CTR: ' + data.summary.totals.ctr);
  Logger.log('Avg CPC: ' + data.summary.totals.avgCpc);
  Logger.log('Conversions: ' + data.summary.totals.conversions);
  Logger.log('Cost/Conversion: ' + data.summary.totals.costPerConversion);

  Logger.log('\n--- CAMPAIGNS ---');
  data.campaigns.forEach(function(c) {
    Logger.log('  ' + c.status + ' | ' + c.name);
    Logger.log('      Budget: ' + c.budget.amount + '/day | Spend: ' + c.performance.cost.toFixed(2));
    Logger.log('      Clicks: ' + c.performance.clicks + ' | CTR: ' + (c.performance.ctr * 100).toFixed(2) + '%');
    Logger.log('      Conversions: ' + c.performance.conversions);
  });

  Logger.log('\n--- TOP 10 KEYWORDS BY CLICKS ---');
  data.keywords.slice(0, 10).forEach(function(k, i) {
    Logger.log('  ' + (i+1) + '. [' + k.matchType + '] ' + k.text);
    Logger.log('     Clicks: ' + k.performance.clicks + ' | Cost: ' + k.performance.cost.toFixed(2) + ' | QS: ' + (k.qualityScore || 'N/A'));
  });

  Logger.log('\n--- TOP 5 ADS BY CLICKS ---');
  data.ads.slice(0, 5).forEach(function(a, i) {
    Logger.log('  ' + (i+1) + '. ' + a.campaignName + ' > ' + a.adGroupName);
    Logger.log('     Clicks: ' + a.performance.clicks + ' | CTR: ' + (a.performance.ctr * 100).toFixed(2) + '%');
    if (a.headlines) {
      Logger.log('     Headlines: ' + a.headlines.slice(0, 3).join(' | '));
    }
  });
}

function formatDate(date) {
  if (!date) return null;
  return date.year + '-' +
         String(date.month).padStart(2, '0') + '-' +
         String(date.day).padStart(2, '0');
}
