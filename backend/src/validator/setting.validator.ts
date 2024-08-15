import Joi from "joi";

export const validateInputPatchSettings = Joi.object({
  update: Joi.object({
    app_name: Joi.string().optional(),
    lat: Joi.string().optional(),
    lng: Joi.string().optional(),
    timezone: Joi.string().optional(),
  }),
});
