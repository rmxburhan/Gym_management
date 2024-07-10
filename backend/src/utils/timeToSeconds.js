const timeToSecond = (timeString) => {
    const [hour, minute, second] = time.split(':').map(Number);
    return hour * 3600 + minute * 60 + second;
};

module.exports = timeToSecond;
