import Joi from "joi";

export const validateInputPostAnnouncement = Joi.object({
  title: Joi.string().required(),
});

export const validateInputUpdateAnnouncement = Joi.object({
  title: Joi.string().optional(),
});
