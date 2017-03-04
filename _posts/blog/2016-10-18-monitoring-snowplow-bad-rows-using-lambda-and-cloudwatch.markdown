---
layout: post
title: "Monitoring Snowplow bad rows using Lambda and Cloudwatch"
description: Snowplow Analytics tutorial using Amazon Lambda and Amazon Cloudwatch to set up monitoring for the number of bad rows that are inserted into Elasticsearch over a period of time.
date: 2016-10-18 16:54:46
author: Mike Robins
categories:
- blog
- Infrastructure
img: 4a44.lambda.jpg
tags: Snowplow Analytics lambda
---

In this tutorial we'll use Amazon Lambda and Amazon Cloudwatch to set up monitoring for the number of bad rows that are inserted into Elasticsearch over a period of time. This allows us to set an alert for the threshold of bad rows, and generates an email or notification when this threshold has been exceeded. Snowplow users on the realtime pipeline will find this most useful, however users running loads in batch can also adapt this monitoring.

We'll use the following services throughout this tutorial so check first that they are available in your AWS region of choice:

* Cloudwatch rules
* Lambda

Below is an overview of what we'll be setting up.

A Cloudwatch rule will trigger a Lambda function every 5 minutes. This Lambda function will query our Elasticsearch cluster, and return the number of rows in the bad index for the last 5 minutes. Finally, we'll send this result to our own custom metric to allow for monitoring and alerting using Cloudwatch alarms.

**Lambda execution role**

First, let's set up an execution role for our AWS Lambda function. This execution role will allow access to the appropriate resources, namely being able to submit a metric to Cloudwatch.

1. Navigate to IAM in the AWS console.
2. Select 'Policy' and 'Create Policy' in this interface.
3. Select 'Create Your Own Policy'
4. Name the policy document and provide a description. Under the 'Policy document' we'll use the following configuration.

{% highlight ruby linenos %}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudwatch:PutMetricData"
            ],
            "Resource": "*"
        }
    ]
}
{% endhighlight %}


![Lambda bad rows AWS IAM Policy](/assets/img/blog/iam-policy-bad-rows-lambda.png)


This will allow the Lambda function to log to Cloudwatch for debugging as well as pushing data for the bad rows metric we will define shortly.

Next, we'll create a role for the Lambda function to use, and attach this policy.

1. In IAM select 'Role' and 'Create New Role'.
2. Under 'AWS Service Roles' select **'AWS Lambda'**
3. Search and select the policy you created above, review the policy and hit 'Create Role'.

**Creating our Lambda function to retrieve the number of bad rows**

1. In the AWS Lambda dashboard select 'Create a Lambda function`
2. Select the blueprint as 'Blank function' as we'll be writing our own code for this function.
3. For the moment, leave triggers blank and hit 'Next'.
4. Name your function, e.g., snowplow_bad_rows_count
5. In this example we will use the 'Python 2.7' runtime.
6. For the function code copy and paste the function below.

{% highlight ruby linenos %}
import json
import urllib2
import boto3
# import required libraries

def lambda_handler(event, context):
    host = 'your-hostname-here.com' # your elasticsearch host
    port = 9200 # your elasticsearch port
    index_name = 'bad-alias' # your elasticsearch bad index

    url = 'http://{0}:{1}/{2}/_count'.format(host, port, index_name)
    data = '{"query": {"range": {"failure_tstamp": {"gt": "now-5m"}}}}' # query to filter data

    request = urllib2.urlopen(url, data) # connect to Elasticsearch
    result = json.loads(request.read()) # read and decode JSON response
    bad_row_count = result.get('count') # select the count property
    request.close() # close the connection

    client = boto3.client('cloudwatch') # setup a cloudwatch client
    data = [
            {
                'MetricName': 'bad_rows_count',
                'Value': bad_row_count,
                'Unit': 'Count'
            }
            ]
    # prepare a payload to send with the name 'bad_rows_count'
    client.put_metric_data(Namespace='snowplow', MetricData=data) # send the data to Cloudwatch using the 'snowplow' namespace
    return bad_row_count # return the number of bad rows in the last 5 minutes
{% endhighlight %}

In the above snippet change the host variable to point to your Elasticsearch cluster. This is likely to be either a load balancer if you're running Elasticsearch on EC2 instances, or the Elasticsearch endpoint if using AWS Elasticsearch Service.

You should also change port, to the appropriate port which is likely to be either `9200` (default) or `80` is using Elasticsearch Service or port-forwarding on a load balancer.

Finally, enter the name of the index. If you're unsure of what this is by adding `/_cat/indices` to the end of your Elasticsearch URL which will list all indices in your Elasticsearch cluster.

1. To modify the period in which Elasticsearch looks for bad events change the `'now-5m'` string to the period required, e.g., for 1 hour use `'now-1h'`.
2. To modify the name of the metric, change the `'MetricName'` in the data payload
3. To modify the event namespace, change the Namespace in the `put_metric_data` call.
4. The handler field can be left the same.
5. Under 'Existing role' select the role we created in the previous steps.
6. The memory and timeout of advanced settings can be left the same.
7. Select an appropriate VPC. If running an Elasticsearch cluster within a VPC you may need to use this VPC, however if you're cluster is accessible externally 'No VPC' may work.
8. Review the function and select 'Create function'.
9. Let's quickly test the function to ensure that it is able to connect to Elasticsearch successfully and produces the expected output.
10. Select 'Test' in the interface, and 'Hello World' as the sample event template. The data we use as input does not matter as our event only produces output.
11. Select 'Save and test'
12. Your function should successfully execute and return the number of bad rows in the Elasticsearch index selected. You can verify this using the Kibana interface if required.
13. If the function times out, double check the address and settings for your Elasticsearch cluster, the function may not be able to connect.

#### Create our Cloudwatch trigger

1. In the Cloudwatch interface, select 'Rules' under 'Events' from the left-hand pane.
2. Select 'Create Rule'
3. For the event source select 'Schedule', and for the moment we'll leave it as the default of fixed rate of every 5 minutes. This sets the option of when, and how often our Lambda function will run and our metric will update. More information about the cron syntax AWS uses can be found here.
4. Under 'Targets', select 'Lambda function' and the name of the Lambda function you created above.
5. Select 'Configure details'
6. Add a meaningful name and description for this rule and leave the enabled checkbox selected. Select 'Create Rule'.

#### Check our metric is working in Cloudwatch

1. In the Cloudwatch interface scroll down in the left-hand panel to the bottom and under 'Custom Metrics...' select 'snowplow', your metric name should appear here and by clicking the checkbox you should see a point of data every 5 minutes. If you've only just set this up you may only see one data point.

#### To create an alarm

1. Select the metric and select the 'Create Alarm' button in the right hand panel under 'Actions'.
2. Set a meaningful name and description for the alarm, and a threshold to trigger at based upon the number of bad rows you expect to have in a 5 minute period. Anything above this threshold will trigger the alarm.
3. Under Actions, you can select a notification list (if you have a SNS topic set up) or alternately if you select 'New list' you can enter a comma delimited list of email addresses.
4. This will notify users when the alarm is triggered based on the criteria you have set.

### Cost

Running this monitoring will cost approximately $0.69 a month depending on your usage, frequency and availability zone. For many users some of this cost may be included in the AWS free tier.

* $0.50 per custom metric
* $0.10 per alarm
* ~$0.09 for Cloudwatch PutMetricData (9000 requests/month, assuming rule triggers every 5 minutes)

If you have any questions or comments feel free to leave them in the comment section below, or in the Snowplow discourse forum.
