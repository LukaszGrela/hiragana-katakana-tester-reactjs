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
import React, { Component } from 'react';

import IconTick from '../icons/TickIcon';

import './css/ListSeries.css';

export const ListSeries = props => {
  const generateOptions = () => {
    const { data, selection } = props;

    if (data && selection) {
      const allSelected =
        selection.length > 0 && isNaN(parseInt(selection, 10));
      return data.map((series, index) => {
        const { id, name } = series;
        let selected = allSelected || selection.indexOf(id) !== -1;
        return (
          <li
            key={id}
            className={
              'option' +
              (selected ? ' selected' : '') +
              (index % 2 === 0 ? ' even' : ' odd')
            }
            onClick={() => {
              props.onItemClicked && props.onItemClicked(id, selected);
            }}>
            <IconTick />
            <span className="label">{name.label}</span>
            <span className="kana">{name.kana}</span>
          </li>
        );
      });
    }

    return null;
  };

  const className = props.className || '';
  return (
    <div className={className + ' list-series'}>
      <ul>{generateOptions()}</ul>
    </div>
  );
};

export default ListSeries;
