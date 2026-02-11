import { Request, Response } from "express";
import app from "./app";
import env from "./src/configs/env";

const port = env.PORT || 8000;

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


