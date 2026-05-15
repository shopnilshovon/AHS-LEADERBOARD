const list = document.getElementById("list");

const dailyBtn =
document.getElementById("dailyBtn");

const weeklyBtn =
document.getElementById("weeklyBtn");

const alltimeBtn =
document.getElementById("alltimeBtn");

const updateText =
document.getElementById("updateText");

let currentData = users;

/* =========================
   UPDATE INFO
========================= */

if(typeof dailyUpdate !== "undefined"){

updateText.innerText =
dailyUpdate;

}

/* =========================
   UPDATE STATS
========================= */

function updateStats(data){

document.getElementById("userCount").innerText =
data.length;

document.getElementById("totalSms").innerText =
data.reduce((a,b)=>a+b.sms,0);

document.getElementById("totalEarn").innerText =
"$" +
data.reduce((a,b)=>
a + calculateEarning(b.name,b.earning)
,0).toFixed(2);

}

/* =========================
   RENDER LEADERBOARD
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

updateStats([]);

return;

}

/* SORT */

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
${index+1}
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

updateStats(sorted);

}

/* =========================
   DEFAULT LOAD
========================= */

render(users);

/* =========================
   SEARCH
========================= */

document
.getElementById("search")
.addEventListener("input",e=>{

const value =
e.target.value.toLowerCase();

const filtered =
currentData.filter(user=>
user.name
.toLowerCase()
.includes(value)
);

render(filtered);

});

/* =========================
   BUTTON ACTIVE SYSTEM
========================= */

function setActive(btn){

[dailyBtn,weeklyBtn,alltimeBtn]
.forEach(button=>{

button.classList.remove("active");

});

btn.classList.add("active");

}

/* =========================
   DAILY BUTTON
========================= */

dailyBtn.addEventListener("click",()=>{

currentData = users;

render(currentData);

if(typeof dailyUpdate !== "undefined"){

updateText.innerText =
dailyUpdate;

}

setActive(dailyBtn);

});

/* =========================
   WEEKLY BUTTON
========================= */

weeklyBtn.addEventListener("click",()=>{

if(typeof weeklyUsers !== "undefined"){

currentData = weeklyUsers;

render(currentData);

}

if(typeof weeklyUpdate !== "undefined"){

updateText.innerText =
weeklyUpdate;

}

setActive(weeklyBtn);

});

/* =========================
   ALL TIME BUTTON
========================= */

alltimeBtn.addEventListener("click",()=>{

if(typeof alltimeUsers !== "undefined"){

currentData = alltimeUsers;

render(currentData);

}

if(typeof alltimeUpdate !== "undefined"){

updateText.innerText =
alltimeUpdate;

}

setActive(alltimeBtn);

});