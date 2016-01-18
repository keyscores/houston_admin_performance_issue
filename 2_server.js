
// !!!!!!!! SERVER CODE !!!!!!!!!!
if (Meteor.isServer) {
  //Only publish a very compact result.
  Meteor.publish("reduced", function(argument){
    return REDUCED.find({});
  });

  Meteor.methods({
    populateOriginal:function(numberOfRecords){
      // ORIGINAL.remove({});

      //using Mongo bulk operation to set up a list of operations , add operations, and execute operations.
      var bulkInsert = ORIGINAL.rawCollection().initializeUnorderedBulkOp();

      for(count = 0; count < numberOfRecords; count++){
        // console.log(count);
        bulkInsert.insert({name: "name", valueA: 1, valueB: 4});
      }

      Meteor.wrapAsync(bulkInsert.execute)(function(error, result){
        if (result){
          Meteor.call("reduceIt", function(error, result){
            if(error){
              console.log("error", error);
            }
            if(result){

            }
          });
        }
      });

    return "populateOriginal done"
    },
    reduceIt:function(){
      //aggregation pipeline for mongo
      var temp = ORIGINAL.rawCollection()
      var aggregateQuery = Meteor.wrapAsync(temp.aggregate, temp);
      var aggregatedResult = aggregateQuery([
        {
          $project:  {
            name: "$name",
            valueA: "$valueA",
            valueB: "$valueB",
          }
        },
        {
          $group: {
            _id: {//_id is a fixed property for mongo aggregate, cannot be changed
              name: "$name",
            },
            //project : "$project",
            totalA: {
              $sum:   "$valueA"
            },
            totalB: {
              $sum:   "$valueB"
            }
          }
        },
      ]);

    console.log(aggregatedResult);

    //clean up
    REDUCED.remove({});
    //insert the only record
    var result = aggregatedResult[0]
    delete result._id
    REDUCED.insert(result);

    return "reducIt done"

    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.call("populateOriginal", 50000, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
      }
    });
  });


  //Instrumentation: Using meteor Facts to see how many connections exist:
  Facts.setUserIdFilter(function () {
    //this sets permissions, but we can just allow anyone to see this.
    return true;
  });

}
