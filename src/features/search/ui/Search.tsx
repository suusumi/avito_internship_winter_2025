import React, {useState} from "react";
import {InputBase, Paper, Button} from "@mui/material";
import {useSearchParams} from "react-router-dom";

export const Search: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchParams.set("search", searchTerm);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
