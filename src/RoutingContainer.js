import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Home} from './home';
import {MovingBlock} from './moving-block';
import {List} from './list';
import {Grid} from './grid';

const RoutingContainer = () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/block' component={MovingBlock}/>
      <Route path='/list' component={List}/>
      <Route path='/grid' component={Grid}/>
    </Switch>
)

export default RoutingContainer;
