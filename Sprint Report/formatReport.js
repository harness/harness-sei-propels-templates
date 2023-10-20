function handleNode(context) {
    var sprint = JSON.parse(context.getParam('sprint'));
    var ou = context.getParam('ou');
    var sprintMetrics = JSON.parse(context.getParam('sprintMetrics'));
    var hygieneAssignee = JSON.parse(context.getParam('hygieneAssignee'));
    var hygieneStoryPoints = JSON.parse(context.getParam('hygieneStoryPoints'));
    var leadTime = JSON.parse(context.getParam('leadTime'));

    var message = '<h1>Sprint Report for ' + ou + '</h1>';

    message += '<h2>Sprint: ' + sprint.key + '</h2>';

    message += '<h3>Sprint Status</h3>';
    message += '<table border=1 cellpadding=5 style="border-collapse: collapse; ">'

    var addTableRow = function (vals, isHeader = false) {
        var rowHtml = '<tr>';
        vals.forEach(val => {
            rowHtml += (isHeader ? '<th>' : '<td>') + val + (isHeader ? '</th>' : '</td>');
        });
        rowHtml += '</tr>';
        message += rowHtml;
    };
    var headers = ['Velocity (Total Points)', 'Total Tickets'];
    var vals = [sprint.total_story_points, sprint.total_tickets];
    if (sprintMetrics.length > 0) {
        var metric = sprintMetrics[0];
        var deliveredToCommit = Math.round(metric.delivered_story_points / metric.committed_story_points * 100);
        headers.push('Delivered to Commit');
        vals.push(deliveredToCommit + '%');
    }
    addTableRow(headers, true);
    addTableRow(vals);
    message += '</table>';

    message += '<h3>Hygiene Misses</h3>';
    message += '<table border=1 cellpadding=5 style="border-collapse: collapse; ">'
    addTableRow(['Tickets without Assignee', 'Stories/Bugs without Story Points'], true);
    addTableRow([(hygieneAssignee.length ? hygieneAssignee[0].total_tickets : 0),
    (hygieneStoryPoints.length ? hygieneStoryPoints[0].total_tickets : 0)]);
    message += '</table>';

    message += '<h3>Story Point Breakdown</h3>';
    message += '<table border=1 cellpadding=5 style="border-collapse: collapse; ">'
    addTableRow(['Ticket Type', 'Total Tickets', 'Story Points'], true);
    sprint.stacks.forEach(type => {
        addTableRow([type.key, type.total_tickets, type.total_story_points]);
    });
    message += '</table>';

    if (leadTime.length > 0) {
        var roundDays = function (secs) {
            return Math.round(secs / 86400);
        };
        var roundDays2 = function (secs) {
            return Math.round(((secs / 86400) + Number.EPSILON) * 100) / 100;
        };
        message += '<h3>Lead Time for Stories and Bugs</h3>';
        message += '<table border=1 cellpadding=5 style="border-collapse: collapse; ">'
        addTableRow(['', 'Average Time (Days)', 'Median Time (Days)', 'P90 (Days)', 'P95 (Days)'], true);
        var mean = 0, median = 0, p90 = 0, p95 = 0;
        leadTime.forEach(lt => {
            mean += lt.mean;
            median += lt.median;
            p90 += lt.p90;
            p95 += lt.p95;
        });
        addTableRow(['Overall Lead Time', roundDays(mean), roundDays(median), roundDays(p90), roundDays(p95)]);
        message += '</table>';

        message += '<h3>Lead Time Breakdown</h3>';
        message += '<table border=1 cellpadding=5 style="border-collapse: collapse; ">'
        addTableRow(['Stage', 'Average Time (Days)', 'Median Time (Days)', 'P90 (Days)', 'P95 (Days)', 'Rating'], true);
        leadTime.forEach(lt => {
            addTableRow([lt.key,
            roundDays2(lt.mean),
            roundDays2(lt.median),
            roundDays2(lt.p90),
            roundDays2(lt.p95),
            lt.velocity_stage_result.rating]);
        });
        message += '</table>';
    }

    return {
        state: 'success',
        output: {
            'message': message
        }
    };
}

// basic test harness with sample data; allows this file to be run using CodeRunner for VS Code
var ctx = {
    'getParam': function (param) {
        return this[param];
    },
    'sprint': '{ "key": "LO20211014", "total_tickets": 278, "total_story_points": 364, "total_unestimated_tickets": 123, "stacks": [ { "key": "BUG", "total_tickets": 87, "total_story_points": 61, "total_unestimated_tickets": 41 }, { "key": "EPIC", "total_tickets": 3, "total_story_points": 77, "total_unestimated_tickets": 1 }, { "key": "IMPROVEMENT", "total_tickets": 24, "total_story_points": 32, "total_unestimated_tickets": 8 }, { "key": "NEW FEATURE", "total_tickets": 3, "total_story_points": 7, "total_unestimated_tickets": 0 }, { "key": "STORY", "total_tickets": 75, "total_story_points": 103, "total_unestimated_tickets": 34 }, { "key": "SUB-TASK", "total_tickets": 23, "total_story_points": 32, "total_unestimated_tickets": 6 }, { "key": "TASK", "total_tickets": 63, "total_story_points": 52, "total_unestimated_tickets": 33 } ] }',
    'sprintMetrics': '[{ "key": "1641790663", "additional_key": "LO20211217", "integration_id": "2", "sprint_id": "117", "sprint_goal": "", "committed_story_points": 14, "commit_delivered_story_points": 5, "delivered_story_points": 21, "creep_story_points": 0, "delivered_creep_story_points": 0, "committed_keys": [ "LEV-4039", "LEV-4235", "LEV-4378", "LEV-3526", "LEV-4416", "LEV-4376", "LEV-4377", "LEV-4374", "LEV-3264", "LEV-4375", "LEV-3180", "LEV-4391", "LEV-4424", "LEV-4501", "LEV-4402", "LEV-4248", "LEV-4326", "LEV-4502", "LEV-4444", "LEV-4445", "LEV-3933", "LEV-4503", "LEV-4448", "LEV-4327", "LEV-3833", "LEV-4365", "LEV-4487", "LEV-4443", "LEV-4366", "LEV-4385", "LEV-4341", "LEV-4023" ], "commit_delivered_keys": [ "LEV-4501", "LEV-4039", "LEV-4402", "LEV-4248", "LEV-4326", "LEV-4444", "LEV-4378", "LEV-3933", "LEV-4503", "LEV-4448", "LEV-4327", "LEV-4416", "LEV-4376", "LEV-4365", "LEV-4487", "LEV-4443", "LEV-4377", "LEV-4366", "LEV-4374", "LEV-4341", "LEV-4375" ], "delivered_keys": [ "LEV-4501", "LEV-4039", "LEV-4402", "LEV-4248", "LEV-4326", "LEV-4444", "LEV-4378", "LEV-3933", "LEV-4503", "LEV-4448", "LEV-4327", "LEV-4416", "LEV-4376", "LEV-4365", "LEV-4487", "LEV-4443", "LEV-4377", "LEV-4366", "LEV-4374", "LEV-4341", "LEV-4375" ], "creep_keys": [], "delivered_creep_keys": [], "total_issues": 32, "total_unestimated_issues": 25, "unestimated_issues_by_type": { "TASK": 6, "BUG": 14, "IMPROVEMENT": 1, "STORY": 4 }, "story_points_by_issue": { "LEV-4039": { "before": 0, "after": 0 }, "LEV-4235": { "before": 1, "after": 1 }, "LEV-4378": { "before": 0, "after": 1 }, "LEV-3526": { "before": 0, "after": 0 }, "LEV-4416": { "before": 0, "after": 0 }, "LEV-4376": { "before": 0, "after": 1 }, "LEV-4377": { "before": 0, "after": 1 }, "LEV-4374": { "before": 0, "after": 1 }, "LEV-3264": { "before": 3, "after": 3 }, "LEV-4375": { "before": 0, "after": 1 }, "LEV-3180": { "before": 2, "after": 2 }, "LEV-4391": { "before": 0, "after": 0 }, "LEV-4424": { "before": 0, "after": 0 }, "LEV-4501": { "before": 0, "after": 1 }, "LEV-4402": { "before": 0, "after": 1 }, "LEV-4248": { "before": 0, "after": 1 }, "LEV-4326": { "before": 1, "after": 1 }, "LEV-4502": { "before": 0, "after": 0 }, "LEV-4444": { "before": 0, "after": 2 }, "LEV-4445": { "before": 0, "after": 2 }, "LEV-3933": { "before": 3, "after": 3 }, "LEV-4503": { "before": 0, "after": 0 }, "LEV-4448": { "before": 0, "after": 1 }, "LEV-4327": { "before": 1, "after": 1 }, "LEV-3833": { "before": 3, "after": 3 }, "LEV-4365": { "before": 0, "after": 1 }, "LEV-4487": { "before": 0, "after": 1 }, "LEV-4443": { "before": 0, "after": 1 }, "LEV-4366": { "before": 0, "after": 1 }, "LEV-4385": { "before": 0, "after": 0 }, "LEV-4341": { "before": 0, "after": 1 }, "LEV-4023": { "before": 0, "after": 0 } } }]',
    'ou': 'Team X',
    'hygieneAssignee': '[ { "key": "LEV", "mean_story_points": 0.6363636363636364, "total_tickets": 11, "total_story_points": 7 } ]',
    'hygieneStoryPoints': '[ { "key": "LEV", "mean_story_points": 0.0, "total_tickets": 74, "total_story_points": 0 } ]',
    'leadTime': '[{"key":"Lead time to first commit","additional_key":"First Commit","median":8627,"count":140,"mean":747803.4357142857,"p90":1798587,"p95":3597284,"velocity_stage_result":{"lower_limit_value":864000,"lower_limit_unit":"SECONDS","upper_limit_value":2592000,"upper_limit_unit":"SECONDS","rating":"GOOD"}},{"key":"PR Creation Time","additional_key":"Pull Request Created","median":0,"count":140,"mean":1326.2857142857142,"p90":92,"p95":2245,"velocity_stage_result":{"lower_limit_value":600,"lower_limit_unit":"MINUTES","upper_limit_value":1800,"upper_limit_unit":"MINUTES","rating":"GOOD"}},{"key":"Time For First Review Comment","additional_key":"Pull Request Review Started","median":0,"count":140,"mean":143057.7785714286,"p90":57675,"p95":252350,"velocity_stage_result":{"lower_limit_value":1,"lower_limit_unit":"DAYS","upper_limit_value":2,"upper_limit_unit":"DAYS","rating":"GOOD"}},{"key":"Time for Approval","additional_key":"Pull Request Approved","median":0,"count":140,"mean":17275.02142857143,"p90":0,"p95":0,"velocity_stage_result":{"lower_limit_value":10,"lower_limit_unit":"DAYS","upper_limit_value":30,"upper_limit_unit":"DAYS","rating":"GOOD"}},{"key":"Merge Time","additional_key":"Pull Request Merged","median":10,"count":140,"mean":330974.46428571426,"p90":778264,"p95":1776853,"velocity_stage_result":{"lower_limit_value":864000,"lower_limit_unit":"SECONDS","upper_limit_value":2592000,"upper_limit_unit":"SECONDS","rating":"GOOD"}},{"key":"Ready for Prod","additional_key":"Ticket Status Changed from READY FOR PROD","median":0,"count":140,"mean":1578197.3142857142,"p90":5821819,"p95":10786360,"velocity_stage_result":{"lower_limit_value":4,"lower_limit_unit":"DAYS","upper_limit_value":11,"upper_limit_unit":"DAYS","rating":"GOOD"}}]'
};
var retObj = handleNode(ctx);
console.log(retObj.output.message);