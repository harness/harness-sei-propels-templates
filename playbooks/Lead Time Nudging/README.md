# Lead Time Nudging
This is a Propel that can be used to nudge based on excessive time spent in a lead time stage by a particular record.

## Configuration
### LevelOps Query (node 6)
* Edit request body to specify velocity_config_id (Lead Time Profile), product_id, and integration_ids matching your tenant environment.

### Check and prep message (custom script node 4)
* Set stageName to match the name of the stage in your Lead Time Profile for which you wish to enforce time.
