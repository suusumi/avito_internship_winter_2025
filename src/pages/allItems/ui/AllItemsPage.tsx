import * as React from "react";
import {Grid} from "@mui/material";
import {ItemsList} from "../../../features/itemsList";
import {Filters} from "../../../features/filters";
import {useSearchParams} from "react-router-dom";

export const AllItemsPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        console.log("Фильтры при загрузке списка:", searchParams.toString());
    }, [searchParams]);

    return (
        <Grid container spacing={2} sx={{marginTop: "10px"}}>
            <Grid item xs={12} md={4} lg={4}>
                <Filters/>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
                <ItemsList/>
            </Grid>
        </Grid>
    );
};
