import {LINKED_EXTENSION_URL} from './constants';

export const getFavoritesUrl = (prefs: Partial<PreferencesState>): string => {
  if (prefs?.favoritesBtnMode === 'custom' && prefs.favoritesBtnCustom?.trim()) {
    return prefs.favoritesBtnCustom.trim();
  }

  return LINKED_EXTENSION_URL;
};

export const isNewTab = function(url: string): boolean {
  return (url && (url.indexOf('chrome://newtab/') > -1
    || url.substr(-11) === 'newtab.html'
    || url.substr(-9) === 'tm8k.html'
    || url.substr(-11) === 'ewtab.html#'))
};
