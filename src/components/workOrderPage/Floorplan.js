import React from 'react';
// import ScriptTag from 'react-script-tag';

const Floorplan = ({ studioId, siteId, buildingId, floorId, spaceId }) => {
  // TODO handle loading
  return (
    <div
      style={{
        height: '300px',
        width: '500px',
        border: '1px solid lightgrey',
      }}>
      <onuma-plan
        style={{ height: '600px', width: '600px', background: 'lightgray' }}
        loading={true}
        studio-id={studioId}
        site-id={siteId}
        building-id={buildingId}
        floor-id={floorId}
        space-id={spaceId}
      />
    </div>
  );
};

export default Floorplan;
