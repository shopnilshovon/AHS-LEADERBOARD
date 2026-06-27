function calculateEarning(name, earning){

const upper = name.toUpperCase();

// Special Users
const specialRates = {
"KATAKANA": 0.95,  // 5% কাটবে
"NAKAMORA": 0.95,  // 5% কাটবে
"UA_AKAZA": 0.95   // 5% কাটবে
};

if (specialRates.hasOwnProperty(upper)) {
    return earning * specialRates[upper];
}

// NSA_ & K_ = 2% কাটবে
if (
    upper.startsWith("NSA_") ||
    upper.startsWith("K_")
){
    return earning * 0.98;
}

if (
    upper.startsWith("TMT_") ||
    upper.startsWith("TMT")
){
    return earning * 0.25;
}

// UA_ & AHS_ = 20% কাটবে
if (
    upper.startsWith("UA_") ||
    upper.startsWith("AHS_")
){
    return earning * 0.80;
}

return earning;
}