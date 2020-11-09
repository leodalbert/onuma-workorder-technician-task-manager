import React, { useEffect, useState } from 'react';
import loadFloorplan from './loadFloorplan';

const FloorPlan = ({ studioId, siteId, buildingId, floorId, spaceId }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadFloorplan(() => {
      setLoaded(true);
    });
  }, [floorId]);
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
      {loaded && floorId ? (
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
