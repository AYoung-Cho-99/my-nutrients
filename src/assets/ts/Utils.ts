export const getDomain = () => {
  if (!process.env.NEXT_PUBLIC_DOMAIN) return "https://marmy.hackers.com";

  return process.env.NEXT_PUBLIC_DOMAIN;
};

export const checkMobile = (userAgent: string) => {
  const ua = userAgent.toLowerCase(); //userAgent 값 얻기
  if (ua) {
    if (ua.indexOf("android") > -1) {
      //안드로이드
      return "android";
    } else if (
      ua.indexOf("iphone") > -1 ||
      ua.indexOf("ipad") > -1 ||
      ua.indexOf("ipod") > -1
    ) {
      //IOS
      return "ios";
    } else {
      //아이폰, 안드로이드 외
      return "other";
    }
  }
};

export const strMaps = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  yearSuffix: "년",
  level: ["관리자", "고객"],
  shortname: [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ],
  fullname: [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ],
  areacode: [
    "11",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "36",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "50",
  ],
  paymethod: {
    SC0040: "무통장",
    Free: "무료",
    Card: "신용카드(안심클릭)",
    VCard: "신용카드(ISP)",
    VBank: "무통장입금(가상계좌)",
    DirectBank: "실시간계좌이체",
  },
  removeTag: {
    htmlTag: ["script", "object", "embed"],
  },
};

// 쿠키생성
export const setCookie = function (
  cName: string,
  cValue: string,
  cDay: number,
) {
  let expire = new Date();
  expire.setDate(expire.getDate() + cDay);
  let cookies = cName + "=" + encodeURIComponent(cValue) + "; path=/ "; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
  if (typeof cDay != "undefined")
    cookies += ";expires=" + expire.toUTCString() + ";";
  document.cookie = cookies;
};

// 쿠키 가져오기
export const getCookie = function (cName: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        cName?.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = function (cName: string) {
  setCookie(cName, "", -1);
};

export const numberToKorean = function (number: number) {
  // console.log(number);
  let inputNumber = number < 0 ? 0 : number;
  let unitWords = ["", "만", "억", "조", "경"];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = "";

  for (let i = 0; i < splitCount; i++) {
    let unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
};

export const _zeroFill = function (number: any, width: number) {
  if (number == undefined || number == null) return null;
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + ""; // always return a string
};

export const nullTostring = function (data: any, str: string) {
  // str = str || '';
  if (data == null || isNaN(data)) {
    return str;
  } else {
    return data;
  }
};

export const isEmpty = function (value: any) {
  // 넘어온 값이 빈값인지 체크합니다.
  // !value 하면 생기는 논리적 오류를 제거하기 위해
  // 명시적으로 value == 사용
  // [], {} 도 빈값으로 처리
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const isValidNumber = function (v: number, min: number, max: number) {
  // Check if a valid number is entered
  return v >= min && v <= max ? true : false;
};

// 3자리마다 콤마 찍기
export const numberWithCommas = function (x: number) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const korLength = function (obj: string) {
  let totalByte = 0;
  let oneChar = "";
  for (let i = 0; i < obj.length; i++) {
    oneChar = obj.charAt(i);
    if (escape(oneChar).length > 4) {
      totalByte += 2;
    } else {
      totalByte++;
    }
  }
  return totalByte;
};

export const formatMonthDate = function (a: any, pdivchar: string) {
  let date = a instanceof Date ? a : new Date(a.replace(/-/g, "/"));
  let divchar = pdivchar || "-";
  let week = strMaps["dayNamesShort"][date.getDay()];

  return (
    _zeroFill((date.getMonth() + 1).toString(), 2) +
    divchar +
    _zeroFill(date.getDate().toString(), 2) +
    "(" +
    week +
    ")"
  );
};

export const compareDate = function (a: string, b: string) {
  let endDate = new Date(a);
  let nowDate;
  if (b) {
    nowDate = new Date(b);
  } else {
    nowDate = new Date(currentDate());
  }

  return nowDate > endDate;
};

export const currentDate = function () {
  let now = new Date();
  let year = now.getFullYear();
  let mon =
    now.getMonth() + 1 > 9
      ? "" + (now.getMonth() + 1)
      : "0" + (now.getMonth() + 1);
  let day = now.getDate() > 9 ? "" + now.getDate() : "0" + now.getDate();

  return year + "-" + mon + "-" + day;
};

export const currentTime = function () {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  return hours + ":" + minutes;
};

export const createDate = function (d: any) {
  return d instanceof Date ? d : new Date(d.replace(/-/g, "/"));
};

export const addHours = function (date: Date, h: number) {
  date.setHours(date.getHours() + h);
  return date;
};

export const addMinutes = function (date: Date, m: number) {
  date.setMinutes(date.getMinutes() + m);
  return date;
};

export const dayDiffInStr = function (a: any, b: any) {
  let newa = a instanceof Date ? new Date(a) : new Date(a.replace(/-/g, "/"));
  let newb = b instanceof Date ? new Date(b) : new Date(b.replace(/-/g, "/"));
  return newa.setHours(0, 0, 0, 0) - newb.setHours(0, 0, 0, 0) ? false : true;
};

export const diffDate = (d1: any, d2: any) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();
  return Math.ceil(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
};

export const diffTime = function (a: any, b: any, t: string) {
  let date1 = a instanceof Date ? a : new Date(a.replace(/-/g, "/"));
  let date2 = b instanceof Date ? b : new Date(b.replace(/-/g, "/"));

  if (date2 < date1) {
    date2.setDate(date2.getDate() + 1);
  }
  let diff = date2.getTime() - date1.getTime();
  switch (t) {
    case "h":
      return Math.ceil(diff / 1000 / 60 / 60);
      break;
    case "m":
      return Math.ceil(diff / 1000 / 60);
      break;
    case "s":
      return Math.ceil(diff / 1000);
      break;
  }
};

export const diffmonth = function (date1: Date, date2: Date) {
  let months =
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    date2.getMonth() -
    date1.getMonth();
  let smonth = date1.getMonth() + 1;
  let emonth = date2.getMonth() + 1;
  return {
    smonth: smonth,
    emonth: emonth,
    tmonth: months,
  };
};

export const formatDateTime = function (date: any) {
  const TIME_ZONE = 3240 * 10000;
  let newDate = date instanceof Date ? date : new Date(date);
  return new Date(+date + TIME_ZONE)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
};

export const formatDate = function (a: any, pdivchar?: string) {
  let date = a instanceof Date ? a : new Date(a?.replace(/-/g, "/"));
  let divchar = pdivchar || "-";
  return (
    date.getFullYear() +
    divchar +
    _zeroFill((date.getMonth() + 1).toString(), 2) +
    divchar +
    _zeroFill(date.getDate().toString(), 2)
  );
};

export const dateformatMin = function (date: any) {
  let cdate = date instanceof Date ? date : new Date(date.replace(/-/g, "/"));
  return (
    cdate.getFullYear() +
    "-" +
    _zeroFill((cdate.getMonth() + 1).toString(), 2) +
    "-" +
    _zeroFill(cdate.getDate().toString(), 2) +
    " " +
    _zeroFill(cdate.getHours().toString(), 2) +
    ":" +
    _zeroFill(cdate.getMinutes().toString(), 2)
  );
};

export const dateformatKorDate = function (date: string) {
  let cdate =
    typeof date == "string" ? new Date(date.replace(/-/g, "/")) : date;
  return (
    cdate.getFullYear() +
    "-" +
    _zeroFill((cdate.getMonth() + 1).toString(), 2) +
    "-" +
    _zeroFill(cdate.getDate().toString(), 2)
  );
};

export const dateformatKorDateStr = function (date: string) {
  let cdate =
    typeof date == "string" ? new Date(date.replace(/-/g, "/")) : date;
  return (
    cdate.getFullYear() +
    "년 " +
    _zeroFill(String(cdate.getMonth() + 1), 2) +
    "월 " +
    _zeroFill(cdate.getDate().toString(), 2) +
    "일"
  );
};

export const getWeek = function (cdate: Date, start: number) {
  start = start || 0;
  let today = new Date(cdate.setHours(0, 0, 0, 0));
  let day = today.getDay() - start;
  let date = today.getDate() - day;
  // Grabbing Start/End Dates

  let StartDate = new Date(today.setDate(date));
  let EndDate = new Date(today.setDate(today.getDate() + 6));
  return [StartDate, EndDate];
};

export const weekCount = function (year: number, month_number: number) {
  // month_number is in the range 1..12

  let firstOfMonth = new Date(year, month_number - 1, 1);
  let lastOfMonth = new Date(year, month_number, 0);

  let used = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(used / 7);
};

// export const addDays = function(date,days) {
// 	let cdate = typeof(date) == "string" ? new Date(date.replace(/-/g, "/")) : new Date(date.toString());
// 	cdate.setDate(cdate.getDate() + days);
// 	return cdate;
// };

export const addDays = function (date: any, days: any) {
  let result = new Date(date);
  result.setDate(result.getDate() + parseInt(days, 10));
  return result;
};

//해당하는 날짜가 그 기간안에 있는지
//s: 시작날짜. e:끝 날짜, n:현재 날짜, b: 시작이전(분), p: 추가 시간(분)
export const isInDate = function (
  s: any,
  e: any,
  n: any,
  b: number,
  p: number,
) {
  s =
    typeof s == "string"
      ? new Date(s.replace(/-/g, "/")).setHours(0, 0, 0, 0)
      : s.setHours(0, 0, 0, 0);
  e =
    typeof e == "string"
      ? new Date(e.replace(/-/g, "/")).setHours(23, 59, 59, 0)
      : e.setHours(23, 59, 59, 0);
  n =
    typeof n == "string"
      ? new Date(n.replace(/-/g, "/")).getTime()
      : n.getTime();
  b = typeof b != "number" ? parseInt(b) * 60000 : b * 60000;
  p = typeof p != "number" ? parseInt(p) * 60000 : p * 60000;

  return n > s - b && n < e + p;
};

export const toHHMMSS = function (sec: number) {
  let sec_num = sec;
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  let time = hours + "시간 " + minutes + "분 " + seconds + "초";
  if (hours < 1) {
    time = _zeroFill(minutes.toString(), 1) + "분";
  } else {
    time =
      _zeroFill(hours.toString(), 1) +
      "시간 " +
      _zeroFill(minutes.toString(), 0) +
      "분";
  }
  return time;
};

export const percentageToInteger = (count: number, total: number) => {
  if (!total || total === 0 || !count) return "0";
  return Math.round((count / total) * 100);
};

export const isTelHyphen = function (v: string) {
  return v.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

export const onlyInputNumber = (k: string) => {
  return k.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

// export const checkRequired = function (e : any) {

// };
