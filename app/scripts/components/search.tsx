import React from 'react';
import state from './stores/state';
import {openFavorites} from './stores/main';
import * as utils from './stores/tileUtils';
import {Btn, Col, Row} from './bootstrap';
import Loading from './loading';

const {version} = chrome.runtime.getManifest();

interface SearchProps {
  s: GlobalState;
  theme: Theme;
  topLoad: boolean;
}

class Search extends React.Component<SearchProps> {
  ref: React.RefObject<HTMLInputElement> = React.createRef();
  connectId: number;

  componentDidMount() {
    this.connectId = state.connect({
      focusSearchEntry: this.focusSearchEntry
    });
  }

  componentWillUnmount() {
    state.disconnect(this.connectId);
  }

  focusSearchEntry = () => this.ref.current.focus()

  handleSearch = (e) => {
    state.set({search: e.target.value});
  }

  openAbout = () => {
    state.set({settings: 'about', modal: {state: true, type: 'settings'}});
  }

  handleSidebar = () => {
    state.set({sidebar: !this.props.s.sidebar});
  }

  handleEnter = (e) => {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    const {s} = this.props;

    if (s.modeKey !== 'searchCache') {
      return;
    }

    utils.activateTab(s.searchCache[0]);
  }

  handleTopNavButtonClick = (cb) => {
    state.set({topNavButton: null});
    cb();
  }

  render = () => {
    let p = this.props;
    const headerStyle: React.CSSProperties = {
      backgroundColor: p.theme.headerBg,
      position: 'fixed',
      top: '0px',
      width: '100%',
      zIndex: 500,
      boxShadow: `${p.theme.tileShadow} 1px 1px 3px -1px`,
      maxHeight: '52px'
    };
    const topNavButtonStyle = {
      fontSize: p.s.width <= 841 ? '20px' : '14px',
      marginRight: 'initial'
    };

    return (
      <div className="tm-nav ntg-form" style={headerStyle}>
        <Row style={{position: 'relative', top: '9px', maxHeight: '35px'}}>
          <Col size={p.s.width <= 825 ? p.s.width <= 630 ? p.s.width <= 514 ? '10' : '8' : '6' : '4'}>
            <div style={{display: 'flex', width: '100%', paddingLeft: '0px', paddingRight: '0px'}}>
              <Btn
                onClick={this.handleSidebar}
                onMouseEnter={() => state.set({disableSidebarClickOutside: true})}
                onMouseLeave={() => state.set({disableSidebarClickOutside: false})}
                style={{marginRight: '0px', padding: '9px 12px 7px 12px'}}
                className="topDarkBtn"
                icon="menu7"
                noIconPadding={true}
              />
            </div>
          </Col>
          <Col size={p.s.width <= 825 ? p.s.width <= 630 ? p.s.width <= 514 ? '2' : '4' : '6' : '8'} style={{float: 'right'}}>
            <Btn
              onClick={openFavorites}
              className="topDarkBtn pull-right"
              icon="star-full2"
              noIconPadding={true}
              data-place="bottom"
              data-tip={p.s.prefs.favoritesBtnMode === 'custom' && p.s.prefs.favoritesBtnCustom ?
                p.s.prefs.favoritesBtnCustom : utils.t('openFavorites')}
            />
            {p.s.topNavButton === 'newVersion' ?
              <Btn
                onClick={() => this.handleTopNavButtonClick(()=>chrome.runtime.reload())}
                style={topNavButtonStyle}
                className="settingBtn pull-right"
                icon="rocket"
                data-place="bottom"
                data-tip={p.s.width <= 841 ? utils.t('newVersionAvailable') : null}>
                {p.s.width <= 841 ? '' : utils.t('newVersionAvailable')}
              </Btn> : null}
            {p.s.topNavButton === 'versionUpdate' ?
              <Btn
                onClick={() => this.handleTopNavButtonClick(() => this.openAbout())}
                style={topNavButtonStyle} className="settingBtn pull-right"
                icon="info3" data-place="bottom"
                data-tip={p.s.width <= 841 ? `${utils.t('updatedTo')} ${version}` : null}>
                {p.s.width <= 841 ? '' : `${utils.t('updatedTo')} ${version}`}
              </Btn> : null}
            {p.s.topNavButton === 'installed' ?
              <Btn
                onClick={() => this.handleTopNavButtonClick(() => this.openAbout())}
                style={topNavButtonStyle}
                className="settingBtn pull-right"
                icon="thumbs-up2"
                data-place="bottom"
                data-tip={p.s.width <= 841 ? utils.t('thankYouForInstallingTM8K') : null}>
                {p.s.width <= 841 ? '' : utils.t('thankYouForInstallingTM8K')}
              </Btn> : null}
            {p.topLoad ? <Loading top={true} /> : null}
            {p.s.topNavButton === 'dlFavicons' && p.topLoad ?
              <div>
                <p
                  className="tm8k-info pull-right"
                  style={{color: p.theme.darkBtnText, textShadow: `2px 2px ${p.theme.darkBtnTextShadow}`, position: 'relative', top: '2px', marginRight: '8px'}}>
                  {p.s.width <= 841 ? '' : utils.t('downloadingAndCachingFavicons')}
                </p>
              </div> : null}
          </Col>
          <div className="search-container">
            <input
              ref={this.ref}
              type="text"
              value={p.s.search}
              className="form-control search-tabs"
              placeholder={`${utils.t('search')} ${utils.t(p.s.prefs.mode)}...`}
              onChange={this.handleSearch}
              onKeyDown={(e) => this.handleEnter(e)}
            />
            {p.s.search.length > 0 ?
              <span
                style={{color: p.theme.textFieldsPlaceholder}}
                className="search-msg ntg-search-web-text">
                {utils.t('pressEnterToSearch')}
              </span> : null}
          </div>
        </Row>
      </div>
    );
  }
}

export default Search;