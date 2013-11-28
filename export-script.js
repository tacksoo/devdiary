//TODO: simplify storing diary entries for easy retrieval 
$(document).ready(function() {
  chrome.extension.sendRequest({}, function(response) {
    localStorage = response.data;

    $textarea = $('textarea');

    var matchesDate = localStorage['list'].match(/\d\d\/\d\d\/\d\d\d\d/g);
    var matchesDay = localStorage['list'].match(/\b[A-Z][a-z][a-z]\b/g);
    var str = '';

    for(var i=0; i<matchesDay.length; i++) {
       str = str + matchesDate[i] + ' ' + matchesDay[i] + '\n';
       var textid = matchesDate[i].replace(/\//g,'-');
       str = str + localStorage[textid] + '\n\n';
    }

    $textarea.val(str);
  });
});
