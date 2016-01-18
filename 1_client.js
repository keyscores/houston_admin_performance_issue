// !!!!!!!! CLIENT CODE !!!!!!!!!!
if (Meteor.isClient) {
  Template.hello.helpers({
    reducedData: function(){
      var value = JSON.stringify( REDUCED.findOne() )
      return value
    }
  });

  Meteor.subscribe("reduced");
}
