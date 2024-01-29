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

import React from 'react';
import GitHubIcon from '../icons/GitHubIcon';
import './css/About.css';

const About = () => {
  return (
    <div className="about">
      <div className="wrapper">
        <div className="about_content">
          <div className="info-text">
            Hiragana/Katakana tester App.
            <br />
            This application will test your knowledge of the Hiragana/Katakana
            Syllabary, at the moment there is no option to teach You (yet), it
            only do the tests.
            <br />
            <br />
            If you want to change what will be tested and/or the number of
            questions, go to the <strong>Setup</strong> and change the settings.
          </div>
          <div className="git-source">
            <GitHubIcon />
            <a
              href="https://github.com/LukaszGrela/hiragana-katakana-tester-reactjs"
              target="_blank"
              rel="noopener noreferrer">
              LukaszGrela/hiragana-katakana-tester-reactjs
            </a>
          </div>
          <div className="acknowledgement">
            <ul>
              <li>
                Background graphic{' '}
                <a
                  href="http://www.freepik.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  designed by Freepik
                </a>
              </li>
              <li>Icons came from material ui icons, www.materialui.co/</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
