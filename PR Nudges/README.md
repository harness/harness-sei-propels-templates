# PR Nudges 


This propels send notifications for PRs Open for > N Days, PRs without Jira Linkage, PRs without review comments


### How to use a PR Nudges Propel template
- The templates need to be downloaded from the templates repository and then should be imported to the Propels section of relevant customer tenant.
- Once propel is imported successfully, kindly validate all nodes and add API keys to relevant ones.
- Parameters node are to be updated with relevant parameter values applicable for the customer. For example, integrations , workspace_category, etc.

## Parameters Reference

| Parameter             | Details                                                                |
| ----------------- | ------------------------------------------------------------------ |
| integrations | SCM Integration like ["2", "3"], get integrations id from Settings Menu -> integrations -> Your Integrations (tab) page. Click on every Integration to get the ID|
| workspace_category | Workspace category ID, like 9261343d-362f-47a1-a436-ad4b4c29c199, get workspace_category in url(ou_category_tab) by clicking on Settings Menu -> Org Units |
| prCreatedInLastDays|  Created PR's in last N day, default 10 Days |
| showPRviolatingSLA | enable/disable PR SLA Voilation content in notifications |
| sendEmail |  enable/disable email notifications|
| sendSlackMsg | enable/disable Slack notifications  |
| showPRwithoutJira|  enable/disable PR Without Jira Linkage content in notifications |
| showPRwithoutComments | enable/disable PR Without comments content in notifications |
| showLargePRs | enable/disable PR Without Large PR content in notifications |
| pr_sla_days| Open PR Threshold in days default 5 Days  |


- Org unit need to be updated with mailto tag like mailto:xyz@harness.io
- propel sends an email and slack notifications.
- As a final step, confirm the schedule and **enable** it before saving it.


