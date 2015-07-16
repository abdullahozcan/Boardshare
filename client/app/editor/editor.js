var $ = require('jquery');

module.exports.initialize = function(){
  var remotePeers = require('../helpers/remotePeers');
  module.exports.editor = ace.edit("editor");
  var editor = module.exports.editor;
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");


  //setting defaults
  var editSession = ace.createEditSession('ff', 'javascript');
  editor.getSession().setTabSize(2);
  editor.getSession().setUseWrapMode(true);

  window.doc = editor.getSession().getDocument();

  module.exports.editor.setByAPI = false;

  // "{"data":{"action":"insertText",
  // "range":{"start":{"row":0,"column":0},
  // "end":{"row":0,"column":1}},"text":"a"}}"
  editor.on('change', function(obj){
    console.log(obj);

    var data = obj.data;
    var action = data.action;
    var start = data.range.start;
    var text = data.text;

    if(!editor.setByAPI) {
      remotePeers.sendData({editor: {start: start, text: text, action: action}});
    }
  });

  //extensions
  $('#settings').on('click', function(){
    editor.execCommand('showSettingsMenu');
  });

  //menu functionality
  $('#fontSize').on('change', function(){
    var fontSize = this.options[this.selectedIndex].value;
    editor.setFontSize(parseInt(fontSize));
  });

  $('#wordWrap').on('change', function(){
    var wordWrap = this.options[this.selectedIndex].value;
    if (wordWrap === "false"){
      wordWrap = false;
    } else {
      wordWrap = true;
    }
    editor.getSession().setUseWrapMode(wordWrap);
  });

  $('#tabSize').on('change', function(){
    var tabSize = this.options[this.selectedIndex].value;
    editor.getSession().setTabSize(tabSize);
  });

  $('#highlightActiveLine').on('change', function(){
    var highlightActiveLine = this.options[this.selectedIndex].value;
    if (highlightActiveLine === "false"){
      highlightActiveLine = false;
    } else {
      highlightActiveLine = true;
    }
    editor.setHighlightActiveLine(highlightActiveLine);
  });

  $('#language').on('change', function(){
    var language = this.options[this.selectedIndex].value;
    editor.session.setMode("ace/mode/" + language);
  });
  module.exports.updateEditorByAPI = function(data){
    editor.setByAPI = true;
    // editor.setValue(data);
    if (data.action === 'insertText') {
      console.log('inserting text');
      var start = data.start;
      var text = data.text;
      doc.insert(start, text);
    } else if (data.action === 'removeText') {
      // var range;
      console.log('removing text');
    }
    editor.clearSelection();
    editor.setByAPI = false;
  };
};
