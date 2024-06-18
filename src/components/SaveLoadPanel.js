import React from 'react';

const SaveLoadPanel = ({ savePlan, loadPlan }) => (
    <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
        <button onClick={savePlan}>Save Plan</button>
        <button onClick={loadPlan}>Load Plan</button>
    </div>
);

export default SaveLoadPanel;
