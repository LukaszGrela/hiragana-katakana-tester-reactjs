/*
   Copyright 2018 Ĺukasz 'Severiaan' Grela GrelaDesign

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
import "./css/Footer.css";

const Footer = () => (
  <footer>
    <span>GrelaDesign (c) {new Date().getFullYear()}</span>
    <span className="GrelaDesign_info">
      <span className="GrelaDesign_version">{__APP_VERSION__}</span>
      <span className="GrelaDesign_commit">({__APP_COMMIT__})</span>
    </span>
  </footer>
);

export default Footer;
