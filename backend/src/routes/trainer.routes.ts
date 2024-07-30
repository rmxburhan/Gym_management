import { NextFunction, Request, Response, Router } from 'express';
import trainerService from '../services/trainer.service';
import {
    validaAddTrainerInput,
    validateUpdateTrainerInput,
} from '../validator/trainer.validator';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';
import { uploadSingle } from '../utils/upload';
import authorize from '../middleware/authorization.middleware';

const route = Router();

/**
 * @api {get}
 * @apiName Get Trainers
 * @apiGroup Trainers
 *
 * @apiSuccess 200
 */
route.get(
    '/',
    authorize(['admin']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainers = await trainerService.getTrainers();
            return res.status(200).json({
                message: 'Trainer data success retrieved',
                data: trainers,
            });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @api {post}
 * @apiName Create Trainer
 * @apiGroup Trainers
 *
 * @apiParam {String} name: body
 * @apiParam {String} email: body
 * @apiParam {String} password: body
 * @apiParam {Array[]} addresses: body
 * @apiParam {String} bank: body
 * @apiParam {Number} bankNumber: body
 * @apiParam {String} phoneNumber: body
 * @apiParam {String} identificationNumber: body
 * @apiParam {Image} profile: body
 *
 * @apiSuccess 200
 * @apiError 404, 400
 */
route.post(
    '/',
    authorize(['admin']),
    uploadSingle('profile'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = validaAddTrainerInput.validate(req.body);

            const {
                name,
                email,
                password,
                addresses,
                bank,
                bankNumber,
                phoneNumber,
                identificationNumber,
            } = input.value;

            const profile = req.file;

            if (input.error) {
                throw input.error;
            }

            let trainer = await trainerService.addTrainer(
                name,
                email,
                password,
                addresses,
                bank,
                bankNumber,
                identificationNumber,
                phoneNumber,
                profile
            );

            if (!trainer) {
                throw new Error('Add trainer failed');
            }

            return res.status(200).json({
                message: 'Add tariner success',
            });
        } catch (error) {
            if (req.file) {
                if (existsSync(path.join(process.cwd(), req.file.path))) {
                    unlinkSync(path.join(process.cwd(), req.file.path));
                }
            }
            next(error);
        }
    }
);

/**
 * @api {post}
 * @apiName Update Trainer
 * @apiGroup Trainers
 *
 * @apiParam {String} name?: body
 * @apiParam {String} email?: body
 * @apiParam {String} password?: body
 * @apiParam {Array[]} addresses?: body
 * @apiParam {String} bank?: body
 * @apiParam {Number} bankNumber?: body
 * @apiParam {String} phoneNumber?: body
 * @apiParam {String} identificationNumber?: body
 * @apiParam {Image} profile?: body
 *
 * @apiSuccess 200
 * @apiError 404, 400
 */
route.post(
    '/:id',
    authorize(['admin']),
    uploadSingle('profile'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const profile = req.file;
            const input = validateUpdateTrainerInput.validate(req.body);
            const {
                name,
                email,
                password,
                addresses,
                bank,
                bankNumber,
                phoneNumber,
                identificationNumber,
            } = input.value;

            if (input.error) {
                throw input.error;
            }

            let trainer = await trainerService.updateTrainer(
                id,
                name,
                email,
                password,
                addresses,
                bank,
                bankNumber,
                phoneNumber,
                identificationNumber,
                profile
            );

            return res.status(200).json({
                message: 'Update trainer succes.',
                data: trainer,
            });
        } catch (error) {
            if (req.file) {
                const pathToFile = path.join(process.cwd(), req.file.path);
                if (existsSync(pathToFile)) {
                    unlinkSync(pathToFile);
                }
            }
            next(error);
        }
    }
);

/**
 * @api {delete}
 * @apiName Delete Trainer
 * @apiGroup Trainers
 *
 * @apiParam {String} id: parameter
 *
 * @apiSuccess 204
 * @apiError 404
 */
route.delete(
    '/:id',
    authorize(['admin']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await trainerService.deleteTrainer(id);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
);

export default route;
