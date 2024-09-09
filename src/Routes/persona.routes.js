import { Router } from "express";
import PersonaServices from "../Services/persona.service.js";

const personaServices = new PersonaServices();

const router = Router();

router.post('/create', async (req, res) => {
    const body = req.body;
    const persona = await personaServices.CrearPersona(body);
    res.json(persona);
})

export default router;