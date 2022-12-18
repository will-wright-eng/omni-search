function spawnTabs(text) {
  const urlList = [
    'https://searx.tuxcloud.net/search?q=',
    'https://search.feep.dev/search?q=',
    'https://searchcode.com/?q=',
    'https://duckduckgo.com/?q=',
    'https://grep.app/search?q=',
    // 'https://publicwww.com/search?q='
  ];

  for (const x in urlList) {
    // Encode user input for special characters , / ? : @ & = + $ #
    const newURL = urlList[x] + encodeURIComponent(text);
    console.log(newURL);
    chrome.tabs.create({url: newURL});
  }
}

async function getCurrentTab() {
  const queryOptions = {active: true, lastFocusedWindow: true};
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.omnibox.onInputEntered.addListener( async (text) => {
  const tab = await getCurrentTab();
  spawnTabs(text);
  // close lurking tab used for omni-search
  const resp = await chrome.tabs.remove(tab.id);
  console.log(resp);
});
