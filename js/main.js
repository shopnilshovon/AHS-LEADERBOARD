const list = document.getElementById("list");

const dailyBtn = document.getElementById("dailyBtn");
const weeklyBtn = document.getElementById("weeklyBtn");
const alltimeBtn = document.getElementById("alltimeBtn");

const userCount = document.getElementById("userCount");
const totalSms = document.getElementById("totalSms");
const totalEarn = document.getElementById("totalEarn");

const updateText = document.getElementById("updateText");

let currentData = users;

/* UPDATE TIME */

if(typeof dailyUpdate !== "undefined"){
updateText.innerText = dailyUpdate;
}

/* SORT */

function sortData(data){
return [...data].sort((a,b)=>b.sms-a.sms);
}

/* TOP INFO */

function updateStats(data){

userCount.innerText = data.length;

totalSms.innerText =
data.reduce((a,b)=>a+b.sms,0);

totalEarn.innerText =
"$" +
data.reduce((a,b)=>
a + calculateEarning(b.name,b.earning)
,0).toFixed(2);

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

return;
}

const sorted = sortData(data);

const maxSms =
Math.max(...sorted.map(x=>x.sms));

sorted.forEach((u,index)=>{

const earn =
calculateEarning(u.name,u.earning);

const percent =
(u.sms / maxSms) * 100;

const card = document.createElement("div");

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

updateStats(sorted);

}

render(currentData);

/* SEARCH */

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

/* BUTTONS */

function setActive(btn){

[dailyBtn,weeklyBtn,alltimeBtn]
.forEach(x=>x.classList.remove("active"));

btn.classList.add("active");

}

/* DAILY */

dailyBtn.addEventListener("click",()=>{

currentData = users;

render(currentData);

if(typeof dailyUpdate !== "undefined"){
updateText.innerText = dailyUpdate;
}

setActive(dailyBtn);

});

/* WEEKLY */

weeklyBtn.addEventListener("click",()=>{

if(typeof weeklyUsers !== "undefined"){

currentData = weeklyUsers;

render(currentData);

}

if(typeof weeklyUpdate !== "undefined"){
updateText.innerText = weeklyUpdate;
}

setActive(weeklyBtn);

});

/* ALL TIME */

alltimeBtn.addEventListener("click",()=>{

if(typeof allTimeUsers !== "undefined"){

currentData = allTimeUsers;

render(currentData);

}

if(typeof allTimeUpdate !== "undefined"){
updateText.innerText = allTimeUpdate;
}

setActive(alltimeBtn);

});