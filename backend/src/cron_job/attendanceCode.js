const cron = require('node-cron');
const AttendanceCode = require('../models/AttendanceCode');
const { addDays } = require('date-fns');
const insertCodeAttendance = async () => {
    const code = await AttendanceCode.findOne({
        expiresIn: { $gte: new Date() },
    });
    if (!code) {
        const newCode = new AttendanceCode({
            code: generateRandomCode(),
            createdIn: new Date(),
            expiresIn: addDays(new Date().setHours(0, 0, 0, 0), 1),
        });
        await newCode.save();
    }
};

const generateRandomCode = () => {
    const raw = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const charactersLength = raw.length;
    for (let i = 0; i < 6; i++) {
        result += raw.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const job = () => {
    insertCodeAttendance();
    cron.schedule('0 0 * * *', () => {
        console.log('running cron job : insert code attendance');
        insertCodeAttendance();
    });
};

module.exports = job;
