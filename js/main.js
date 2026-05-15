const list = document.getElementById("list");

const latestUpdate =
"15 May 2026 • 5:18 PM";

/* =========================
   DATA SOURCES
========================= */

const dailyData = typeof users !== "undefined"
? users
: [];

const weeklyData = typeof weeklyUsers !== "undefined"
? weeklyUsers
: [];

const allTimeData = typeof alltimeUsers !== "undefined"
? alltimeUsers
: [];

/* =========================
   BUTTONS
========================= */

const dailyBtn =
document.getElementById("dailyBtn");

const weeklyBtn =
document.getElementById("weeklyBtn");

const alltimeBtn =
document.getElementById("alltimeBtn");

let currentData = dailyData;

/* =========================
   ACTIVE BUTTON
========================= */

function setActive(btn){

dailyBtn.classList.remove("active");
weeklyBtn.classList.remove("active");
alltimeBtn.classList.remove("active");

btn.classList.add("active");

}

/* =========================
   RENDER FUNCTION
========================= */

function render(data){

list.innerHTML = "";

if(!data || data.length === 0){

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

document.getElementById("userCount").innerText = 0;
document.getElementById("totalSms").innerText = 0;
document.getElementById("totalEarn").innerText = "$0";

return;

}

/* SORT */

data.sort((a,b)=>b.sms-a.sms);

/* TOP STATS */

document.getElementById("userCount").innerText =
data.length;

document.getElementById("totalSms").innerText =
data.reduce((a,b)=>a+b.sms,0);

document.getElementById("totalEarn").innerText =
"$" +
data.reduce((a,b)=>
a + calculateEarning(b.name,b.earning),0
).toFixed(2);

/* UPDATE TIME */

document.getElementById("updateTime").innerText =
latestUpdate;

/* MAX SMS */

const maxSms =
Math.max(...data.map(x=>x.sms));

/* CARDS */

data.forEach((u,index)=>{

const earn =
calculateEarning(u.name,u.earning);

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
${u.country}
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

/* =========================
   BUTTON EVENTS
========================= */

dailyBtn.addEventListener("click",()=>{

currentData = dailyData;

setActive(dailyBtn);

render(currentData);

});

weeklyBtn.addEventListener("click",()=>{

currentData = weeklyData;

setActive(weeklyBtn);

render(currentData);

});

alltimeBtn.addEventListener("click",()=>{

currentData = allTimeData;

setActive(alltimeBtn);

render(currentData);

});

/* =========================
   SEARCH
========================= */

document
.getElementById("search")
.addEventListener("input",e=>{

const value =
e.target.value.toLowerCase();

const filtered =
currentData.filter(x=>
x.name.toLowerCase().includes(value)
);

render(filtered);

});

/* =========================
   FIRST LOAD
========================= */

setActive(dailyBtn);

render(dailyData);