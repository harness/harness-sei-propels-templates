**Deprecated** - Use Modular Sprint report
______________________________________

# Sprint Report

## Overview
This Propel will prepare a comprehensive report for the most recent sprint in each defined Org Unit that has a sprint.

## Configuration
Visit each of the query nodes and substitute in correct product, integration IDs, lead time profile IDs, and API keys as needed.

## Sample
See the file [sampleOutput.html](sampleOutput.html) for a preview of the report that would be emailed by this Propel.

## Customizing & Troubleshooting
The [formatReport.js](formatReport.js) file is a copy of the script from the Custom Script node in the Propel with the addition of a short test harness at the end that allows the file to be executed using a basic JS runtime (e.g. CodeRunner within VS Code).
