import React from 'react';

const ElementSettings = ({
                             elementType,
                             setElementType,
                             elementColor,
                             setElementColor,
                             borderColor,
                             setBorderColor,
                             addElement,
                             selectedTable,
                         }) => {
    return (
        <div>
            <label>
                Тип элемента:
                <select value={elementType} onChange={(e) => setElementType(e.target.value)}>
                    <option value="table">Стол</option>
                    <option value="chair" disabled={!selectedTable}>Стул</option>
                    <option value="sofa" disabled={!selectedTable}>Диван</option>
                </select>
            </label>
            <label>
                Цвет элемента:
                <input
                    type="color"
                    value={elementColor}
                    onChange={(e) => setElementColor(e.target.value)}
                />
            </label>
            <label>
                Цвет бордера:
                <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                />
            </label>
            <button onClick={addElement} disabled={elementType !== 'table' && !selectedTable}>
                Добавить элемент
            </button>
        </div>
    );
};

export default ElementSettings;
