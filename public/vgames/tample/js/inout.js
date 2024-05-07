chrome.action.onClicked.addListener(function(tab) {
	chrome.tabs.create({ 
  url: "index.html"
  });
  });
  chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.create({ url: "index.html"});
	chrome.tabs.create({ url: "https://crieart.com.br/game/tomb-runner/"});
  });
  
  
  if(chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://crieart.com.br/');
  } else {
  }