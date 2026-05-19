function calculateEarning(name,earning){

const upper=name.toUpperCase();

if(
upper.startsWith("SM_") ||
upper.startsWith("SM")
){
return earning*0.80;
}

if(
upper.startsWith("AHS") ||
upper.startsWith("AHS_")
){
return earning*0.85;
}

if(
upper.startsWith("TT") ||
upper.startsWith("AH_")
){
return earning*0.75;
}


if(
upper.startsWith("TLT") ||
upper.startsWith("TLT_")
){
return earning*0.77;
}

if(
upper.startsWith("TOUFIQ") ||
upper.startsWith("SHOVON")
){
return earning*0.95;
}

return earning;

}
