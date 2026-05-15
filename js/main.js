const list = document.getElementById("list");

/* UPDATE TIME */

const latestUpdate =
"15 May 2026 • 5:18 PM";

/* LEADERBOARD DATA */

const leaderboardData = {

daily: users,

weekly: users,

alltime: users

};

let currentMode = "daily";

/* BUTTONS */

const dailyBtn =
document.getElementById("dailyBtn");

const weeklyBtn =
document.getElementById("weeklyBtn");

const alltimeBtn =
document.getElementById("alltimeBtn");

/* RENDER FUNCTION */

function render(data){

list.innerHTML = "";

if(data.length === 0){

list.innerHTML = `

<div class="notfound">

<h2>
❌ User Not Found
</h2>

<p>
No leaderboard user available.
</p>

</div>

`;

return;

}

/* SORT */

data.sort((a,b)=>b.sms-a.sms);

/* TOP INFO */

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

/* CARD LOOP */

data.forEach((u,index)=>{

const earn =
calculateEarning(u.name,u.earning);

const percent =
(u.sms / maxSms) * 100;

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

/* BUTTON ACTIVE */

function setActive(btn){

dailyBtn.classList.remove("active");
weeklyBtn.classList.remove("active");
alltimeBtn.classList.remove("active");

btn.classList.add("active");

}

/* DAILY */

dailyBtn.addEventListener("click",()=>{

currentMode = "daily";

setActive(dailyBtn);

render(leaderboardData.daily);

});

/* WEEKLY */

weeklyBtn.addEventListener("click",()=>{

currentMode = "weekly";

setActive(weeklyBtn);

render(leaderboardData.weekly);

});

/* ALL TIME */

alltimeBtn.addEventListener("click",()=>{

currentMode = "alltime";

setActive(alltimeBtn);

render(leaderboardData.alltime);

});

/* FIRST LOAD */

render(leaderboardData.daily);

/* SEARCH */

document
.getElementById("search")
.addEventListener("input",e=>{

const value =
e.target.value.toLowerCase();

const filtered =
leaderboardData[currentMode]
.filter(x=>
x.name.toLowerCase().includes(value)
);

render(filtered);

});