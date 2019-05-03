var urlRegex = /https?:\/\/([^\.]+\.)?facebook.com/;
var urls = [];

chrome.tabs.onCreated.addListener(function(tab) {
    if (urlRegex.test(tab.url)) {
        urls[tab.id] = true;
    }
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (urlRegex.test(changeInfo.url)) {
    urls[tabId] = true;
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, info) {
    if(tabId in urls) {
        // this logs out
        chrome.cookies.remove({url: "https://www.facebook.com/", name: "c_user"});
        // this removes one-click log in
        chrome.cookies.remove({url: "https://www.facebook.com/", name: "sb"});
    }
});