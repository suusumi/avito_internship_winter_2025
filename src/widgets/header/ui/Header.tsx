import React from "react";
import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import {Search} from "../../../features/search";

export const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{flexGrow: 1, textDecoration: 'none', color: 'inherit'}}
                    >
                        Avito
                    </Typography>
                    <Search/>
                    <Button color="inherit" component={RouterLink} to="/items">
                        Объявления
                    </Button>
                    <Button variant="contained" color="primary" component={RouterLink} sx={{textTransform: 'none'}}
                            to="/form">
                        Разместить объявление
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
