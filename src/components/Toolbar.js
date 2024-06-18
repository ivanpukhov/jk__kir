import React from 'react';

const Toolbar = ({ addElement, setCurrentColor, setCurrentBorderColor, currentColor, currentBorderColor, copyElements }) => (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <button onClick={() => addElement('table')}>Add Table</button>
        <button onClick={() => addElement('chair')}>Add Chair</button>
        <button onClick={() => addElement('sofa')}>Add Sofa</button>
        <br />
        <label>
            Color:
            <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} />
        </label>
        <label>
            Border Color:
            <input type="color" value={currentBorderColor} onChange={(e) => setCurrentBorderColor(e.target.value)} />
        </label>
        <button onClick={copyElements}>Copy Selected Elements</button>
    </div>
);

export default Toolbar;
