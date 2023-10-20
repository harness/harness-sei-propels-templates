# Integeration-Monitoring-playbooks

1. This playbook pulls all integrations for a given tenant
2. For each integration, an ingestion status is retrieved
3. For every failed integration error lo is captrued in Integration Monitoring table.

**Integration Monitoring Email**

1. This playbook fetches all failed integration records from Integration Monitoring table
2. Send he status email to receipients configured in email code snippet.

**Configuration**

1. Integration Monitoring table has been created to collect ingestion status logs
2. Recipient emails have been configured in 'prepare message' node in Integration Monitoring Email playbook
