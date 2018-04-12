var model_issue = function () {
  return function(nick_name, issue_content){
    return {
      nick_name: nick_name || '',
      issue_content: issue_content || ''
    };
  }
}
module.exports = model_issue;