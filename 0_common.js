//collection globals
ORIGINAL = new Mongo.Collection("original");
ORIGINAL.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

REDUCED = new Mongo.Collection("reduced");
REDUCED.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
