import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Line, Transformer } from 'react-konva';

const GRID_SIZE = 20;

const DrawingArea = ({ elements, setSelectedElements, selectedElements, updateElement, setSelectedTableId }) => {
    const layerRef = useRef();
    const transformerRef = useRef();
    const selectionRectRef = useRef();
    const selectionBoxRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

    const [isSelecting, setIsSelecting] = useState(false);
    const [guideLines, setGuideLines] = useState([]);

    useEffect(() => {
        if (selectedElements.length > 0 && transformerRef.current) {
            const selectedNodes = selectedElements.map(el => layerRef.current.findOne(`#${el.id}`));
            transformerRef.current.nodes(selectedNodes);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [selectedElements]);

    const handleSelect = (element, e) => {
        if (e.shiftKey) {
            setSelectedElements(prevSelected =>
                prevSelected.some(el => el.id === element.id)
                    ? prevSelected.filter(el => el.id !== element.id)
                    : [...prevSelected, element]
            );
        } else {
            setSelectedElements([element]);
        }
        if (element.type === 'table') {
            setSelectedTableId(element.id);
        }
    };

    const handleDragMove = (e) => {
        const node = e.target;
        const lines = [];
        elements.forEach((el) => {
            if (el.id !== node.id()) {
                const guidePos = [
                    { x: el.x, y: el.y },
                    { x: el.x + el.width / 2, y: el.y },
                    { x: el.x + el.width, y: el.y },
                    { x: el.x, y: el.y + el.height / 2 },
                    { x: el.x, y: el.y + el.height },
                    { x: el.x + el.width / 2, y: el.y + el.height },
                    { x: el.x + el.width, y: el.y + el.height },
                ];
                guidePos.forEach((pos) => {
                    if (Math.abs(pos.x - node.x()) < 5) {
                        lines.push({ x: pos.x, y1: pos.y, y2: node.y() });
                        node.x(pos.x);
                    }
                    if (Math.abs(pos.y - node.y()) < 5) {
                        lines.push({ y: pos.y, x1: pos.x, x2: node.x() });
                        node.y(pos.y);
                    }
                });
            }
        });
        setGuideLines(lines);
    };

    const handleDragEnd = (e, element) => {
        const node = e.target;
        updateElement(element.id, { x: node.x(), y: node.y() });
        setGuideLines([]);
    };

    const handleTransformEnd = (e, element) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        if (element.type === 'chair') {
            updateElement(element.id, {
                x: node.x(),
                y: node.y(),
                radius: Math.max(5, node.radius() * Math.max(scaleX, scaleY)),
                rotation: node.rotation(),
            });
        } else {
            updateElement(element.id, {
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(5, node.height() * scaleY),
                rotation: node.rotation(),
            });
        }
    };

    const handleMouseDown = (e) => {
        if (e.target !== e.target.getStage()) {
            return;
        }
        const { x, y } = e.target.getStage().getPointerPosition();
        selectionBoxRef.current = { x, y, width: 0, height: 0 };
        setIsSelecting(true);
        selectionRectRef.current.width(0);
        selectionRectRef.current.height(0);
        selectionRectRef.current.visible(true);
    };

    const handleMouseMove = (e) => {
        if (!isSelecting) {
            return;
        }
        const { x, y } = e.target.getStage().getPointerPosition();
        const { x: startX, y: startY } = selectionBoxRef.current;
        const width = x - startX;
        const height = y - startY;
        selectionRectRef.current.setAttrs({
            x: startX,
            y: startY,
            width,
            height,
        });
    };

    const handleMouseUp = () => {
        if (!isSelecting) {
            return;
        }
        setIsSelecting(false);
        selectionRectRef.current.visible(false);
        const selectedNodes = layerRef.current.find('.selectable').filter((node) => {
            const shape = node.getClientRect();
            const selBox = selectionBoxRef.current;
            return (
                shape.x >= selBox.x &&
                shape.y >= selBox.y &&
                shape.x + shape.width <= selBox.x + selBox.width &&
                shape.y + shape.height <= selBox.y + selBox.height
            );
        });
        const selectedElements = selectedNodes.map((node) => elements.find((el) => el.id === node.id()));
        setSelectedElements(selectedElements);
    };

    const renderGrid = () => {
        const lines = [];
        for (let i = 0; i < window.innerWidth / GRID_SIZE; i++) {
            lines.push(
                <Line
                    key={`v${i}`}
                    points={[i * GRID_SIZE, 0, i * GRID_SIZE, window.innerHeight]}
                    stroke="#ddd"
                    strokeWidth={0.5}
                />
            );
        }
        for (let i = 0; i < window.innerHeight / GRID_SIZE; i++) {
            lines.push(
                <Line
                    key={`h${i}`}
                    points={[0, i * GRID_SIZE, window.innerWidth, i * GRID_SIZE]}
                    stroke="#ddd"
                    strokeWidth={0.5}
                />
            );
        }
        return lines;
    };

    return (
        <Stage
            width={window.innerWidth - 300}
            height={window.innerHeight - 100}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer>{renderGrid()}</Layer>
            <Layer ref={layerRef}>
                {elements.map((element) => {
                    if (element.type === 'table' || element.type === 'sofa') {
                        return (
                            <Rect
                                key={element.id}
                                id={element.id}
                                className="selectable"
                                x={element.x}
                                y={element.y}
                                width={element.width}
                                height={element.height}
                                fill={element.fill}
                                stroke={selectedElements.some(sel => sel.id === element.id) ? 'red' : element.borderColor}
                                strokeWidth={3}
                                rotation={element.rotation}
                                cornerRadius={element.type === 'sofa' ? 10 : 0}
                                draggable
                                onClick={(e) => handleSelect(element, e)}
                                onDragMove={handleDragMove}
                                onDragEnd={(e) => handleDragEnd(e, element)}
                                onTransformEnd={(e) => handleTransformEnd(e, element)}
                            />
                        );
                    } else if (element.type === 'chair') {
                        return (
                            <Circle
                                key={element.id}
                                id={element.id}
                                className="selectable"
                                x={element.x}
                                y={element.y}
                                radius={element.radius}
                                fill={element.fill}
                                stroke={selectedElements.some(sel => sel.id === element.id) ? 'red' : element.borderColor}
                                strokeWidth={3}
                                rotation={element.rotation}
                                draggable
                                onClick={(e) => handleSelect(element, e)}
                                onDragMove={handleDragMove}
                                onDragEnd={(e) => handleDragEnd(e, element)}
                                onTransformEnd={(e) => handleTransformEnd(e, element)}
                            />
                        );
                    }
                    return null;
                })}
                {guideLines.map((line, index) => (
                    <Line
                        key={index}
                        points={
                            line.x !== undefined
                                ? [line.x, 0, line.x, window.innerHeight]
                                : [0, line.y, window.innerWidth, line.y]
                        }
                        stroke="red"
                        strokeWidth={1}
                    />
                ))}
                <Rect
                    ref={selectionRectRef}
                    fill="rgba(0,0,255,0.2)"
                    visible={false}
                />
                {selectedElements.length > 0 && (
                    <Transformer
                        ref={transformerRef}
                        nodes={selectedElements.map((el) => layerRef.current.findOne(`#${el.id}`))}
                        boundBoxFunc={(oldBox, newBox) => newBox}
                        rotationSnaps={[0, 90, 180, 270]}
                    />
                )}
            </Layer>
        </Stage>
    );
};

export default DrawingArea;
