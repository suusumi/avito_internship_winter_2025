import '../App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";
import {AllItemsPage} from "../pages/allItems";
import {DetailedItemPage} from "../pages/detailedItem";
import {FormPage} from "../pages/form";

function App() {

    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<AllItemsPage/>}/>
                    <Route path="/item/:id" element={<DetailedItemPage/>}/>
                    <Route path="/form" element={<FormPage/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
