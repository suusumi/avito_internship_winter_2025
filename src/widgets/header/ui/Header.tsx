import React from "react";
import {
    AppBar,
    Button,
    Container,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Search} from "../../../features/search";

export const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar
                    sx={{
                        flexDirection: {xs: "column", md: "row"},
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: {xs: 2, md: 1},
                    }}
                >
                    <Box
                        sx={{
                            width: {xs: "100%", md: "auto"},
                            display: "flex",
                            alignItems: "center",
                            justifyContent: {xs: "center", md: "flex-start"},
                            mb: {xs: 1, md: 0},
                        }}
                    >
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Avito
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: {xs: "100%", md: "50%"},
                            mb: {xs: 2, md: 0},
                        }}
                    >
                        <Search/>
                    </Box>
                    <Box
                        sx={{
                            width: {xs: "100%", md: "auto"},
                            display: "flex",
                            justifyContent: {xs: "center", md: "flex-end"},
                        }}
                    >
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/form"
                            sx={{
                                width: {xs: "100%", md: "auto"},
                            }}
                        >
                            Разместить объявление
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
