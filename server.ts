import { Request, Response } from "express";
import app from "./app";

const port = 8000;

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


