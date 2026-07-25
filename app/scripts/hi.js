if (document.title === 'Options') {
  document.title = chrome.i18n.getMessage('options');
} else {
  document.title = chrome.i18n.getMessage('newTab');
}