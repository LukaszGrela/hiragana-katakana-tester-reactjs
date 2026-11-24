/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import { Component, type FC, type ReactElement } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  type Location,
  type NavigateFunction,
} from "react-router-dom";
import { MediaQuery } from "react-responsive";

import Footer from "../components/Footer";
import IconArrowBack from "../icons/IconArrowBack";
import IconHiraganaKa from "../icons/IconHiraganaKa";
import IconInfo from "../icons/IconInfo";
import IconKatakanaKa from "../icons/IconKatakanaKa";
import IconMore from "../icons/IconMore";
import IconSettings from "../icons/IconSettings";

import About from "./About";
import { Game } from "./Game";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Setup from "./Setup";

import "./css/AppView.css";
import "./css/DropDown.css";

export type TAppViewProps = {
  location: Location;
  navigate: NavigateFunction;
};

export type TAppViewState = {
  ddMenuOpen: boolean;
};

export class AppView extends Component<TAppViewProps, TAppViewState> {
  constructor(props: TAppViewProps) {
    super(props);
    this.state = {
      ddMenuOpen: false,
    };

    this.getHeaderLeftSlotFragment = this.getHeaderLeftSlotFragment.bind(this);
    this.getHeaderRightSlotFragment =
      this.getHeaderRightSlotFragment.bind(this);
    this.handleNavigationAction = this.handleNavigationAction.bind(this);
  }

  override componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  override componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleNavigationAction(id: string = "/"): void {
    let to = "/";
    switch (id) {
      case "config":
        to = "/setup";
        break;
      case "about":
        to = "/about";
        break;
      case "game":
        to = "/game";
        break;
      case "/":
      default:
        to = "/";
        break;
    }
    this.setState(
      () => ({
        // hide state
        ddMenuOpen: false,
      }),
      () => {
        // state change applied - navigate
        this.props.navigate(to);
      },
    );
  }

  handleDropDown = (): void => {
    this.setState(() => ({ ddMenuOpen: true }));
  };

  handleKeyDown = (event: KeyboardEvent): void => {
    const { keyCode: code } = event;
    if (this.state.ddMenuOpen && code === 27) {
      // Escape
      event.preventDefault();
      this.setState(() => ({ ddMenuOpen: false }));
    }
  };

  /**
   * @returns {JSX.Element | null} Returns fragment to be placed in the headers left slot
   */
  getHeaderLeftSlotFragment(): ReactElement | null {
    const { location } = this.props;

    if (location.pathname !== "/") {
      return (
        <button
          onClick={() => {
            this.handleNavigationAction();
          }}
        >
          <IconArrowBack />
        </button>
      );
    } else {
      return null;
    }
  }

  getSettingsButton = (label?: string): ReactElement => (
    <button
      key={"settings-btn"}
      className="button-settings"
      onClick={() => {
        this.handleNavigationAction("config");
      }}
    >
      <IconSettings />
      {label && <span className="label">{label}</span>}
    </button>
  );

  /**
   * @returns {JSX.Element | null} Returns fragment to be placed in the headers right slot
   */
  getHeaderRightSlotFragment(): ReactElement | ReactElement[] | null {
    const { location } = this.props;

    if (location.pathname === "/") {
      return [
        <MediaQuery key={"media-query"} minDeviceWidth={410}>
          {(matches: boolean) => {
            if (matches) {
              /* normal */
              return [
                <button
                  key={"about-btn"}
                  className="button-about"
                  onClick={() => {
                    this.handleNavigationAction("about");
                  }}
                >
                  <IconInfo />
                </button>,

                this.getSettingsButton(),
              ];
            } else {
              /* dd on small devices */
              return [
                <button
                  key={"dd-menu-btn"}
                  className="dd-button-menu"
                  onClick={() => {
                    this.handleDropDown();
                  }}
                >
                  <IconMore />
                </button>,
              ];
            }
          }}
        </MediaQuery>,
      ];
    } else if (location.pathname === "/about") {
      return this.getSettingsButton();
    } else {
      return null;
    }
  }

  override render() {
    return (
      <div className="app-view">
        <div className="header">
          <div className="left-placeholder">
            {this.getHeaderLeftSlotFragment()}
          </div>
          <div className="app-title">
            <IconHiraganaKa />
            <div className="title-text">Hiragana/Katakana Tester</div>
            <IconKatakanaKa />
          </div>
          <div className="right-placeholder">
            {this.getHeaderRightSlotFragment()}
          </div>
        </div>
        <div className="content">
          <div className={"right-column main"}>
            <Routes>
              <Route
                path="/"
                element={<Home onNavigation={this.handleNavigationAction} />}
              />
              <Route path="/game" element={<Game />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
        <Footer />
        <div
          key={"dd-menu-box"}
          className={"dd-menu" + (this.state.ddMenuOpen ? " open" : " close")}
        >
          <div
            className="cloak"
            onClick={() => {
              console.log("cick");
              this.setState(() => ({ ddMenuOpen: false }));
            }}
          ></div>
          <div className="dd-menu-container">
            <button
              key={"about-btn"}
              className="button-about"
              onClick={() => {
                this.handleNavigationAction("about");
              }}
            >
              <IconInfo />
              <span className="label">About</span>
            </button>
            {this.getSettingsButton("Setup")}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * React Router v7 exposes navigation through hooks, so inject the location
 * object and the navigate function into the class component.
 */
const withNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P & TAppViewProps>,
): FC<P> => {
  const WithNavigation: FC<P> & { displayName?: string } = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <WrappedComponent {...props} location={location} navigate={navigate} />
    );
  };

  const wrappedName =
    (WrappedComponent as { displayName?: string; name?: string }).displayName ||
    (WrappedComponent as { displayName?: string; name?: string }).name ||
    "Component";

  WithNavigation.displayName = `withNavigation(${wrappedName})`;

  return WithNavigation;
};

const AppViewWithNavigation = withNavigation(AppView);
AppViewWithNavigation.displayName = "AppView";

export default AppViewWithNavigation;
