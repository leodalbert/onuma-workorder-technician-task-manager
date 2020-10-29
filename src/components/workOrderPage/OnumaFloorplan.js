import React, { useEffect, useState } from 'react';
import loadFloorplan from './loadFloorplan';

const FloorPlan = ({ studioId, siteId, buildingId, floorId, spaceId }) => {
  // TODO handle loading
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log(floorId);
    loadFloorplan(() => {
      setLoaded(true);
    });
  }, [floorId]);
  return (
    <div
      style={{
        height: '300px',
        width: '500px',
        border: '1px solid lightgrey',
      }}
      className='floorplan-component'>
      {loaded && floorId ? (
        <onuma-plan
          style={{ height: '600px', width: '600px', background: 'lightgray' }}
          loading={true}
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
