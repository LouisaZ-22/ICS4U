/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/


use('worksheetDB')

// 3.1
db.users.find({})
db.users.find({}).limit(5)
db.users.find({}, {_id: 0, userId: 1, name: 1}).limit(5)  // only userId + name of 1st 5

// 3.2
db.users.find({userId: "u1004"})
db.posts.find({status: "published"})
db.comments.find({isFlagged: true})

// 4
db.posts.find({status: "published"}, {_id: 0, postId: 1, authorId: 1, title: 1, views: 1})
    .sort({views: -1}).skip(3).limit(3)

// 5
db.posts.find({views: {$gt: 500}})
db.users.find({"stats.followers": {$gte: 200} }) // ??
db.comments.find({likeCount: {$gte: 3, $lte: 7}})

// 6
db.users.find({role: {$in: ["student", "teacher"]}})  // role either student or teacher
db.posts.find({tags: {$in: ["mongodb", "node"]}})  // tags include mongodb or node
db.posts.find({editedAt: {$exists: true}})
db.users.find({github: {$exists: false}})

// 7
db.users.find({name: {$regex: "an", $options: "i"}})  // i = case insensitive
db.posts.find({title: {$regex: "^Mongo", $options: "i"}})  // ^ = start of string

// 8
db.posts.find({$and: [ {status: "published"}, {views: {$gt: 300}}, {tags: {$in: ["mongodb"]}} ]})
db.users.find({$or: [{"address.city": "Toronto"}, {"stats.followers": {$gte: 300}}]})

// 9
db.users.find({skills: "javascript"})  // array skills contains javascript
db.comments.find({mentions: "u1001"})
db.users.find({badges: { $elemMatch: {type: "honour", level: {$gte: 2}} }})  // match obj in arr w/ multiple conditions


// 10.1
db.users.find({userId: "u1001"})
db.posts.find({authorId: "u1001"}).sort({createdAt: -1})


// 10.2
let posts = db.comments.find({postId: "p2006"})
let authorIds = []
for (p of posts)
    authorIds.push(p.authorId)
db.users.find({userId: {$in: authorIds}})


// 10.3
let flaggedComments = db.comments.find({isFlagged: true})
let relatedPosts = []
for (c of flaggedComments) {
    relatedPosts.push(db.posts.find({postId: c.postId}))
}
let postAuthors = []
for (p of relatedPosts) {
    postAuthors.push(p.authorId)
}
db.users.find({userId: {$in: postAuthors}})