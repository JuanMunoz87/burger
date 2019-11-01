var connection = require("./connection.js");


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
    
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

//-----------------------------
var orm ={
   selectAll: function(table, cb){
      var dbQuery = 'SELECT * FROM ' + table + ";";

      connection.query(dbQuery, function(err, res){
         if (err){
            throw err;
         }
         cb(res);
      });
    },
    insertOne: function(table, cols, vals, cb) {
      var dbQuery = "INSERT INTO " + table;
  
      dbQuery += " (";
      dbQuery += cols.toString();
      dbQuery += ") ";
      dbQuery += "VALUES (";
      dbQuery += printQuestionMarks(vals.length);
      dbQuery += ") ";
  
      console.log(dbQuery);
  
      connection.query(dbQuery, vals, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    updateOne: function(table, objColVals, condition, cb) {
      var dbQuery = "UPDATE " + table;
  
      dbQuery += " SET ";
      dbQuery += objToSql(objColVals);
      dbQuery += " WHERE ";
      dbQuery += condition;
  
      console.log(dbQuery);
      connection.query(dbQuery, vals, function(err, res) {
        if (err) {
          throw err;
        }  
        cb(res);
      });
    }
  };

module.exports = orm;