/**
 * Created by jithin on 03/03/20.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TrialComponent.scss'
import classNames from 'classnames';

export const TrialComponent = () => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(!clicked)
  };

  return (<button className={classNames("testing-code", { "testing-code--red": clicked})} onClick={onClick}></button>)
}