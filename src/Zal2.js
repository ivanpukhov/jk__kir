import React, { useState } from 'react';
import Modal from 'react-modal';
import { Container, Grid, Button, Box, TextField, Typography } from '@mui/material';
import './App.css';

Modal.setAppElement('#root');

const initialTables = [
    { id: 'table1', reserved: false, x: 161, y: 130 },
    { id: 'table2', reserved: false, x: 161, y: 526 },
    { id: 'table3', reserved: false, x: 161, y: 938 },
    { id: 'table4', reserved: false, x: 400, y: 130 },
    { id: 'table5', reserved: false, x: 400, y: 740 },
    { id: 'table6', reserved: false, x: 632, y: 551 },
    { id: 'table7', reserved: false, x: 400, y: 938 },
    { id: 'table8', reserved: false, x: 623, y: 130 },
    { id: 'table9', reserved: false, x: 623, y: 328 },
    { id: 'table10', reserved: false, x: 846, y: 130 },
    { id: 'table11', reserved: false, x: 846, y: 740 },
    { id: 'table12', reserved: false, x: 846, y: 938 },
    { id: 'table13', reserved: false, x: 1069, y: 130 },
    { id: 'table14', reserved: false, x: 1069, y: 526 },
    { id: 'table15', reserved: false, x: 1069, y: 938 },
];

function HallTwo() {
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
                Карта ресторана Европа. Зал 2
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <svg width="100%" height="auto" viewBox="0 0 1296 1504" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1296" height="1504" fill="#002A7B"/>
                    {tables.map(table => (
                        <g key={table.id} onClick={() => !table.reserved && openModal(table)} style={{ cursor: 'pointer' }}>
                            <rect x={table.x} y={table.y} width="66" height="66" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x + 32.5} cy={table.y - 30.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x + 32.5} cy={table.y + 96.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x + 95.5} cy={table.y + 26.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                            <circle cx={table.x - 32.5} cy={table.y + 26.5} r="17.5" fill={table.reserved ? "#FF1C1C" : "#21FF1C"}/>
                        </g>
                    ))}
                    <path d="M326 1299C326 1271.39 348.386 1249 376 1249H935C962.614 1249 985 1271.39 985 1299V1399H880.5V1308.5H661H433.5V1399H326V1299Z" fill="#21FF1C"/>
                    <circle cx="450.5" cy="1214.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="291.5" cy="1323.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="1019.5" cy="1323.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="548.5" cy="1214.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="655.5" cy="1214.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="762.5" cy="1214.5" r="17.5" fill="#21FF1C"/>
                    <circle cx="860.5" cy="1214.5" r="17.5" fill="#21FF1C"/>
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

export default HallTwo;
