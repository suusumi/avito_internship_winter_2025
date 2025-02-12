import React from "react";
import {InputBase, Paper, Button} from "@mui/material";

export const Search: React.FC = () => {
    return (
        <Paper
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '14px',
                border: '2px solid #2196F3',
                width: '100%',
                maxWidth: 600,
                boxShadow: 'none',

            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    padding: '0 10px',
                    fontSize: '14px',
                    color: '#000',
                }}
                placeholder="Поиск по объявлениям"
                inputProps={{'aria-label': 'Поиск по объявлениям'}}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    borderRadius: '10px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    fontSize: '14px',
                    boxShadow: 'none',
                    '&:hover': {backgroundColor: '#1E88E5'},
                }}
            >
                Найти
            </Button>
        </Paper>
    );
};
