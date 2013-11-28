$(document).ready(function() {
  var $ol = $('ol');
  var $personal_gmail = $('input[name="personal-email"]');
  var $mentor_gmail = $('input[name="mentor-email"]');
  var i = 0;
  var str = '';

  window.onblur = function() {
    storeDiaryElements();
    storeDiaryEntries();
  };

  window.onfocus = function() {
    storeDiaryElements();
    storeDiaryEntries();
  };

  window.onbeforeunload = function() {
    storeDiaryElements();
    storeDiaryEntries();
  };

  if(localStorage.getItem('list')) {
    $ol.html(localStorage.getItem('list'));
  }

  if(localStorage.getItem('personal-email')) {
    $personal_gmail.val(localStorage.getItem('personal-email'));
  }

  if(localStorage.getItem('mentor-email')) {
    $mentor_gmail.val(localStorage.getItem('mentor-email'));
  }

  for(i=0; i<localStorage.length; i++) {
    str = localStorage.key(i);
    if(/\d\d-\d\d-\d\d/.test(str)) {
      $('#' + str).val(localStorage.getItem(str));
    }
  }

  $('#add_item_button').click(
    function() {
      var dayOfWeek = new Date().toDateString().split(' ')[0];
      var date = new Date().toLocaleDateString();
      var tag = new Date().toLocaleDateString().replace(/\//g, function(match) { return '-'; } );
      if( checkDuplicateEntry(date) !== true ) {
        var textarea = '<textarea id="'+tag+'" rows="5" cols="60"></textarea>';
        var button = '<input class="emailbutton" type="button" value="Email" />';
        var delete_entry = '<input class="deletebutton" type="button" value="Delete" />';
        $ol.prepend('<li><span>' + date + '</span>' + ' ' + dayOfWeek + '<br />' 
                   + textarea + '<br />' + button + delete_entry + '</li>' );
      } else {
        alert('Oops... you already have an entry for today');
      }
    }
  )

  function checkDuplicateEntry(date) {
    var lastDate = $('li').first().find('span').html();
    if( lastDate ===  date ) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: simplify storing diary entries
  function storeDiaryElements() {
    localStorage.setItem('list', $ol.html());
    localStorage.setItem('personal-email', $personal_gmail.val());
    localStorage.setItem('mentor-email', $mentor_gmail.val());
  }
  
  // store all textarea entries
  function storeDiaryEntries() {
    var array = $('textarea');
    for(var i=0; i<array.length; i++) {
      var str = $(array[i]).attr('id');
      localStorage.setItem(str,$(array[i]).val());
    }
  }
});


$(document).on('click','.deletebutton',function() {
  var confirm = prompt('Please type DELETE to really delete');
  if( confirm === 'DELETE') {
    var textid = $(this).closest('li').find('textarea').attr('id');
    localStorage.removeItem(textid);
    $(this).closest('li').remove(); 
  }
});


$(document).on('click','.emailbutton',function() {
  $(this).css('background-color','green');
  var entry = $(this).closest('li');
  var subject = 'Developer Diary: ' + entry.find('span').html();
  subject = encodeURI(subject);
  var body = entry.find('textarea').val();
  body = encodeURI(body);
  var email = $('input[name="personal-email"]').val() + ";" +
              $('input[name="mentor-email"]').val();
  var url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + 
            email + '&su=' + subject + '&body=' + body + '&tf=1';
  window.open(url,'_blank'); 
});


$(document).on('click','#export_button',function() {
  chrome.tabs.create({'url': chrome.extension.getURL('devexport.html')});
});



