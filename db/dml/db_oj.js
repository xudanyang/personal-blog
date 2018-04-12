// chenbin 2016/2/3
/**
 * tb_oj operations
 */
var db_sqlite3_oj = function () {
  var sqlite3 = require('sqlite3').verbose();
  // 目录从项目根目录开始.
  var db = new sqlite3.Database('db/data/OJDisplay.db');
  
  /**
   * insert one record
   * @param row the record to add
   * @param callback function callback 
   */
  var insertIfNotExists = function (row, callback) {
    var pid = row.pid,
      ptitle = row.ptitle,
      pdesc = row.pdesc,
      psolu = row.psolu;
    
    // db.run(`CREATE TABLE if not exists tb_oj (pid unique, ptitle text, pdesc text, psolu text, psubmit_time int, pmodify_time int);`);
    db.get('select * from tb_oj where pid=?', pid, function (err, row) {
      if (err) {
        callback(err);
      } else if (row){
        // Already Exists
        callback("Record Already Exists");
      } else {
        db.run('insert into tb_oj(pid, ptitle, pdesc, psolu, psubmit_time) values(?,?,?,?,?)',
          pid, ptitle, pdesc, psolu, Date.now(), callback);
      }
    });
  };
  /**
   * 
   */
  var updateRecord = function (row, callback) {
    var pid = row.pid,
      ptitle = row.ptitle,
      pdesc = row.pdesc,
      psolu = row.psolu;
    
    db.run('update tb_oj set ptitle=?,pdesc=?,psolu=?,pmodify_time=? where pid=?',
          ptitle, pdesc, psolu, Date.now(), pid, callback);
  };
  
  // callback(err, rows);
  var getOne = function (pid, callback){
    if(!pid) {
        callback("Error: Pid Required.");
        return;
    }
    db.all('select * from tb_oj where pid=?', pid, callback);
  };
  
  var deleteOne = function (pid, callback) {
    if(!pid) {
      return callback('Error: pid Required.');
    }
    db.run('delete from tb_oj where pid=?', pid, callback);
  }
  
  // callback(err, rows);
  var getAll = function (callback){
    db.all('select * from tb_oj order by pid', callback);
  };
  var getIssueAll = function (callback) {
    db.all('select * from tb_issue', callback);
  }
  var insertIssue = function (issue_body, callback) {
    db.run('insert into tb_issue(nick_name, issue_content, add_date) values(?,?,?)'
    ,issue_body.nick_name
    ,issue_body.issue_content
    ,Date.now(), callback);
  }
  
  return {
    insertIfNotExists: insertIfNotExists,
    
    getOne: getOne,
    getAll: getAll,
    getIssueAll: getIssueAll,
    
    updateRecord: updateRecord,
    
    addIssue: insertIssue,
    
    deleteOne: deleteOne
  };
};
module.exports = db_sqlite3_oj;