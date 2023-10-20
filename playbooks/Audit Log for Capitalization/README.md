# Audit Log for Capitalization Workflow
This Propel can be used to generate a Propelo Table containing a record of capitalizable issue data over a time period. The table can then be exported to CSV and used for audit purposes.

## Setup (in advance of first run)
* Create a Table in Propelo that will be used to capture the audit data. You can use the sample.csv file included in this folder to seed creation.

## Configuration
### List Issues
* Edit request body to specify the issue types and time range desired for the report.

### Insert Row in LevelOps Table
* Specify the name of the Table created above for data capture. The table must exist and match the anticipated output of the Custom Script node prior to the first run. Adjust these nodes as needed to achieve desired output.
