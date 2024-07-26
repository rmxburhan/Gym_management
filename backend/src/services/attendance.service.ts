import dayjs from "dayjs";
import AttendanceCode, {
  IAttendanceCode,
} from "../models/attendancecode.model";
import Attendance from "../models/attendance.model";
import User from "../models/user.model";

export const getCode = async (): Promise<IAttendanceCode | null> =>
  await AttendanceCode.findOne({
    expiresIn: { $gte: dayjs().toDate() },
  }).sort({ createdAt: -1 });

export const getAttendances = async (query?: {
  today?: string;
  dateStart?: string;
  dateEnd?: string;
  userId?: string;
  checkout?: string;
}) => {
  const filter: { checkInTime?: any; userId?: any; checkOutTime?: any } = {};

  const filterDate: { $gte?: any; $lte?: any } = {};
  if (query?.dateStart) {
    console.log(query.dateStart);
    try {
      const startDateFilter = new Date(query.dateStart.toString());
      filterDate["$gte"] = startDateFilter.setHours(0, 0, 0, 0);
      filter.checkInTime = filterDate;
    } catch (error) {}
  }
  if (query?.dateEnd) {
    console.log(query.dateEnd);
    try {
      const endDateFilter = new Date(query.dateEnd.toString());
      filterDate["$lte"] = endDateFilter.setHours(23, 59, 59, 599);
      filter.checkInTime = filterDate;
    } catch (error) {}
  }

  if (query?.today == "true" || query?.today == "1") {
    console.log(typeof query.today);
    console.log(query.today);
    const dateNow = new Date();
    filter.checkInTime = {
      $gte: dateNow.setHours(0, 0, 0, 0),
      $lte: dateNow.setHours(23, 59, 59, 599),
    };
  }

  if (query?.userId) {
    console.log(query.userId);
    const member = await User.findOne({
      _id: query.userId,
      deletedAt: undefined,
    });

    if (member) {
      filter.userId = member.id;
    }
  }

  if (query?.checkout == "true" || query?.checkout == "false") {
    filter.checkOutTime = undefined;
  } else if (query?.checkout == "false" || query?.checkout == "0") {
    filter.checkOutTime = { $exists: true };
  }
  return await Attendance.find(filter).sort({ createdAt: -1 });
};

export const postCheckIn = async (id: string, code: string) => {
  const codeValid = await AttendanceCode.findOne({
    expiresIn: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!codeValid || codeValid?.code !== code) {
    const error = new Error("Code invalid");
    error.name = "BadRequest";
    throw error;
  }

  const dateToday = new Date();
  const startHour = new Date(dateToday.setHours(0, 0, 0, 0));
  const endHour = new Date(dateToday.setHours(23, 59, 59, 999));

  const alreadyCheckIn = await Attendance.findOne({
    checkInTime: { $gte: startHour, $lte: endHour },
    userId: id,
    checkOutTime: undefined,
  });

  if (alreadyCheckIn) {
    const error = new Error("You already checkIn");
    error.name = "BadRequest";
    throw error;
  }

  return await Attendance.create({
    userId: id,
    checkInTime: dayjs().toDate(),
  });
};

export const postCheckOut = async (id: string) => {
  const startHour = new Date(new Date().setHours(0, 0, 0, 0));
  const endHour = new Date(new Date().setHours(23, 59, 59, 999));

  const attendance = await Attendance.findOne({
    userId: id,
    checkInTime: { $gte: startHour, $lte: endHour },
    checkOutTime: undefined,
  }).sort({ createdAt: -1 });

  if (!attendance) {
    const error = new Error("Check out failed, Please checkIn first");
    error.name = "BadRequest";
    throw error;
  }

  attendance.checkOutTime = new Date();
  return await attendance.save();
};

// export const getMyAttendencesHistory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const user = (req as RequestAuth).user;
//     const filter: { checkInTime?: any; checkOutTime?: any; userId: string } = {
//       userId: (req as RequestAuth).user.id,
//     };

//     if (startDate != undefined) {
//       try {
//         const dateStartFilter = new Date(startDate.toString());
//         filter.checkInTime = dateStartFilter;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     if (endDate != undefined) {
//       try {
//         const endDateFilter = new Date(endDate.toString());
//         filter.checkOutTime = endDateFilter;
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     const myAttendances = await Attendance.find(filter);

//     return res.status(200).json({
//       message: "Get history attendance data succes",
//       data: {
//         histories: myAttendances,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

export default {
  getCode,
  getAttendances,
  postCheckIn,
  postCheckOut,
};
