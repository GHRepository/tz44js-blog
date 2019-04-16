const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: ObjectId,
    ref: 'users'
  },
  tips: String,
  // role: {
  //   type: String,
  //   default: 1
  // },
  // avatar: {
  //   type: String,
  //   default: "/avatar/default.jpg"
  // },
  // articleNum: Number,
  // commentNum: Number
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created'
  }
})


module.exports = ArticleSchema