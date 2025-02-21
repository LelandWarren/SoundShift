chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url?.startsWith("http")) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });
      console.log("Injected content.js into", tab.url);
    }
  });
  