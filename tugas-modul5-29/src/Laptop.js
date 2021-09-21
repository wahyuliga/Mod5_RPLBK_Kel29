import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
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
    const [deskripsi, setDeskripsi] = useState([laptop.deskripsi]);
    const [open, setOpen] = useState(false);
    const desc = useContext(DeskripsiContext);
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
            console.log(data.data);
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
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={results.image}
                                    alt={results.name}
                                />
                                <CardActionArea onClick={() => {setOpen(true)}}>
                                    <CardContent style={{ backgroundColor: '#dff8ef' }}>
                                        <Typography>Name: {results.name}</Typography>
                                        <Typography>Harga: {results.harga}​​​​​​</Typography>
                                        <Typography>Spesifikasi: {results.spec.Layar}​​​​​​</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <DeskripsiContext.Provider value={deskripsi}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Deskripsi Laptop
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Coba dulu modalnya
                                {/* {desc.map((spek) => {
                                    return (
                                        <div>
                                            <p>{spek.Layar}</p>
                                            <p>{spek.Prosesor}</p>
                                            <p>{spek.Grafis}</p>
                                            <p>{spek.RAM}</p>
                                            <p>{spek.Penyimpanan}</p>
                                        </div>          
                                    );
                                })} */}
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </DeskripsiContext.Provider>
        </div>
    );
}