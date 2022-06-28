import express from "express";
import diagnosesServices from "../services/diagnosesServices";

const diagnosesRoute = express.Router();


diagnosesRoute.get('/', (_req, res) => {
    res.send(diagnosesServices.getDiagnoses());
});

export default diagnosesRoute;