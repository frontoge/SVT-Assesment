import {Request, Response, NextFunction} from "express";
import axios from "axios";
import distance from "../utils/distance";

interface RobotPayload {
    batteryLevel: number,
    robotId: string,
    y: number,
    x: number
}

/* Endpoint to  */
const getClosest = async (req: Request, res: Response, next: NextFunction) => {
    let robots: Array<RobotPayload> = [];
    //Ensure parameters have been specified
    if (req.body.loadId && req.body.x && req.body.y) {
        //Get the data from the fleet endpoint
        await axios.get("https://60c8ed887dafc90017ffbd56.mockapi.io/robots")
            .then((response) => robots = response.data)
            .catch((error) => console.log(error));
    } else {
        //Return a 400 status if the payload provided is malformed.
        return res.status(400).json({
            message: "Invalid payload format - expected {loadId, x, y}"
        })
    }

    //Calculate the distance for each robot
    let candidates = robots.map((robot) => {
        // Calc distance for this robot
        const dist = distance(robot.x, robot.y, req.body.x, req.body.y);
        return {
            robotId: robot.robotId,
            batteryLevel: robot.batteryLevel,
            distanceToGoal: dist
        }
    })

    //Sort all robots by distance
    candidates.sort((a, b) => a.distanceToGoal - b.distanceToGoal);

    // If there is more than 1 robot less than 10 units away
    if(candidates[0].distanceToGoal <= 10 && candidates[1].distanceToGoal <= 10) {
        //Sort all candidates that are closer than 10 units by battery life descending.
        const batteryList = candidates.filter(robot => robot.distanceToGoal <= 10);
        batteryList.sort((a, b) => b.batteryLevel - a.batteryLevel);
        //Respond with the first element in the sorted list to get the correct candidate.
        return res.status(200).json({
            ...batteryList[0]
        })
    } else {
        //First candidate in the sorted list will be sufficient return that.
        return res.status(200).json({
            //Respond with the first element in the sorted list to get the correct candidate.
            ...candidates[0]
        })
    }


}

export default {getClosest}