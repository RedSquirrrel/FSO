import express from "express";
import patientsServices from '../services/patientsServices';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientsServices.getNoneSensitiveEntries());
});

export default patientsRouter;
