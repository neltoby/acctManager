import React from 'react';
import isJson from './isJson';
import { LOGGEDIN } from './action'
import {useSelector} from 'react-redux'
import InRoute from './Component/InRoute'
import OutRoute from './Component/OutRoute'

function App() {
    let store = isJson(useSelector(state => state))    
  return (
      <>
          {store.create.login === LOGGEDIN ? <InRoute /> : <OutRoute />}
      </>
  );
}

export default App;
