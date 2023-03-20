import {Request, Response, NextFunction} from "express";

const getClosest = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.loadId && req.body.x && req.body.y) {
        return res.status(200).json({
            message: "Working!"
        })
    }

    return res.status(400).json({
        message: "Invalid payload format - expected {loadId, x, y}"
    })

}

export default {getClosest}