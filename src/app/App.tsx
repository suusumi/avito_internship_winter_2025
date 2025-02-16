import '../App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container, ThemeProvider} from "@mui/material";
import {AllItemsPage} from "../pages/allItems";
import {DetailedItemPage} from "../pages/detailedItem";
import {FormPage} from "../pages/form";
import {Header} from "../widgets/header";
import {theme} from "../shared/theme/theme.ts";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<AllItemsPage/>}/>
                        <Route path="/item/:id" element={<DetailedItemPage/>}/>
                        <Route path="/form/:id" element={<FormPage/>}/>
                        <Route path="/form" element={<FormPage/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>

    )
}

export default App
