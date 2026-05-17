function calculateEarning(name,earning){

const upper=name.toUpperCase();

if(
upper.startsWith("SM_") ||
upper.startsWith("TT") ||
upper.startsWith("TT_") ||
upper.startsWith("AH_")
){
return earning*0.80;
}

if(
upper.startsWith("AHS") ||
upper.startsWith("AHS_")
){
return earning*0.85;
}

return earning;

}
