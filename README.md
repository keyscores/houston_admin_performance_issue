# houston_admin_performance_issue
Houston admin for Meteor creates many unnecessary subscriptions which stalls the server.

## Large UNPUBLISHED collections will stall an app
Even collections that NOT published by the server, will be published by Houston Admin, and cause significant performance issues. This seems to only happen when mongo is deployed on a different server than the meteor app.

Steps to reproduce: 

1. Set up meteor and mongo on DIFFERENT hosts. For example Meteor app on Digital Ocean, and Mongo on Compose.io
2. Deploy meteor app ( with MUP for example using sample configs in mup.json).
3. Add many records like 50,000,  to the db with Meteor.call('populateOriginal', 50000); 
4. Observe the server performance.
