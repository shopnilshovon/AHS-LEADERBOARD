function calculateEarning(name, earning){

const upper = name.toUpperCase();

// Special Users
const specialRates = {
"KataKana": 0.95, // 5% কাটবে
"Nakamora": 0.95,  // 5% কাটবে
"UA_Akaza": 0.95      // কোন কাটবে না
};

if(specialRates[upper]){
return earning * specialRates[upper];
}

// Normal Rules
if(
upper.startsWith("SM") ||
upper.startsWith("AHS")
){
return earning * 0.80; // 20% কাটবে
}

if(
upper.startsWith("TT") ||
upper.startsWith("TLT") ||
upper.startsWith("AH_")
){
return earning * 0.80;
}

return earning;
}