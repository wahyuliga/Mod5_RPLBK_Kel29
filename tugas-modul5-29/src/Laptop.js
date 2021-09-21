import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeskripsiContext = createContext();

export default function Laptop()  {
    const [laptop, setLaptop] = useState([]);
    const [merk, setMerk] = useState('');
    const [spek, setSpek] = useState([]);
    const [deskripsi, setDeskripsi] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3000/data",
            headers: {
                accept: "*/*",
            },
        })
        
        .then((data) => {
            setLaptop(data.data);
        })
        
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div style={{ marginTop: 20 }}>
            <AppBar style={{ padding: "10px", marginBottom: "100px" }}>
                <Typography style={{ margin: "auto" }}>Daftar Harga dan Spesifikasi Laptop September 2021</Typography>
            </AppBar>
            
            <Grid container md={11} spacing={4} style={{margin: "auto", marginTop: "50px"}}>
                {laptop.map((results) => {
                    return (
                        <Grid item key={results.name} md={3}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={results.image}
                                    alt={results.name}
                                />
                                <CardActionArea onClick={() => {setOpen(true); setDeskripsi(results.desc); setMerk(results.name); setSpek(results.spec)}}>
                                    <CardContent style={{ backgroundColor: '#efefff', height: "120px" }}>
                                        <Typography variant="h6">{results.name}</Typography>
                                        <Typography variant="body2">Harga: {results.harga}​​​​​​</Typography>
                                        <Button size="small">Detail</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <DeskripsiContext.Provider value={{desc:deskripsi, name: merk, spec: spek}}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Deskripsi/>    
                    </Modal>
                </div>
            </DeskripsiContext.Provider>
        </div>
    );
}

function Deskripsi() {
    const info = useContext(DeskripsiContext);
    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {info.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Layar: {info.spec.Layar}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Prosesor: {info.spec.Prosesor}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Grafis: {info.spec.Grafis}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                RAM: {info.spec.RAM}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Penyimpanan: {info.spec.Penyimpanan}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {info.desc}
            </Typography>
        </Box>
    );
}