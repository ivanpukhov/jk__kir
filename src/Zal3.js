import React, { useState } from 'react';
import Modal from 'react-modal';
import { Container, Grid, Button, Box, TextField, Typography } from '@mui/material';
import './App.css';

Modal.setAppElement('#root');

const initialTables = [
    { id: 'table1', reserved: false, x: 166, y: 142 },
    { id: 'table2', reserved: false, x: 166, y: 340 },
    { id: 'table3', reserved: false, x: 166, y: 538 },
    { id: 'table4', reserved: false, x: 166, y: 752 },
    { id: 'table5', reserved: false, x: 166, y: 950 },
    { id: 'table6', reserved: false, x: 405, y: 142 },
    { id: 'table7', reserved: false, x: 405, y: 340 },
    { id: 'table8', reserved: false, x: 405, y: 538 },
    { id: 'table9', reserved: false, x: 628, y: 142 },
    { id: 'table10', reserved: false, x: 628, y: 340 },
    { id: 'table11', reserved: false, x: 628, y: 538 },
    { id: 'table12', reserved: false, x: 851, y: 142 },
    { id: 'table13', reserved: false, x: 851, y: 340 },
    { id: 'table14', reserved: false, x: 851, y: 538 },
    { id: 'table15', reserved: false, x: 851, y: 752 },
    { id: 'table16', reserved: false, x: 851, y: 950 },
];

function HallThree() {
    const [tables, setTables] = useState(initialTables);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null);
    const [name, setName] = useState('');
    const [time, setTime] = useState('');

    const openModal = (table) => {
        setCurrentTable(table);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setName('');
        setTime('');
    };

    const reserveTable = () => {
        setTables(tables.map(table =>
            table.id === currentTable.id ? { ...table, reserved: true } : table
        ));
        closeModal();
        alert('Столик забронирован');
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Карта ресторана Европа. Зал 3
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <svg width="100%" height="auto" viewBox="0 0 1076 1158" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1076" height="1158" fill="#002A7B"/>
                    {tables.map(table => (
                        <g key={table.id} onClick={() => !table.reserved && openModal(table)} style={{ cursor: 'pointer' }}>
                            <rect x={table.x} y={table.y} width="66" height="66" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x + 32.5} cy={table.y - 30.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x + 32.5} cy={table.y + 96.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x + 95.5} cy={table.y + 26.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x - 32.5} cy={table.y + 26.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                        </g>
                    ))}
                    <path d="M397 1011.5C397 1021.16 389.165 1029 379.5 1029C369.835 1029 362 1021.16 362 1011.5C362 1001.84 369.835 994 379.5 994C389.165 994 397 1001.84 397 1011.5Z" fill="#21FF1C"/>
                    <circle cx="695.5" cy="1011.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="535.5" cy="849.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="625.5" cy="849.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="695.5" cy="928.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="379.5" cy="928.5" r="17.5" fill="#21FF1C"/>
                    <path d="M405 934C405 906.386 427.386 884 455 884H620C647.614 884 670 906.386 670 934V1034H627.978V943.5L537 926.5L448.228 943.5V1034H405V934Z" fill="#21FF1C"/>
                    <circle cx="437.5" cy="849.5" r="17.5" fill="#21FF1C"/>
                </svg>
            </Box>

            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
                    Забронировать столик
                </Button>
            </Grid>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Reserve Table">
                <Box p={4}>
                    <Typography variant="h6" gutterBottom>
                        Забронировать столик
                    </Typography>
                    <form onSubmit={e => { e.preventDefault(); reserveTable(); }}>
                        <TextField
                            label="Имя"
                            fullWidth
                            value={name}
                            onChange={e => setName(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Время"
                            fullWidth
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            margin="normal"
                            required
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Забронировать
                            </Button>
                            <Button type="button" onClick={closeModal} style={{ marginLeft: '10px' }}>
                                Отмена
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Container>
    );
}

export default HallThree;
