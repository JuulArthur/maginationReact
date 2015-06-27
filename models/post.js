var mongoose = require('mongoose');
var baucis = require('baucis');
var slug = require('slug')


var postSchema = new mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, required:true},
  slug: {type:String, unique: true},
  author: { type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'}
})

postSchema.pre('save', function(next){
  this.slug = slug(this.title)+'-'+this._id.getTimestamp().getTime()/1000;
  next();
});

module.exports = mongoose.model('post', postSchema);
