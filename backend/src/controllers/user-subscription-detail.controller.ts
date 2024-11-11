import { Request, Response } from 'express';
import { getUserSubscriptionDetailService } from '../services/subscriptionDetail';
export const getUserSubscriptionDetail = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const userSubscriptionDetail = await getUserSubscriptionDetailService(userId);
        if (!userSubscriptionDetail) {
            return res.status(400).json({
                status: 400,
                message: 'User subscription detail not found'
            });
        }
        return res.status(200).json({
            status: 200,
            data: userSubscriptionDetail
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}