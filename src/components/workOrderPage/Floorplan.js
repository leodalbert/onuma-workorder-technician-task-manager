import React, { useEffect } from 'react';
import ScriptTag from 'react-script-tag';

const Floorplan = () => {
  // useEffect(() => {
  //   console.log('loaded');
  //   const el = document.querySelector('onuma-plan');
  //   el.addEventListener('selectedSpaceIdEmitter', (event) =>
  //     window.alert(event.detail)
  //   );
  // }, []);
  return (
 <div style={{height: '300px', width: '500px', border: '1px solid lightgrey'}}>

 <onuma-plan

  studio-id='26'
  site-id='339'
  building-id='1532'
  floor-id='5884'
  space-id='67890'
></onuma-plan>
 </div>
  );
};

export default Floorplan;
// <div style='height: 600px; width: 900px; border: 1px solid lightgrey;'>
// <onuma-plan
//   style='height: 600px; width: 600px; background: lightgray; '
//   studio-id='26'
//   site-id='339'
//   building-id='1532'
//   floor-id='5884'
//   space-id='67890'
// ></onuma-plan>
// </div>