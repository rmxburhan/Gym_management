import Settings from "../models/settings.model";

export const getSettings = async () => {
  return await Settings.findOne();
};

export const updateSettings = async (
  app_name?: string,
  lat?: string,
  lng?: string,
  timezone?: string
) => {
  const query: any = {};
  if (app_name) query.app_name = app_name;
  if (lat) query.lat = lat;
  if (lng) query.lng = lng;
  if (timezone) query.timezone = timezone;

  return await Settings.findOneAndUpdate({}, query, { new: true });
};

export const updateLogo = async (file: Express.Multer.File) => {
  const path = file.path.split("/public")[1];
  return await Settings.findOneAndUpdate({}, { image: path }, { new: true });
};

export default {
  getSettings,
  updateSettings,
  updateLogo,
};
