import React, { useEffect, useState } from 'react';
import loadFloorplan from './loadFloorplan';
import CircularProgress from '@material-ui/core/CircularProgress';
import { componentStyles } from '../../styles/styles';

const FloorPlan = ({ studioId, siteId, buildingId, floorId, spaceId }) => {
  const componentClasses = componentStyles();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    loadFloorplan(() => {
      setScriptLoaded(true);
    });
  }, [floorId]);
  if (document.querySelector('onuma-plan')) {
    const el = document.querySelector('onuma-plan');
    el.addEventListener('svgInitedEmitter', (event) => {
      setisLoaded(event.returnValue);
    });
  }

  return (
    <div
      style={{
        height: '300px',
        maxWidth: '500px',
        width: '90%',
        border: '1px solid lightgrey',
        margin: 'auto',
      }}
      className='floorplan-component'>
      {!isLoaded && (
        <div className={componentClasses.spinnerDiv}>
          <CircularProgress className={componentClasses.spinner} />
        </div>
      )}
      {scriptLoaded && floorId ? (
        <onuma-plan
          style={{ height: '600px', width: '600px', background: 'lightgray' }}
          studio-id={studioId}
          site-id={siteId}
          building-id={buildingId}
          floor-id={floorId}
          space-id={spaceId}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default FloorPlan;
