import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Laptop()  {
    const [laptop, setLaptop] = useState([]);

    // useEffect((deskripsi) => {
    //     alert("Deskripsi : " + deskripsi);
    // }, [])

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
                                <CardActionArea>
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
        </div>
    );
}