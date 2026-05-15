const list = document.getElementById("list");

const userCount = document.getElementById("userCount");
const totalSms = document.getElementById("totalSms");
const totalEarn = document.getElementById("totalEarn");

const searchInput = document.getElementById("search");

const dailyBtn = document.getElementById("dailyBtn");
const weeklyBtn = document.getElementById("weeklyBtn");
const alltimeBtn = document.getElementById("alltimeBtn");

const updateText = document.getElementById("updateText");

/* SAFE DATA LOAD */

const dailyData =
typeof users !== "undefined"
? users
: [];

const weeklyDataSafe =
typeof weeklyUsers !== "undefined"
? weeklyUsers
: [];

const alltimeDataSafe =
typeof alltimeUsers !== "undefined"
? alltimeUsers
: [];

/* CURRENT DATA */

let currentData = [...dailyData];

/* UPDATE INFO */

function setUpdate(type){

if(type === "daily"){

updateText.innerText =
typeof dailyUpdate !== "undefined"
? dailyUpdate
: "No update";

}

else if(type === "weekly"){

updateText.innerText =
typeof weeklyUpdate !== "undefined"
? weeklyUpdate
: "No update";

}

else if(type === "alltime"){

updateText.innerText =
typeof alltimeUpdate !== "undefined"
? alltimeUpdate
: "No update";

}

}

/* ACTIVE BUTTON */

function setActive(btn){

dailyBtn.classList.remove("active");
weeklyBtn.classList.remove("active");
alltimeBtn.classList.remove("active");

btn.classList.add("active");

}

/* TOP INFO */

function updateTop(data){

userCount.innerText = data.length;

totalSms.innerText =
data.reduce((a,b)=>a+b.sms,0);

totalEarn.innerText =
"$" +
data.reduce((a,b)=>
a + calculateEarning(
b.name,
b.earning
),0).toFixed(2);

}

/* RENDER */

function render(data){

list.innerHTML = "";

if(data.length === 0){

list.innerHTML = `

<div class="notfound">

<h2>
❌ No Leaderboard Data
</h2>

<p>
No users available.
</p>

</div>

`;

updateTop([]);

return;

}

updateTop(data);

const sorted =
[...data].sort((a,b)=>b.sms-a.sms);

const maxSms =
Math.max(...sorted.map(x=>x.sms));

sorted.forEach((u,index)=>{

const earn =
calculateEarning(
u.name,
u.earning
);

const percent =
(u.sms/maxSms)*100;

const card =
document.createElement("div");

card.className = "card";

card.innerHTML = `

<div class="cardTop">

<div class="left">

<div class="rankBox">
${index + 1}
</div>

<div class="userInfo">

<div class="name">
${u.name}
</div>

<div class="country">

<img
src="https://flagcdn.com/w80/bd.png"
class="flag"
>

<span>
${u.country || "Bangladesh"}
</span>

</div>

</div>

</div>

<div class="right">

<div class="sms">
${u.sms}
</div>

<div class="earn">
$${earn.toFixed(3)}
</div>

</div>

</div>

<div class="progress">

<div
class="bar"
style="width:${percent}%"
></div>

</div>

`;

list.appendChild(card);

});

}

/* DAILY */

dailyBtn.addEventListener("click",()=>{

currentData = [...dailyData];

render(currentData);

setActive(dailyBtn);

setUpdate("daily");

});

/* WEEKLY */

weeklyBtn.addEventListener("click",()=>{

currentData = [...weeklyDataSafe];

render(currentData);

setActive(weeklyBtn);

setUpdate("weekly");

});

/* ALL TIME */

alltimeBtn.addEventListener("click",()=>{

currentData = [...alltimeDataSafe];

render(currentData);

setActive(alltimeBtn);

setUpdate("alltime");

});

/* SEARCH */

searchInput.addEventListener("input",(e)=>{

const value =
e.target.value.toLowerCase();

const filtered =
currentData.filter(x=>
x.name.toLowerCase()
.includes(value)
);

render(filtered);

});

/* DEFAULT LOAD */

render(currentData);

setActive(dailyBtn);

setUpdate("daily");