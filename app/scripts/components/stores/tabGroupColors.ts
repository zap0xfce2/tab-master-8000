// Chrome only exposes the group color as one of nine fixed names, never as a hex value -
// this maps them to concrete colors matching Chrome's own tab group palette.
export const TAB_GROUP_COLOR_HEX: Record<chrome.tabGroups.Color, string> = {
  grey: '#5f6368',
  blue: '#1a73e8',
  red: '#d93025',
  yellow: '#f9ab00',
  green: '#188038',
  pink: '#d01884',
  purple: '#a142f4',
  cyan: '#007b83',
  orange: '#fa7b17',
};

export const getTabGroupColorHex = (color?: chrome.tabGroups.Color): string =>
  (color && TAB_GROUP_COLOR_HEX[color]) || TAB_GROUP_COLOR_HEX.grey;

export const hasTabGroup = (tab: Pick<ChromeItem, 'groupId'>): boolean =>
  typeof chrome.tabGroups !== 'undefined'
    && typeof tab.groupId === 'number'
    && tab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE;
