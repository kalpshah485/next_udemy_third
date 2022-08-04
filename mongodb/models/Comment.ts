import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  email: String,
  name: String,
  text: String,
  eventId: String,
}, {
  timestamps: true
});

CommentSchema.methods.toJSON = function () {
  var obj = this.toObject()

  obj.id = obj._id;
  delete obj._id;

  return obj;
}

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);