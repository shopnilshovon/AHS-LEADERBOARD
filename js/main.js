const list = document.getElementById("list");

users.sort((a,b)=>b.sms-a.sms);

document.getElementById("userCount").innerText =
users.length;

document.getElementById("totalSms").innerText =
users.reduce((a,b)=>a+b.sms,0);

document.getElementById("totalEarn").innerText =
"$" +
users.reduce((a,b)=>
a + calculateEarning(b.name,b.earning),0
).toFixed(2);

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

const maxSms = Math.max(...data.map(x=>x.sms));

data.forEach((u,index)=>{

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

render(users);

document
.getElementById("search")
.addEventListener("input",e=>{

const value =
e.target.value.toLowerCase();

const filtered =
users.filter(x=>
x.name.toLowerCase().includes(value)
);

render(filtered);

});