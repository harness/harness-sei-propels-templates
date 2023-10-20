
### How to use a Active Sprint Hygiene Propel template
- The templates need to be downloaded from the templates repository and then should be imported to the Propels section of relevant customer tenant.
- Once propel is imported successfully, kindly validate all nodes and add API keys to relevant ones.
- Org unit need to update mailto and hygine tag like mailto:xyz@harness.io
- Parameters node are to be updated with relevant parameter values applicable for the customer. For example, hygine_tag_id, integration_ids, ou_category_id etc.
## Parameters Reference

| Parameter             | Details                                                                |
| ----------------- | ------------------------------------------------------------------ |
| integrations | Jira/ADO Integration like ["2", "3"], get integrations id from https://eu1.app.propelo.ai/#/admin/configuration/integrations?tab=your_integrations page. Click on every Integration to get the ID|
| workspace_category | Workspace category ID, like 9261343d-362f-47a1-a436-ad4b4c29c199, get workspace_category in url(ou_category_tab) by clicking on Settings Menu -> Org Units   |
| hygiene_tag_id|  create new tag or use existing tag associated with OU for hygine nudge |
| base_url | Base url for ticket like https://harness.atlassian.net/browse/|
| sendSlackMsg | enable/disable Slack notifications  |
| sprint_dashboard| Active Sprint Hygine Dashboard ID   |
| agile|  Sprint or Kanban   |
| workspace_id | get workspace_id in url(ou_workspace_id) by clicking on Settings Menu -> Org Units  |



- As a final step, confirm the schedule and **enable** it before saving it.
