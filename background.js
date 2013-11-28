chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('devdiary.html')}, function(tab) {
    // Tab opened
  });
});

chrome.extension.onRequest.addListener(function(request,sender,sendResponse) {
  sendResponse({data: localStorage});
});
