/* =========================
   AUTO UPDATE INFO SYSTEM
========================= */

/*
এই ফাইল auto detect করবে
কখন leaderboard update হয়েছে।

তুমি শুধু যেকোনো leaderboard file
save/update করলেই time auto change হবে।
*/

/* DAILY UPDATE */

const dailyUpdate =
new Date(document.lastModified)
.toLocaleString("en-US",{

month:"long",
day:"numeric",
year:"numeric",

hour:"numeric",
minute:"2-digit",

hour12:true

});

/* WEEKLY UPDATE */

const weeklyUpdate =
new Date(document.lastModified)
.toLocaleString("en-US",{

month:"long",
day:"numeric",
year:"numeric",

hour:"numeric",
minute:"2-digit",

hour12:true

});

/* ALL TIME UPDATE */

const alltimeUpdate =
new Date(document.lastModified)
.toLocaleString("en-US",{

month:"long",
day:"numeric",
year:"numeric",

hour:"numeric",
minute:"2-digit",

hour12:true

});

/* =========================
   OPTIONAL CUSTOM FORMAT
========================= */

/*
যদি future এ custom date দিতে চাও:

const dailyUpdate =
"15 May 2026 • 8:35 PM";

এভাবেও দিতে পারবা।
*/
