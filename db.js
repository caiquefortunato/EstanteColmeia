var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/workshoptdc")
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))

module.exports = { findAll , insert , findOne , update, deleteOne }

// ---------- Estante (books) --------- //
function findAll(callback){  
    global.conn.collection("books").find({}).sort({nome : 1}).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("books").insert(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("books").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.conn.collection("books").update({_id:new ObjectId(id)}, customer, callback);
}

function deleteOne(id, callback){
    global.conn.collection("books").deleteOne({_id: new ObjectId(id)}, callback);
}