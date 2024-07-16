const tableData2 = {
    rows: [
        ["Europe & New Zealand", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "15047.47", "16564.21", "14579.32"],
        ["Europe & New Zealand", "Share of residential space heating", "$E_{RSH}$", "$\%$", "62.3%", "61.6%", "57.2%"],
        ["Europe & New Zealand", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "1.9%", "1.9%", "2.0%"],
        ["Europe & New Zealand", "Share of other end uses", "$E_{RA}$", "$\%$", "35.8%", "36.4%", "40.8%"],
        ["South America (Brazil, Colombia, Argentina, Chile, Uruguay)", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "1668.4", "2001.8", "2326.2"],
        ["South America (Brazil, Colombia, Argentina, Chile, Uruguay)", "Share of residential space heating", "$E_{RSH}$", "$\%$", "13.4%", "14.7%", "14.9%"],
        ["South America (Brazil, Colombia, Argentina, Chile, Uruguay)", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "5.5%", "7.5%", "9.7%"],
        ["South America (Brazil, Colombia, Argentina, Chile, Uruguay)", "Share of other end uses", "$E_{RA}$", "$\%$", "81.2%", "77.9%", "75.3%"],
        ["China", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "5157.2", "11614.6", "19192.9"],
        ["China", "Share of residential space heating", "$E_{RSH}$", "$\%$", "50.4%", "50.4%", "44.3%"],
        ["China", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "4.8%", "4.8%", "9.9%"],
        ["China", "Share of other end uses", "$E_{RA}$", "$\%$", "44.8%", "44.8%", "45.8%"],
        ["India", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "1142.2", "1672.9", "2598"],
        ["India", "Share of residential space heating", "$E_{RSH}$", "$\%$", "0.0%", "0.0%", "0.0%"],
        ["India", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "9.0%", "14.6%", "22.0%"],
        ["India", "Share of other end uses", "$E_{RA}$", "$\%$", "91.0%", "85.4%", "78.0%"],
        ["Northeast Asia (Japan, Korea)", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "2766.1", "2982.9", "2829.8"],
        ["Northeast Asia (Japan, Korea)", "Share of residential space heating", "$E_{RSH}$", "$\%$", "34.8%", "35.9%", "33.6%"],
        ["Northeast Asia (Japan, Korea)", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "2.3%", "2.7%", "2.2%"],
        ["Northeast Asia (Japan, Korea)", "Share of other end uses", "$E_{RA}$", "$\%$", "62.9%", "61.3%", "64.2%"],
        ["Africa (South Africa, Morocco)", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "569.5", "574.2", "681.7"],
        ["Africa (South Africa, Morocco)", "Share of residential space heating", "$E_{RSH}$", "$\%$", "14.8%", "13.6%", "12.8%"],
        ["Africa (South Africa, Morocco)", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "13.1%", "12.7%", "12.5%"],
        ["Africa (South Africa, Morocco)", "Share of other end uses", "$E_{RA}$", "$\%$", "72.1%", "73.8%", "74.6%"],
        ["North America", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "12250.9", "12894.7", "12941.2"],
        ["North America", "Share of residential space heating", "$E_{RSH}$", "$\%$", "56.4%", "48.8%", "46.9%"],
        ["North America", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "4.3%", "6.3%", "7.3%"],
        ["North America", "Share of other end uses", "$E_{RA}$", "$\%$", "39.3%", "44.8%", "45.8%"],
        ["Australia", "Energy consumption", "$E$", "Peta joule $(\text{PJ})$", "378.4", "428.8", "455.2"],
        ["Australia", "Share of residential space heating", "$E_{RSH}$", "$\%$", "44.2%", "37.2%", "35.7%"],
        ["Australia", "Share of residential space cooling", "$E_{RSC}$", "$\%$", "2.7%", "4.2%", "4.7%"],
        ["Australia", "Share of other end uses", "$E_{RA}$", "$\%$", "53.1%", "58.5%", "59.5%"],
    ],
    headers: [
        { title: "Regions" },
        { title: "Name" },
        { title: "Abbreviations" },
        { title: "Unit" },
        { title: "2000" },
        { title: "2010" },
        { title: "2020" }
    ]
};

function getData2() {
    return tableData2;
}
