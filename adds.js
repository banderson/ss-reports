const { exec } = require('shelljs');

const brandNew = [
  'HubSpot/ComposeUI',
  'HubSpot/ContentStrategyUI',
  'HubSpot/TerritoriesDisputeUI',
  'HubSpotProtected/BillingAdminUI',
  'HubSpotProtected/CheckoutUI',
  'HubSpot/SalesProAdminUI',
  'HubSpot/SalesSignupUI',
  'HubSpotProtected/PayNowUI',
  'HubSpot/ProductSetupUI',
  'HubSpot/PartnerCapacityUI',
];

const replacements = [
  'HubSpot/UserPreferencesUI',
  'HubSpot/WorkflowsReactUI',
  'HubSpot/LearningCenterUI',
  'HubSpot/IntegrationsUISpaceSword',
  'HubSpot/DevelopersUISpaceSword',
];

const replaced = [
  'HubSpotProtected/HubSettingsUI',
  'HubSpot/WorkflowsUI',
  'HubSpot/AcademyUI',
  'HubSpot/IntegrationsUI',
  'HubSpot/DevelopersUI',
];

const clone = (r, name) => {
  exec(`git clone --depth 1 git@git.hubteam.com:${r}.git repos/${name}`);
}

const report = (name, type) => {
  exec(`cloc repos/${name} --report-file=./reports/${type}/${name}`)
}

for (let r of replacements) {
  let name = r.split('/')[1];
  clone(r, name);
  report(name, 'replacements');
}

for (let r of replaced) {
  let name = r.split('/')[1];
  clone(r, name);
  report(name, 'replaced');
}

for (let r of brandNew) {
  let name = r.split('/')[1];
  clone(r, name);
  report(name, 'new');
}
