## Propel-Templates 

### How to use a Propel template
- The templates need to be downloaded from the templates repository and then should be imported to the Propels section of relevant customer tenant.
- Once propel is imported successfully, kindly validate all nodes and add API keys to relevant ones.
- Propels containing Parameters node are to be updated with relevant parameter values applicable for the customer. For example, custom fields, product_id, integration_ids, etc.
- If there is no Parameters node, we must check if all the attributes like custom fields, product_id, integration_ids, etc. are relevant.
- If the propel sends an email or updates an existing table, it should be tested thoroughly before deployment.
- As a final step, confirm the schedule and **enable** it before saving it.

### How to troubleshoot a script node
- The Script node content can be run locally in VSCode or any other javascript compliant debugger.
- Install the studio in your system and then install a javascript debugger.
- Create a javascript file like **test.js** and then paste your **handleNode** function in there.
```
function handleNode() {
 // intialize required variables
 // code goes here

}
handleNode();
```
- Copy paste the output of variable values from previous nodes as required and initialize them.
- Run test.js as a javascript file and check the output in console (console.log is handy here).
- Kindly note that **levelops** object is not available to execute in local dev environment, hence the response needs to be mocked if used.
