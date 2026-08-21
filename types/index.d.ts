import type * as aphrodite from 'aphrodite'; // eslint-disable-line no-unused-vars
import type * as B from 'webextension-polyfill-ts'; // eslint-disable-line no-unused-vars

type Modify<T, R> = Omit<T, keyof R> & R;

declare global {
  // === Aphrodite overrides
  // @ts-ignore
  interface CSSProperties extends aphrodite.CSSProperties {
    backgroundBlendMode?: string;
  }

  type StyleDeclarationValue = object

  type StyleDeclarationMap = Map<keyof CSSProperties, string | number>;

  type StyleDeclaration<T = {}> = {
    [P in keyof T]: CSSProperties | StyleDeclarationMap | React.CSSProperties;

  };

  type CSSInputTypes = StyleDeclarationValue | false | null | void;

  interface StyleSheetStatic {
    /**
     * Create style sheet
     */
    create<T>(
        styles: StyleDeclaration<T>
    ): {[K in keyof T]: StyleDeclarationValue };
    /**
     * Rehydrate class names from server renderer
     */
    rehydrate(renderedClassNames: string[]): void;
  }
  // Aphrodite overrides ===

  interface NodeModule {
    hot?: any;
    default?: unknown;
  }

  interface VisibleRange {
    start: number;
    length: number;
  }

  // TBD: https://github.com/Microsoft/TypeScript/issues/16936

  interface ChromeGenericCustom<Id, Index> {
    id: Id;
    index: Index;
    url?: string;
    title?: string;
    count?: number;
    domain?: string;
    timeStamp?: number;
    openTab?: Id;
    description: string;
    label?: string;
    sTimeStamp?: number;
    enabled: boolean;
    lastVisitTime?: number;
    originSession?: string;
    folder?: string;
    favIconUrl?: string;
    thumbnailUrl?: string;
    originWindow?: number;
    groupColor?: chrome.tabGroups.Color;
    groupTitle?: string;
    groupCollapsed?: boolean;
  }

  type ChromeGeneric = ChromeGenericCustom<number | string, number | string>

  type ChromeTab = Modify<chrome.tabs.Tab, ChromeGenericCustom<number | undefined, number>>/*  & number */;

  type ChromeExtensionInfo = Modify<chrome.management.ExtensionInfo, ChromeGenericCustom<string, number>>;

  type ChromeBookmarkTreeNode = Modify<chrome.bookmarks.BookmarkTreeNode, ChromeGenericCustom<string, number | undefined>>;

  type ChromeHistoryItem = Modify<chrome.history.HistoryItem, ChromeGenericCustom<string,  number | undefined>>;

  type ChromeItem = ChromeTab & ChromeBookmarkTreeNode & ChromeHistoryItem & ChromeExtensionInfo;

  interface ChromeWindow extends chrome.windows.Window {
    tabs: ChromeTab[];
  }

  type ViewMode = 'tabs' | 'sessions' | 'bookmarks' | 'history' | 'apps' | 'extensions';
  type ViewModeKey = 'tabs' | 'sessionTabs' | 'bookmarks' | 'history' | 'apps' | 'extensions' | 'searchCache';
  type ViewFormat = 'tile' | 'table';
  type SortKey = 'index' | 'url' | 'title' | 'timeStamp' | 'sTimeStamp' | 'openTab' | 'label' | 'folder'
    | 'domain' | 'folder' | 'dateAdded' | 'pinned' | 'mutedInfo' | 'count' | 'session'
    | 'lastVisitTime' | 'visitCount' | 'typedCount' | 'launchType' | 'enabled'
    | 'offlineEnabled' | 'version' | 'name';

  interface SidebarSortOption {
    keys: string[];
    labels: any;
  }

  interface SidebarSortOptions {
    bookmarks: SidebarSortOption;
    history: SidebarSortOption;
    sessions: SidebarSortOption;
    extensions: SidebarSortOption;
    apps: SidebarSortOption;
    tabs: SidebarSortOption;
  }

  interface SessionState {
    timeStamp: number;
    tabs: ChromeTab[][];
    label: string;
    id: string;
  }

  interface SessionsObject {
    sessions?: SessionState[];
  }

  interface Theme {
    textFieldsBg?: string;
    textFieldsPlaceholder?: string;
    textFieldsText?: string;
    textFieldsBorder?: string;
    settingsBg?: string;
    settingsItemHover?: string;
    headerBg?: string;
    bodyBg?: string;
    bodyText?: string;
    darkBtnBg?: string;
    darkBtnBgHover?: string;
    darkBtnText?: string;
    darkBtnTextShadow?: string;
    lightBtnBg?: string;
    lightBtnBgHover?: string;
    lightBtnText?: string;
    lightBtnTextShadow?: string;
    tileBg?: string;
    tileBgHover?: string;
    tileText?: string;
    tileTextShadow?: string;
    tileShadow?: string;
    tileX?: string;
    tileXHover?: string;
    tilePin?: string;
    tilePinHover?: string;
    tilePinned?: string;
    tileMute?: string;
    tileMuteHover?: string;
    tileMuteAudible?: string;
    tileMuteAudibleHover?: string;
    tileMove?: string;
    tileMoveHover?: string;
    tileButtonBg?: string;
  }

  interface ThemeField {
    themeKey: keyof Theme;
    label: string;
    group: string;
  }

  interface ThemeState {
    id: number;
    created: number;
    modified: number;
    camel?: string;
    label: string;
    theme: Theme;
    wallpaper: number;
  }

  interface _Wallpaper {
    data: string | number;
    id: number;
  }

  type Wallpaper = _Wallpaper | null;

  interface WallpaperObject extends Array<Wallpaper> {
    wallpapers?: Wallpaper[];
  }

  interface ThemeStore extends State.Data {
    standardWallpapers: Wallpaper[];
    standardThemes: ThemeState[];
    savedThemes: ThemeState[];
    theme: Theme;
    themeId: number;
    wallpaperId: number;
    wallpapers: Wallpaper[];
    getWallpapers: () => Promise<WallpaperObject>;
    getThemeFields: () => ThemeField[];
  }

  interface PreferencesState {
    autoDiscard: boolean;
    autoDiscardTime: number;
    tabSizeHeight: number;
    settingsMax: boolean;
    drag: boolean;
    context: boolean;
    animations: boolean;
    duplicate: boolean;
    screenshotBgBlur: number;
    screenshotBgOpacity: number;
    faviconCaching: boolean;
    blacklist: boolean;
    sort: boolean;
    showViewMode: boolean;
    mode: ViewMode;
    format: ViewFormat;
    actions: boolean;
    sessionsSync: boolean;
    trackMostUsed: boolean;
    singleNewTab: boolean;
    closeOnActivate: boolean;
    keyboardShortcuts: boolean;
    currentSyncedSession: string;
    theme: number;
    wallpaper: string | number | null;
    tooltip: boolean;
    alerts: boolean;
    allTabs: boolean;
    resetSearchOnClick: boolean;
    tablePadding: number;
    newTabMode: 'tm8k' | 'default' | 'custom';
    newTabCustom: string;
    showTabGroupBadge: boolean;
    favoritesBtnMode: 'default' | 'custom';
    favoritesBtnCustom: string;
  }

  interface PermissionsState {
    bookmarks: boolean;
    history: boolean;
    management: boolean;
    downloads: boolean;
  }

  interface PreferencesStore extends State.Data {
    prefs: PreferencesState;
    defaultPrefs: PreferencesState;
    permissions: string[];
    origins: string[];
    init: () => Promise<void>;
    checkPermissions: (prefs: Partial<PreferencesState>) => void
    syncPermissions: () => void;
    setPrefs: (obj: Partial<PreferencesState>) => Promise<void>;
    getPrefs: () => PreferencesState;
  }

  interface ActionRecord {
    type: string;
    id: string;
    item: ChromeTab;
    url?: string;
  }

  interface TabIDInfo {
    id: ChromeTab['id'];
    windowId: ChromeTab['windowId'];
  }

  interface AlertState {
    text: string;
    tag: string;
    class: string;
    open: boolean
  }

  interface FaviconState {
    favIconUrl: string;
    domain: string;
  }

  interface ModalState {
    state: boolean;
    type: null;
    opt: null;
    footer: React.ReactElement;
  }

  interface ContextOption {
    switch?: boolean;
    argument?: boolean;
    onClick?: React.MouseEventHandler;
    icon?: string;
    label?: string;
    divider?: boolean;
  }

  interface ContextState {
    value: boolean;
    id: any; // TBD
    options: ContextOption[];
  }

  interface DragState {
    el: HTMLElement;
    i: number;
  }

  interface GlobalState extends State.Data {
    init?: boolean;
    prefs?: PreferencesState;
    modeKey?: ViewModeKey;
    sessions?: SessionState[];
    sessionTabs?: ChromeTab[];
    actions?: ActionRecord[];
    windowRestored?: boolean;
    isOptions?: boolean;
    // UI
    search?: string;
    width?: number;
    height?: number;
    collapse?: boolean;
    tileLimit?: number;
    topNavButton?: 'installed' | 'versionUpdate' | 'newVersion' | 'dlFavicons';
    context?: ContextState;
    sidebar?: boolean;
    disableSidebarClickOutside?: boolean;
    applyTabOrder?: boolean;
    settings?: 'preferences' | 'sessions' | 'theming' | 'about';
    modal?: ModalState;
    folder?: string;
    groupFilter?: number | false;
    groupFilterCache?: ChromeItem[] | null;
    alert?: AlertState;
    dragging?: boolean;
    topLoad?: boolean;
    // Themes
    theme?: Theme;
    savedThemes?: ThemeState[];
    wallpapers?: Wallpaper[];
    currentWallpaper?: Wallpaper;
    colorPickerOpen?: boolean;
    // Chrome data
    chromeVersion?: number;
    windowId?: number;
    searchCache?: ChromeItem[];
    tileCache?: ChromeItem[];
    tabs?: ChromeTab[];
    allTabs?: ChromeTab[][];
    duplicateTabs?: string[];
    bookmarks?: ChromeBookmarkTreeNode[];
    history?: ChromeHistoryItem[];
    apps?: ChromeExtensionInfo[];
    extensions?: ChromeExtensionInfo[];
    favicons?: FaviconState[];
    sort?: SortKey;
    direction?: 'desc' | 'asc';
  }

  interface StartupDetails {
    type: string;
  }

  interface EventState {
    onStartup: StartupDetails;
    onUpdateAvailable: chrome.runtime.UpdateAvailableDetails;
    onInstalled: chrome.runtime.InstalledDetails;
    onEnabled: chrome.management.ExtensionInfo;
    onCreated: ChromeTab;
    onActivated: chrome.tabs.TabActiveInfo;
    onRemoved: number;
    onUpdated: number;
    onMoved: number;
    onAttached: number;
    onDetached: number;
    bookmarksOnCreated: string;
    bookmarksOnRemoved: string;
    bookmarksOnChanged: string;
    bookmarksOnMoved: string;
    historyOnVisited: chrome.history.HistoryItem;
    historyOnVisitRemoved: chrome.history.RemovedResult;
  }

  interface BgMessage {
    e: any;
    args: any[];
    type: 'startup' | 'appState' | 'prefs' | 'error' | 'log' | 'focusSearchEntry';
    action: boolean | 'newVersion' | 'installed' | 'versionUpdate';
    noPermissions: 'bookmarks' | 'history' | 'management';
    sessions?: SessionState[];
    windows: ChromeWindow[];
    bookmarks: ChromeBookmarkTreeNode[];
    history: ChromeHistoryItem[];
    extensions: ChromeExtensionInfo[];
    actions: ActionRecord[];
    windowId?: number;
    init: boolean;
  }

  interface BackgroundState extends State.Data {
    eventState: EventState;
    prefs: PreferencesState;
    init: boolean;
    blacklist: string[];
    windows: ChromeWindow[];
    history: ChromeHistoryItem[];
    bookmarks: ChromeBookmarkTreeNode[];
    extensions: ChromeExtensionInfo[];
    tabGroups: chrome.tabGroups.TabGroup[];
    removed: ChromeTab[];
    newTabs: TabIDInfo[];
    sessions: SessionState[];
    actions: ActionRecord[];
    chromeVersion: number;
    prefix: 'chrome' | 'moz';
    bookmarksListenersAttached: boolean;
    historyListenersAttached: boolean;
    managementListenersAttached: boolean;
  }

  interface WorkerMessage {
    windows: ChromeWindow[];
    history: ChromeHistoryItem[];
    bookmarks: ChromeBookmarkTreeNode[];
    extensions: ChromeExtensionInfo[];
    items: ChromeItem[]; // searchCache
    data: ChromeItem[];
    modeKey: ViewModeKey;
    query: string; // search
    sort: keyof ChromeItem[];
    modalOpen: boolean;
    init: boolean;
  }

  interface WorkerEvent {
    data: {
      state: GlobalState;
      msg: WorkerMessage;
    }
  }

  interface CursorState {
    page: {
      x: number;
      y: number;
    };
    offset: {
      x: number;
      y: number;
    }
    keys: {
      ctrl: boolean;
      shift: boolean;
    }
  }

  interface Window {
    state: GlobalState;
    themeStore?: ThemeStore;
    cursor: CursorState;
    tmWorker?: Worker;
    v?: any;
  }

  type BtnOnClick = (e?: React.MouseEvent | Element | string) => void | Promise<void> | State.Data;

  // @types/chrome is older than the chrome.storage.session API, and only has the legacy
  // callback-based StorageArea signatures — add the promise-based overloads MV3 actually
  // supports when the callback is omitted.
  namespace chrome.storage {
    export interface StorageArea {
      get(keys?: string | string[] | Object | null): Promise<{[key: string]: any}>;
      set(items: Object): Promise<void>;
      remove(keys: string | string[]): Promise<void>;
    }

    export var session: StorageArea;
  }

  // Same story for chrome.tabs.captureVisibleTab — @types/chrome only has the callback overloads.
  // groupId is likewise missing from the Tab interface here (chrome.tabGroups landed after Chrome 89).
  namespace chrome.tabs {
    export function captureVisibleTab(windowId: number, options: CaptureVisibleTabOptions): Promise<string>;

    export interface Tab {
      groupId?: number;
    }
  }

  // chrome.tabGroups is entirely absent from @types/chrome 0.0.116 — declared from scratch here,
  // following the same declaration-merging approach as chrome.storage.session above.
  namespace chrome.tabGroups {
    export type Color = 'grey' | 'blue' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'cyan' | 'orange';

    export interface TabGroup {
      id: number;
      collapsed: boolean;
      color: Color;
      title?: string;
      windowId: number;
    }

    export const TAB_GROUP_ID_NONE: number;

    export function query(queryInfo: {collapsed?: boolean; color?: Color; title?: string; windowId?: number}): Promise<TabGroup[]>;
    export function get(groupId: number): Promise<TabGroup>;

    export const onCreated: chrome.events.Event<(group: TabGroup) => void>;
    export const onUpdated: chrome.events.Event<(group: TabGroup) => void>;
    export const onMoved: chrome.events.Event<(group: TabGroup) => void>;
    export const onRemoved: chrome.events.Event<(group: TabGroup) => void>;
  }
}
