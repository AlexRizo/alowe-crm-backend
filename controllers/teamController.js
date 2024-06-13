import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
    const teamData = req.body;

    const team = new Team(teamData);

    try {
        await team.save();
        res.status(200).json({
            ok: true,
            team,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, hable con el administrador.'
        });
    }
};