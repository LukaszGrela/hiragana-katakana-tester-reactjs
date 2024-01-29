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

import './css/OnOffSwitch.css';

const CheckboxSwitch = ({
  id,
  isChecked,
  onChecked,
  labelOn,
  labelOff,
  iconOn,
  iconOff,
}) => {
  return (
    <div className={`onoffswitch ${id}`}>
      <input
        type="checkbox"
        name="onoffswitch"
        className="onoffswitch-checkbox"
        id={id}
        checked={isChecked}
        onChange={e => {
          onChecked && onChecked(!isChecked);
        }}
      />
      <label className="onoffswitch-label" htmlFor={id}>
        <span className="onoffswitch-inner">
          <span className="before">{labelOn || 'ON'}</span>
          <span className="after">{labelOff || 'OFF'}</span>
        </span>
        <span className="onoffswitch-switch">
          <span className="before">{iconOn || '+'}</span>
          <span className="after">{iconOff || '-'}</span>
        </span>
      </label>
    </div>
  );
};

export default CheckboxSwitch;
