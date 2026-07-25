Tab Master 5K replaces your New Tab page with a full-featured tabs, history, bookmarks, apps, extensions, and sessions manager.

### Features

#### Tabs
- Close, pin, and mute tabs from your New Tab page.
- Re-order tab tiles by dragging and dropping them.
- Close all tabs from a specific website.
- Close duplicate tabs, and optionally make them pulsate.
- Manage tabs through icons, the right click menu, or through a table view.
- Search tabs in the top search bar.
- Option to sort tabs by website or alphabetical order, and apply the order to your Chrome window.
- Automatically discard tabs from memory and customize how long they have to be inactive to trigger it.
- Native Chrome tab group membership is shown as a color accent and badge on each tile; click the badge to filter the grid to that group.

#### Customization
- Full control of the New Tab's appearance with a flexible theme editor.
- Import any wallpaper as a background.
- Adjust the size of the grid tiles.
- View a screenshot of each tab in the grid.
- Enable screenshots to cover the background of a New Tab page when you hover over a tab tile. You can adjust the strength of the blur and opacity of backgrounds in Preferences.

#### Session Management
- Session manager built in for saving and restoring your current tab sessions.
- Synchronize your saved sessions, and keep them persistently updated with the current Chrome window.
- Tab sessions can be exported and imported.
- View, sort, and filter your session tabs as tiles in the grid view.

#### Chrome Management
- View, sort, and filter your bookmarks, history, apps and extensions as tiles in the grid view. You can change how apps launch, create app shortcuts, enable/disable, or uninstall them.
- Quickly navigate the extension with keyboard shortcuts.
- Undo tab actions by pressing CTRL+Z, or through the context menu while a New Tab page is open.
- Add websites you do not want to view to a comma separated blacklist in Settings -> Preferences. Websites added to the blacklist will have their tabs closed under any circumstance.

### Changes from the Original
This is a fork of [jaszhix/tab-master-5000-extension](https://github.com/jaszhix/tab-master-5000-extension), modded by Zap0xfce2. Compared to the original at the same version, it adds:

- **Tab screenshots for Manifest V3.** The original removed the screenshot/thumbnail feature when it moved to Manifest V3 (its own changelog notes "Screenshot feature has been removed due to API incompatibilities"). This fork reimplements it in an MV3-compatible way: it opportunistically captures the active tab via `captureVisibleTab`, downsizes it with `OffscreenCanvas`, and caches it per-session in `chrome.storage.session` (no disk persistence) for the tile view's thumbnail background. Chrome only.
- **Native tab group indicator with click-to-filter.** Tiles in the tabs view display a color accent and badge matching their native Chrome tab group (read-only — groups themselves are still created/edited natively in Chrome); clicking the badge filters the grid to that one group, and the active filter persists even if you close and reopen the New Tab page. Toggle it in Preferences ("Show tab group color badge"). Chrome only.
- **New global shortcut "Open Favorites"** (`chrome.commands`, in-page `Ctrl+D`): opens a linked companion extension in a new tab.
- **New global shortcut "Focus Search"** (`chrome.commands`): focuses the search field even when the New Tab page isn't the focused element, complementing the existing in-page `Ctrl+F`.
- **Broader host permission (`<all_urls>`)** in the Chrome manifest, required at runtime by `captureVisibleTab` to support the screenshot feature above.
- **No uninstall feedback survey.** The original opens a Google Forms survey ("Would you like to help improve this extension?") via `chrome.runtime.setUninstallURL` when the extension is uninstalled. This fork removes that call.

### Contributing
- Install the project dependencies with ```npm install```.
- Start the development environment with ```npm run dev-chrome``` for Chrome or ```npm run dev-firefox``` for Firefox.
- Load the ```app``` directory as an unpackaged extension.
- To build for production, run ```npm run build-chrome``` for Chrome, or ```npm run build-firefox``` for Firefox.

### Building with Docker
For compliance with Mozilla's [source code policy](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Source_Code_Submission), an effort has been made to make the end result of the extension build process reproducible across different environments.

- Ensure Docker is installed and the daemon is running.
- Run `./docker-build.sh <command>`. This will build the container if needed and run the `command` arguments.
  - E.g. `./docker-build.sh npm run build-firefox`
