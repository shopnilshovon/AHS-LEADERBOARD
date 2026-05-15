function getBangladeshTime(){

const now = new Date();

const options = {
timeZone: "Asia/Dhaka",
year: "numeric",
month: "long",
day: "numeric",
hour: "numeric",
minute: "2-digit",
hour12: true
};

return now.toLocaleString("en-US",options);

}

/* AUTO UPDATE TIMES */

const dailyUpdate =
getBangladeshTime();

const weeklyUpdate =
getBangladeshTime();

const alltimeUpdate =
getBangladeshTime();