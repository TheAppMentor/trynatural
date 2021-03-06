var memoize = require("memoizee");
var _ = require("lodash");
var allLocations = require('./allLocations.js')

let allBanksArr = ["ABHYUDAYA COOPERATIVE BANK LTD",
"ABU DHABI COMMERCIAL BANK",
"ADITYA BIRLA IDEA PAYMENTS BANK",
"AHMEDABAD MERCANTILE COOPERATIVE BANK",
"AHMEDNAGAR MERCHANTS CO-OP BANK LTD",
"AIRTEL PAYMENTS BANK LTD",
"AKOLA JANATA COMMERCIAL COOPERATIVE BANK",
"ALLAHABAD BANK",
"ALMORA URBAN COOPERATIVE BANK LTD",
"AMBARNATH JAIHIND COOP BANK LTD",
"ANDHRA BANK",
"ANDHRA PRADESH GRAMEENA VIKAS BANK",
"ANDHRA PRAGATHI GRAMEENA BANK",
"APNA SAHAKARI BANK LTD",
"AU SMALL FINANCE BANK LTD",
"AUSTRALIA AND NEW ZEALAND BANKING GROUP LTD",
"AXIS BANK",
"BNP PARIBAS",
"BANDHAN BANK LTD",
"BANK OF AMERICA",
"BANK OF BAHARAIN AND KUWAIT BSC",
"BANK OF BARODA",
"BANK OF CEYLON",
"BANK OF INDIA",
"BANK OF MAHARASHTRA",
"BARCLAYS BANK",
"BASSEIN CATHOLIC COOPERATIVE BANK LTD",
"BHAGINI NIVEDITA SAHAKARI BANK LTD",
"BHARAT COOPERATIVE BANK MUMBAI LTD",
"CANARA BANK",
"CAPITAL SMALL FINANCE BANK LTD",
"CENTRAL BANK OF INDIA",
"CITI BANK",
"CITIZEN CREDIT COOPERATIVE BANK LTD",
"CITY UNION BANK LTD",
"CORPORATION BANK",
"CREDIT AGRICOLE CORPORATE AND INVESTMENT BANK CALYON BANK",
"CREDIT SUISEE AG",
"CSB BANK LTD",
"CTBC BANK CO LTD",
"DBS BANK INDIA LTD",
"DCB BANK LTD",
"DENA BANK",
"DEOGIRI NAGARI SAHAKARI BANK LTD",
"DEPOSIT INSURANCE AND CREDIT GUARANTEE CORPORATION",
"DEUSTCHE BANK",
"DEVELOPMENT BANK OF SINGAPORE",
"DHANALAKSHMI BANK",
"DMK JAOLI BANK",
"DOHA BANK QSC",
"DOMBIVLI NAGARI SAHAKARI BANK LTD",
"DURGAPUR STEEL PEOPLES CO-OPERATIVE BANK LTD",
"EMIRATES NBD BANK P J S C",
"EQUITAS SMALL FINANCE BANK LTD",
"ESAF SMALL FINANCE BANK LTD",
"EXPORT IMPORT BANK OF INDIA",
"FEDERAL BANK",
"FINCARE SMALL FINANCE BANK LTD",
"FINO PAYMENTS BANK",
"FIRST ABU DHABI BANK PJSC",
"FIRSTRAND BANK LTD",
"G P PARSIK BANK",
"GS MAHANAGAR CO-OPERATIVE BANK LTD",
"HARYANA STATE COOPERATIVE BANK",
"HDFC BANK",
"HIMACHAL PRADESH STATE COOPERATIVE BANK LTD",
"HSBC BANK",
"ICICI BANK LTD",
"IDBI BANK",
"IDFC FIRST BANK LTD",
"IDRBT",
"IDUKKI DISTRICT CO OPERATIVE BANK LTD",
"INDIA POST PAYMENT BANK",
"INDIAN BANK",
"INDIAN OVERSEAS BANK",
"INDUSIND BANK",
"INDUSTRIAL AND COMMERCIAL BANK OF CHINA LTD",
"INDUSTRIAL BANK OF KOREA",
"IRINJALAKUDA TOWN CO-OPERATIVE BANK LTD",
"JALGAON JANATA SAHAKARI BANK LTD",
"JAMMU AND KASHMIR BANK LTD",
"JANA SMALL FINANCE BANK LTD",
"JANAKALYAN SAHAKARI BANK LTD",
"JANASEVA SAHAKARI BANK LTD",
"JANATA SAHAKARI BANK LTD",
"JIO PAYMENTS BANK LTD",
"JP MORGAN BANK",
"KALLAPPANNA AWADE ICHALKARANJI JANATA SAHAKARI BANK LTD",
"KALUPUR COMMERCIAL COOPERATIVE BANK",
"KALYAN JANATA SAHAKARI BANK",
"KARNATAKA BANK LTD",
"KARNATAKA VIKAS GRAMEENA BANK",
"KARUR VYSYA BANK",
"KAVERI GRAMEENA BANK",
"KEB HANA BANK",
"KERALA GRAMIN BANK",
"KOTAK MAHINDRA BANK LTD",
"KOZHIKODE DISTRICT COOPERATIAVE BANK LTD",
"KRUNG THAI BANK PCL",
"LAXMI VILAS BANK",
"MAHARASHTRA GRAMIN BANK",
"MAHARASHTRA STATE COOPERATIVE BANK",
"MAHESH SAHAKARI BANK LTD",
"MASHREQBANK PSC",
"MIZUHO BANK LTD",
"MUFG BANK LTD",
"NAGAR URBAN CO OPERATIVE BANK",
"NAGPUR NAGARIK SAHAKARI BANK LTD",
"NATIONAL BANK FOR AGRICULTURE AND RURAL DEVELOPMENT",
"NAV JEEVAN CO OP BANK LTD",
"NEW INDIA COOPERATIVE BANK LTD",
"NKGSB COOPERATIVE BANK LTD",
"NORTH EAST SMALL FINANCE BANK LTD",
"NSDL PAYMENTS BANK LTD",
"NUTAN NAGARIK SAHAKARI BANK LTD",
"ORIENTAL BANK OF COMMERCE",
"PAYTM PAYMENTS BANK LTD",
"PRAGATHI KRISHNA GRAMIN BANK",
"PRIME COOPERATIVE BANK LTD",
"PT BANK MAYBANK INDONESIA TBK",
"PUNJAB AND MAHARSHTRA COOPERATIVE BANK",
"PUNJAB AND SIND BANK",
"PUNJAB NATIONAL BANK",
"QATAR NATIONAL BANK SAQ",
"RABOBANK INTERNATIONAL",
"RAJARAMBAPU SAHAKARI BANK LTD",
"RAJASTHAN MARUDHARA GRAMIN BANK",
"RAJGURUNAGAR SAHAKARI BANK LTD",
"RAJKOT NAGRIK SAHAKARI BANK LTD",
"RBL BANK LTD",
"RESERVE BANK OF INDIA",
"SAHEBRAO DESHMUKH COOPERATIVE BANK LTD",
"SAMARTH SAHAKARI BANK LTD",
"SANT SOPANKAKA SAHAKARI BANK LTD",
"SARASPUR NAGRIK CO OPERATIVE BANK LTD",
"SARASWAT COOPERATIVE BANK LTD",
"SBER BANK",
"SBM BANK INDIA LTD",
"SHIKSHAK SAHAKARI BANK LTD",
"SHINHAN BANK",
"SHIVALIK MERCANTILE CO OPERATIVE BANK LTD",
"SHRI CHHATRAPATI RAJASHRI SHAHU URBAN COOPERATIVE BANK LTD",
"SHRI VEERSHAIV CO OP BANK LTD",
"SIR M VISVESVARAYA CO OPERATIVE BANK LTD",
"SOCIETE GENERALE",
"SOLAPUR JANATA SAHAKARI BANK LTD",
"SOUTH INDIAN BANK",
"STANDARD CHARTERED BANK",
"STATE BANK OF INDIA",
"SUMITOMO MITSUI BANKING CORPORATION",
"SURAT NATIONAL COOPERATIVE BANK LTD",
"SURYODAY SMALL FINANCE BANK LTD",
"SUTEX COOPERATIVE BANK LTD",
"SYNDICATE BANK",
"TAMILNAD MERCANTILE BANK LTD",
"TELANGANA STATE COOP APEX BANK",
"TEXTILE TRADERS CO OPERATIVE BANK LTD",
"THE A.P. MAHESH COOPERATIVE URBAN BANK LTD",
"THE AKOLA DISTRICT CENTRAL COOPERATIVE BANK",
"THE ANDHRA PRADESH STATE COOPERATIVE BANK LTD",
"THE BANK OF NOVA SCOTIA",
"THE BARAMATI SAHAKARI BANK LTD",
"THE COSMOS CO OPERATIVE BANK LTD",
"THE DELHI STATE COOPERATIVE BANK LTD",
"THE GADCHIROLI DISTRICT CENTRAL COOPERATIVE BANK LTD",
"THE GREATER BOMBAY COOPERATIVE BANK LTD",
"THE GUJARAT STATE COOPERATIVE BANK LTD",
"THE HASTI COOP BANK LTD",
"THE JALGAON PEOPELS COOPERATIVE BANK LTD",
"THE KANGRA CENTRAL COOPERATIVE BANK LTD",
"THE KANGRA COOPERATIVE BANK LTD",
"THE KARAD URBAN COOPERATIVE BANK LTD",
"THE KARANATAKA STATE COOPERATIVE APEX BANK LTD",
"THE KERALA STATE CO OPERATIVE BANK LTD",
"THE KURMANCHAL NAGAR SAHAKARI BANK LTD",
"THE MALKAPUR URBAN CO OPERATIVE BANK LTD",
"THE MEHSANA URBAN COOPERATIVE BANK",
"THE MUMBAI DISTRICT CENTRAL COOPERATIVE BANK LTD",
"THE MUNICIPAL COOPERATIVE BANK LTD",
"THE MUSLIM CO-OPERATIVE BANK LTD",
"THE NAINITAL BANK LTD",
"THE NASIK MERCHANTS COOPERATIVE BANK LTD",
"THE NAVNIRMAN CO-OPERATIVE BANK LTD",
"THE NILAMBUR CO OPERATIVE URBAN BANK LTD",
"THE PANDHARPUR URBAN CO OP BANK LTD",
"THE RAJASTHAN STATE COOPERATIVE BANK LTD",
"THE SEVA VIKAS COOPERATIVE BANK LTD",
"THE SHAMRAO VITHAL COOPERATIVE BANK",
"THE SINDHUDURG DISTRICT CENTRAL COOP BANK LTD",
"THE SURAT DISTRICT COOPERATIVE BANK LTD",
"THE SURATH PEOPLES COOPERATIVE BANK LTD",
"THE TAMIL NADU STATE APEX COOPERATIVE BANK",
"THE THANE BHARAT SAHAKARI BANK LTD",
"THE THANE DISTRICT CENTRAL COOPERATIVE BANK LTD",
"THE URBAN CO OPERATIVE BANK LTD",
"THE VARACHHA COOPERATIVE BANK LTD",
"THE VIJAY CO OPERATIVE BANK LTD",
"THE VISHWESHWAR SAHAKARI BANK LTD",
"THE WEST BENGAL STATE COOPERATIVE BANK",
"THE ZOROASTRIAN COOPERATIVE BANK LTD",
"THRISSUR DISTRICT CO-OPERATIVE BANK LTD",
"TJSB SAHAKARI BANK LTD",
"TUMKUR GRAIN MERCHANTS COOPERATIVE BANK LTD",
"UCO BANK",
"UJJIVAN SMALL FINANCE BANK LTD",
"UNION BANK OF INDIA",
"UNITED BANK OF INDIA",
"UNITED OVERSEAS BANK LTD",
"UTKARSH SMALL FINANCE BANK",
"VASAI JANATA SAHAKARI BANK LTD",
"VASAI VIKAS SAHAKARI BANK LTD",
"VIJAYA BANK",
"WESTPAC BANKING CORPORATION",
"WOORI BANK",
"YES BANK",
"ZILA SAHAKRI BANK LTD"]

export let locationListArr = [
    ["BANGALORE (BENGALURU)","BANGALORE","KARNATAKA"], 
    ["CHENNAI" ,"CHENNAI","TAMIL NADU"] 
];

//export let locationsObjArr = _.map(locationListArr, (eachLocation) => { 
export let locationsObjArr = _.map(allLocations.allLocations, (eachLocation) => { 
    
    let tempObj = { 
        city: eachLocation[0],
        district: eachLocation[1],
        state: eachLocation[2] 
    }
    return tempObj
})

