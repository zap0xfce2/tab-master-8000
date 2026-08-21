/// <reference path="../../../types/index.d.ts" />

console.time('init');
import '../../styles/app.scss';
import {browser} from 'webextension-polyfill-ts';
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import v from 'vquery';

import {getChromeVersion} from './stores/main';

import {AppProps} from './app'; // eslint-disable-line no-unused-vars

const renderApp = async (stateUpdate) => {
  const ErrorBoundary = (await import('./errorBoundary')).default as React.ComponentClass;
  const App = (await import('./app')).default as React.ComponentClass<AppProps>;

  render(
    <ErrorBoundary>
      <App stateUpdate={stateUpdate} />
    </ErrorBoundary>,
    document.getElementById('main')
  );
};

const loadFavicons = async () => {
  let fv = await browser.storage.local.get('favicons');

  if (fv && fv.favicons) {
    return fv.favicons;
  } else {
    await browser.storage.local.set({favicons: []});

    console.log('Init favicons saved.');

    return [];
  }
};

const next = async (response) => {
  let stateUpdate: Partial<GlobalState> = {
    prefs: response.prefs,
    chromeVersion: getChromeVersion()
  };

  console.log('Prefs loaded: ', response);

  stateUpdate.favicons = await loadFavicons();

  renderApp(stateUpdate);
}

const loadPrefs = async () => {
  let response;

  try {
    response = await browser.runtime.sendMessage(chrome.runtime.id, {method: 'prefs'});
  } catch (e) {
    console.log(e);
  }

  if (!response) {
    setTimeout(loadPrefs, 500);
    return;
  }

  next(response);
};

v(document).ready(loadPrefs);

if (module.hot) module.hot.accept('./app', loadPrefs);
