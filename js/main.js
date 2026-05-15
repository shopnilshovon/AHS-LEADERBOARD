const list = document.getElementById("list");
const buttons = document.querySelectorAll(".switchBtn");
const updateTime = document.getElementById("updateTime");

let currentUsers = dailyUsers;

function loadLeaderboard(type){

if(type === "daily"){
currentUsers = dailyUsers;
updateTime.innerText = updateInfo.daily;
}

if(type === "weekly"){
currentUsers = weeklyUsers;
updateTime.innerText = updateInfo.weekly;
}

if(type === "alltime"){
currentUsers = alltimeUsers;
updateTime.innerText = updateInfo.alltime;
}

render(currentUsers);

}

buttons.forEach(btn=>{

btn.onclick = ()=>{

buttons.forEach(x=>x.classList.remove("active"));

btn.classList.add("active");

loadLeaderboard(btn.dataset.type);

};

});

function updateStats(data){

document.getElementById("userCount").innerText =
data.length;

document.getElementById("totalSms").innerText =
data.reduce((a,b)=>a+b.sms,0);

document.getElementById("totalEarn").innerText =
"$"+
data.reduce((a,b)=>
a+calculateEarning(b.name,b.earning),0
).toFixed(2);

}

function render(data){

list.innerHTML = "";

updateStats(data);

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

const maxSms = Math.max(...data.map(x=>x.sms));

const sorted = [...data].sort((a,b)=>b.sms-a.sms);

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
Bangladesh
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

render(dailyUsers);

updateTime.innerText = updateInfo.daily;

document
.getElementById("search")
.addEventListener("input",e=>{

const value =
e.target.value.toLowerCase();

const filtered =
currentUsers.filter(x=>
x.name.toLowerCase().includes(value)
);

render(filtered);

});