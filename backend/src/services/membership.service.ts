import dayjs from "dayjs";
import Membership, { IMembership } from "../models/membership.model";

export const getMemberships = async () =>
  await Membership.find({ deletedAt: undefined }).sort({
    createdAt: -1,
  });

export const addMembership = async (
  name: string,
  description: string,
  duration: number,
  price: number,
  discountPrice: number
): Promise<IMembership | null> =>
  Membership.create({
    name,
    description,
    duration,
    price,
    discountPrice,
  });

export const getMembershipById = async (id: string) =>
  await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });

export const patchPublishStatus = async (id: string): Promise<IMembership> => {
  const membership = await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });
  if (!membership) {
    const error = new Error("Change publish membership failed. Id not found");
    error.name = "NotFound";
    throw error;
  }
  membership.published = !membership.published;
  return await membership.save();
};

export const updateMembership = async (
  id: string,
  name: string,
  description: string,
  duration: number,
  price: number,
  discountPrice: number
) => {
  const membership = await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });

  if (!membership) {
    const error = new Error("Update membership failed, Id not found");
    error.name = "NotFound";
    throw error;
  }

  if (name) membership.name = name;
  if (description) membership.description = description;
  if (duration) membership.duration = duration;
  if (price) membership.price = price;
  if (discountPrice) membership.discountPrice = discountPrice;
  return await membership.save();
};

export const deleteMembership = async (id: string) => {
  const membership = await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });

  if (!membership) {
    const error = new Error("Delete membership failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  membership.deletedAt = dayjs().toDate();
  return await membership.save();
};

// export const registerMembership = async (req: Request, res: Response) => {
//   try {
//     const { membershipId } = req.body;
//     const user = (req as RequestAuth).user;
//     const membershipExist = await Membership.findOne({
//       deletedAt: undefined,
//       _id: membershipId,
//       published: true,
//     });

//     if (!membershipExist) {
//       return res.status(400).json({
//         success: false,
//         message: "Register membership failed, membership not found",
//       });
//     }
//     const membershipAlreadyRegistered = await UserMembership.findOne({
//       memberId: user._id,
//       deletedAt: undefined,
//       expiresDate: { $gt: new Date() },
//     }).sort({ registerDate: -1 });

//     console.log(membershipAlreadyRegistered);

//     if (membershipAlreadyRegistered) {
//       return res.status(400).json({
//         success: false,
//         message: "Member already registered in membership",
//       });
//     }

//     const registerDate = new Date();
//     const membershipData = new UserMembership({
//       membershipId,
//       memberId: user._id,
//       registerDate,
//       expiresDate: addDays(registerDate, membershipExist.duration),
//     });
//     await membershipData.save();
//     return res.status(200).json({
//       success: true,
//       message: "Membership has been registered",
//     });
//   } catch (error: any) {
//     if (error)
//       return res.status(500).json({
//         success: false,
//         error: error.message,
//       });
//   }
// };

export default {
  getMemberships,
  addMembership,
  getMembershipById,
  patchPublishStatus,
  updateMembership,
  deleteMembership,
};
