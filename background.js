var urlRegex = /https?:\/\/([^\.]+\.)?facebook.com/;
var urls = [];

chrome.tabs.onCreated.addListener(function(tab) {
    if (tab.url) {
        urls[tab.id] = tab.url;
    }
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    urls[tabId] = changeInfo.url;
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, info) {
    var urlToCheck = urls[tabId];
    if(urlRegex.test(urlToCheck)) {
        chrome.cookies.remove({url: "https://www.facebook.com/", name: "c_user"});
        chrome.cookies.remove({url: "https://www.facebook.com/", name: "sb"});
    }
});