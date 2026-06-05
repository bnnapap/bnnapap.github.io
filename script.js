(function() {
    const lunarInfo = {
        2024: { leap: 0, days: [30,29,30,29,29,30,29,30,29,30,30,30] },
        2025: { leap: 0, days: [29,30,29,29,30,29,30,29,30,30,29,30] },
        2026: { leap: 0, days: [29,30,29,29,30,29,30,29,30,30,30,30] },
        2027: { leap: 0, days: [30,30,29,29,30,29,30,29,30,30,29,30] },
        2028: { leap: 0, days: [30,29,30,29,29,30,29,30,29,30,30,30] },
        2029: { leap: 0, days: [30,29,30,30,29,30,29,30,29,30,29,30] },
        2030: { leap: 0, days: [30,29,30,29,30,29,30,29,30,29,30,30] }
    };
    const chunjie = {
        2024: { month: 1, day: 10 },
        2025: { month: 0, day: 29 },
        2026: { month: 1, day: 17 },
        2027: { month: 1, day: 6 },
        2028: { month: 0, day: 26 },
        2029: { month: 1, day: 13 },
        2030: { month: 1, day: 3 }
    };
    const monthNames = ["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","腊月"];
    const dayNames = ["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十",
                     "十一","十二","十三","十四","十五","十六","十七","十八","十九","二十",
                     "廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];

    window.getRealLunar = function() {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        let spring = chunjie[year];
        if (!spring) spring = { month: 1, day: 17 };
        let baseDate = new Date(year, spring.month, spring.day);
        let curDate = new Date(year, month, day);
        let diff = Math.floor((curDate - baseDate) / (1000 * 60 * 60 * 24));
        diff = diff - 1;
        if (diff < 0) {
            year--;
            spring = chunjie[year];
            if (!spring) spring = { month: 1, day: 17 };
            baseDate = new Date(year, spring.month, spring.day);
            diff = Math.floor((curDate - baseDate) / (1000 * 60 * 60 * 24)) - 1;
        }
        let info = lunarInfo[year] || lunarInfo[2026];
        let daysInMonth = info.days;
        let monthIdx = 0;
        let dayIdx = diff;
        if (dayIdx < 0) dayIdx = 0;
        while (dayIdx >= daysInMonth[monthIdx]) {
            dayIdx -= daysInMonth[monthIdx];
            monthIdx++;
            if (monthIdx >= daysInMonth.length) {
                monthIdx = 0;
                break;
            }
        }
        return {
            month: monthNames[monthIdx],
            day: dayNames[dayIdx]
        };
    };
})();

function getYearGanZhi(year) {
    const gans = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
    const zhis = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
    const ganIndex = (year - 4) % 10;
    const zhiIndex = (year - 4) % 12;
    return gans[ganIndex] + zhis[zhiIndex];
}

function getMonthGanZhi(year, month) {
    const gan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
    const zhi = ["寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑"];
    const yearGan = (year - 4) % 10;
    let firstMonthGan;
    if (yearGan === 0 || yearGan === 5) firstMonthGan = 2;
    else if (yearGan === 1 || yearGan === 6) firstMonthGan = 4;
    else if (yearGan === 2 || yearGan === 7) firstMonthGan = 6;
    else if (yearGan === 3 || yearGan === 8) firstMonthGan = 8;
    else firstMonthGan = 0;
    const monthZhiIndex = (month + 2) % 12;
    const monthGanIndex = (firstMonthGan + month) % 10;
    return gan[monthGanIndex] + zhi[monthZhiIndex];
}

function getDayGanZhi(year, month, day) {
    let y = year;
    let m = month + 1;
    let d = day;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    let a = Math.floor(y / 100);
    let b = Math.floor(a / 4);
    let c = 2 - a + b;
    let e = Math.floor(365.25 * (y + 4716));
    let f = Math.floor(30.6001 * (m + 1));
    let jd = c + d + e + f - 1524.5;
    let jdInt = Math.floor(jd + 0.5);
    let gzIndex = (jdInt + 49) % 60;
    const gan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
    const zhi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
    return gan[gzIndex % 10] + zhi[gzIndex % 12];
}

function getShengxiao(year) {
    const zodiac = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
    return zodiac[(year - 4) % 12];
}

function getCurrentTime2hIndex(hour) {
    if (hour >= 23 || hour < 1) return 0;
    if (hour >= 1 && hour < 3) return 1;
    if (hour >= 3 && hour < 5) return 2;
    if (hour >= 5 && hour < 7) return 3;
    if (hour >= 7 && hour < 9) return 4;
    if (hour >= 9 && hour < 11) return 5;
    if (hour >= 11 && hour < 13) return 6;
    if (hour >= 13 && hour < 15) return 7;
    if (hour >= 15 && hour < 17) return 8;
    if (hour >= 17 && hour < 19) return 9;
    if (hour >= 19 && hour < 21) return 10;
    return 11;
}

// 动态生成秒、分、时、时辰、节气、星期、日期的旋转规则，半径宽度
(function generateRingStyles() {
    const style = document.createElement('style');
    let css = '';
    for (let i = 0; i < 60; i++) { let angle = i * 6; css += `#second .ring-inner ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(455px); }\n`; }
    for (let i = 0; i < 60; i++) { let angle = i * 6; css += `#minute .ring-inner ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(417px); }\n`; }
    for (let i = 0; i < 12; i++) { let angle = i * 30; css += `#hour .ring-inner ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(345px); }\n`; }
    for (let i = 0; i < 12; i++) { let angle = i * 30; css += `#time2h .ring-inner ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(382px); }\n`; }
    for (let i = 0; i < 24; i++) { let angle = (i * 15) - 112.5; css += `#solar ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(254px); }\n`; }
    for (let i = 0; i < 7; i++) { let angle = i * (360 / 7); css += `#week ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(199px); }\n`; }
    for (let i = 0; i < 31; i++) { let angle = i * (360 / 31); css += `#data ul li:nth-child(${i+1}) { transform: rotate(${angle}deg) translateX(140px); }\n`; }
    style.textContent = css;
    document.head.appendChild(style);
})();

new Vue({
    el: '#sum',
    data: {
        flag: [], flag_minute: [], flag_hour: [], flag_mouth: [], flag_solar: [], flag_data: [], flag_week: [], flag_AP: [], flag_time2h: [],
        yearName: '天祈',
        currentSecond: 0, currentMinute: 0, currentHour: 0,
        currentDay: 1, currentMonth: 0, currentYear: 2025, currentAP: 0, currentTime2hIndex: 0,
        highlightSecond: 0,
        currentSolarIndex: 0,
        rafId: null,
        timer: null,
        weekNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        time2hNames: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
        solarTerms: ['立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至','小寒','大寒'],
        solarDesc: [
            '立春·万物起始，阳气初生。立春标志着春季的开始，气温回升，万物复苏。',
            '雨水节气标示着降雨开始，雨量渐增。雨水和谷雨、小满、小雪、大雪等节气一样，都是反映降水现象的节气，是古代农耕文化对于节令的反映。进入雨水节气，我国北方阴寒未尽，一些地方仍下雪，尚未入春，仍是很冷；南方大多数地方则是春意盎然，一幅早春的景象。',
            '惊蛰的意思是天气回暖，春雷始鸣，惊醒蛰伏于地下冬眠的昆虫。“惊蛰”标志着仲春卯月的开始。作为全年气温回升最快的节气，我国北方大部分地区平均气温已升至0℃以上。南方沿江江南地区为8℃以上，而西南和华南已达10至15℃以上，早已是一派融融春光了，日照时数也有了明显的增加。',
            '春分时，太阳直射点在赤道上，此后太阳直射点继续北移，故春分也称“升分”。古时又称为“日中”、“日夜分”、“仲春之月”。南北半球昼夜平分，这天以后太阳直射位置继续由赤道向北半球推移，北半球开始昼长夜短。春分的意义，一是指一天时间白天黑夜平分，各为12小时；二是古时以立春至立夏为春季，春分正当春季三个月之中，平分了春季。',
            '“清明”的含义是气候暖和，草木萌动，杏桃开花，处处给人以清新明朗、欣欣向荣的感觉。此时气候清爽温暖，万物“吐故纳新”，草木始发新枝芽，万物开始生长，大地呈现春和景明之象。',
            '谷雨，是春季最后一个节气，顾名思义也就是播谷降雨的意思。在谷雨时节雨水会增多，大大有利于谷类农作物的生长。由于雨谷雨，这时田中的秧苗初插、作物新种，最需要雨水的滋润，所以说“春雨贵如油”。',
            '立夏是夏季的第一个节气，表示盛夏时节的正式开始。万物至此皆长大，故名立夏也。从此进入夏天，万物生长旺盛。习惯上把立夏当作是气温显著升高，炎暑将临，雷雨增多，农作物进入旺季生长的一个最重要节气。',
            '“小满”节气，天气渐渐由暖变热，并且降水也会逐渐增多，小满节气意味着进入了大幅降水的雨季，雨水开始增多，往往会出现持续大范围的强降水。进入小满节气后，我国南方地区一般会降雨多、雨量大；北方，小满节气期间降雨很少，气温上升很快，与南方的温差进一步缩小。',
            '芒种，谐音“忙种”，芒种的“种”字，是指谷黍类作物播种的节令。“芒种”到来预示着农民开始了忙碌的田间生活。气候特点：雨量充沛，气温显著升高。农事：作物栽培。',
            '夏至这天，太阳直射地面的位置到达一年的最北端，几乎直射北回归线，此时，北半球各地的白昼时间达到全年最长。夏至是太阳的转折点，这天过后它将走“回头路”，阳光直射点开始从北回归线向南移动，北半球白昼将会逐日减短。同时，夏至到来后，夜空星象也逐渐变成夏季星空。',
            '小暑，是夏季的第五个节气，表示盛夏正式开始。暑，表示炎热的意思，小暑为小热，还不十分热。意指天气开始炎热，但还没到最热。此时，已是初伏前后。各地也进入雷暴最多的季节，常伴随着大风、暴雨。',
            '大暑是一年中最热的节气，这时正值中伏前后，"湿热交蒸"在此时到达顶点。在我国很多地区，经常会出现摄氏40度的高温天气。大暑期间为一年最热时期，也是喜热作物生长速度最快的时期。这个时期气温最高，农作物生长最快，同时，很多地区的旱、涝、风灾等各种气象灾害也最为频繁。',
            '进入秋季，意味着降雨、风暴、湿度等，处于一年中的转折点，趋于下降或减少；在自然界，万物开始从繁茂成长趋向萧索成熟。立秋并不代表酷热天气就此结束，初秋期间天气仍然很热。按照“三伏”的推算方法，“立秋”这天往往还处在中伏期间，也就是说，酷暑并没有过完，真正凉爽一般要到白露节气之后。酷热与凉爽的分水岭并不是在立秋节气。',
            '“处”是终止的意思，处暑是表示炎热的酷暑结束，这时三伏已过或近尾声。由于受短期回热天气影响，处暑过后仍有持续高温，会感到闷热，天气由炎热向闷热转变。处暑节气处在短期回热天气期内，真正凉爽一般要到白露前后。',
            '白露是一个反映自然界气温变化的重要节令。古人以四时配五行，秋属金，金色白，故以白形容秋露。白露前后，夏日残留的暑气逐渐消失，天地的阴气上升扩散，天气渐渐转凉。白露节气基本结束了暑天的闷热，是秋季由闷热转向凉爽的转折点。白露过后，天高云淡、气爽风凉。',
            '秋分这一天同春分一样，阳光几乎直射赤道，昼夜几乎相等。从这一天起，阳光直射位置继续由赤道向南半球推移，北半球开始昼短夜长，南半球相反。秋分时节，我国大部分地区已经进入凉爽的秋季。',
            '寒露是一个反映气候变化特征的节气，寒露节气后，昼渐短，夜渐长，日照减少，热气慢慢退去，寒气渐生，昼夜的温差较大，晨晚略感丝丝寒意。古人将寒露作为寒气渐生的表征。从气候特点上看，寒露时节，南方秋意渐浓，气爽风凉，少雨干燥；北方广大地区已从深秋进入或即将进入冬季。',
            '霜降是秋季的最后一个节气，是秋季到冬季的过渡。霜降节气特点是早晚天气较冷、中午则比较热，昼夜温差大，秋燥明显。由于“霜”是天冷、昼夜温差变化大的表现，故以“霜降”命名这个表示“气温骤降、昼夜温差大”的节令。霜降时节，万物毕成，毕入于戌，阳下入地，阴气始凝。霜降过后，植物渐渐失去生机，大地一片萧索，气温骤降、昼夜温差大。霜降节气后，深秋景象明显，冷空气南下越来越频繁。',
            '立冬是季节类节气，表示自此进入了冬季，意味着风雨、干湿、光照、气温等，处于转折点上，开始从秋季向冬季气候过渡。“秋收冬藏”，万物在冬季闭藏，冬季是享受丰收、休养生息的季节。白昼时间缩短，北半球获得太阳的辐射量越来越少，但由于此时地表在下半年贮存的热量还有一定的能量，所以还不很冷。',
            '小雪和大雪、雨水、谷雨、小满等节气一样，都是直接反映降水的节气。小雪节气是一个气候概念，它代表的是小雪节气期间的气候特征，即寒潮和强冷空气活动频数较高的节气。',
            '大雪是直接反映降水的节气。节气大雪的到来，意味着天气会越来越冷，降水量渐渐增多。大雪节气最常见的就是降温、下雨或下雪。大雪节气是一个气候概念，它代表的是大雪节气期间的气候特征，即气温与降水量。',
            '冬至标示着北半球的太阳高度最小，白昼时间最短，但是冬至日的温度不是最低。冬至日是北半球各地一年中白昼最短的一天，并且越往北白昼越短。而冬至以后，阳光直射位置逐渐向北移动，北半球的白天就逐渐变长了。天文学上把立冬作为冬季的开始，冬至作为寒冷气候的开始。冬至之前通常不会很冷，冬季的真正寒天是在冬至之后。',
            '小寒，标志着寒冬正式开始。冷气积久而寒，小寒是天气寒冷但还没有到极点的意思。它与大寒、小暑、大暑及处暑一样，都是表示气温冷暖变化的节气。小寒的天气特点是：天渐寒，尚未大冷。俗话有讲：“冷在三九”，由于隆冬“三九”也基本上处于该节气之内，因此有“小寒胜大寒”之讲法。',
            '大寒同小寒一样，也是表示天气寒冷程度的节气。在我国部分地区，大寒不如小寒冷，但在某些年份和沿海少数地方，全年最低气温仍然会出现在大寒节气内。小寒、大寒是一年中雨水最少的时段。大寒以后，立春接着到来，天气渐暖。至此地球绕太阳公转了一周，完成了一个循环。'
        ],
        weekPoems: [
            '周日瞬息，又到周一',
            '周一周一，精神归西',
            '周二摆烂，啥也不干',
            '周三摸鱼，我最多于',
            '周四躺平，量力而行',
            '终于周五，敲锣打鼓',
            '美好周六，大鱼大肉'
        ],
        time2hRanges: [
            '子时 23:00 - 01:00',
            '丑时 01:00 - 03:00',
            '寅时 03:00 - 05:00',
            '卯时 05:00 - 07:00',
            '辰时 07:00 - 09:00',
            '巳时 09:00 - 11:00',
            '午时 11:00 - 13:00',
            '未时 13:00 - 15:00',
            '申时 15:00 - 17:00',
            '酉时 17:00 - 19:00',
            '戌时 19:00 - 21:00',
            '亥时 21:00 - 23:00'
        ],
        solarDateRanges: [
            { month: 2, day: 4 }, { month: 2, day: 19 }, { month: 3, day: 5 }, { month: 3, day: 20 },
            { month: 4, day: 4 }, { month: 4, day: 20 }, { month: 5, day: 5 }, { month: 5, day: 21 },
            { month: 6, day: 5 }, { month: 6, day: 21 }, { month: 7, day: 7 }, { month: 7, day: 22 },
            { month: 8, day: 7 }, { month: 8, day: 23 }, { month: 9, day: 7 }, { month: 9, day: 22 },
            { month: 10, day: 8 }, { month: 10, day: 23 }, { month: 11, day: 7 }, { month: 11, day: 22 },
            { month: 12, day: 7 }, { month: 12, day: 21 }, { month: 1, day: 5 }, { month: 1, day: 20 }
        ]
    },
    computed: {
        currentHourIndex() { const h = this.currentHour % 12; return h === 0 ? 11 : h - 1; },
        currentWeekdayIndex() { return new Date(this.currentYear, this.currentMonth, this.currentDay).getDay(); },
        currentTimeStr() { return `${this.currentHour.toString().padStart(2,'0')}:${this.currentMinute.toString().padStart(2,'0')}:${this.currentSecond.toString().padStart(2,'0')}`; },
        currentDateStr() { return `${this.currentYear}年${this.currentMonth+1}月${this.currentDay}日`; },
        weekdayStr() { return this.weekNames[this.currentWeekdayIndex]; },
        lunarMonthStr() { return getRealLunar().month; },
        lunarDayStr() { return getRealLunar().day; },
        yearGanZhi() { return getYearGanZhi(this.currentYear); },
        monthGanZhi() { return getMonthGanZhi(this.currentYear, this.currentMonth); },
        dayGanZhi() { return getDayGanZhi(this.currentYear, this.currentMonth, this.currentDay); },
        ganzhiStr() { return getYearGanZhi(new Date().getFullYear()); },
        shengxiao() { return getShengxiao(this.currentYear); }
    },
    mounted() {
        for(let i=0;i<60;i++){ this.flag.push(i<10?'0'+i:''+i); this.flag_minute.push(i<10?'0'+i:''+i); }
        const hourNumbers = ['1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时'];
        for(let i=0;i<12;i++) this.flag_hour.push(hourNumbers[i]);
        const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        for(let m of months) this.flag_mouth.push({name:m});
        for(let s of this.solarTerms) this.flag_solar.push({name:s});
        for(let i=1;i<=31;i++) this.flag_data.push({name:i}); 
        for(let w of this.weekNames) this.flag_week.push({name:w});
        for(let t of this.time2hNames) this.flag_time2h.push(t);
        this.flag_AP.push({name:'上午'},{name:'下午'});
        this.currentTime2hIndex = getCurrentTime2hIndex(new Date().getHours());
        this.startSmoothSecond();
        this.startDiscreteUpdate();
        const yearDiv = document.getElementById('year');
        const infoPanel = document.getElementById('info-panel');
        yearDiv.addEventListener('mouseenter', () => { infoPanel.style.display = 'block'; });
        yearDiv.addEventListener('mousemove', (e) => {
            const x = e.clientX, y = e.clientY;
            const panelWidth = infoPanel.offsetWidth, panelHeight = infoPanel.offsetHeight;
            let left = x - panelWidth - 10, top = y - panelHeight / 2;
            if (left < 10) left = x + 20;
            if (top < 10) top = 10;
            if (top + panelHeight > window.innerHeight - 10) top = window.innerHeight - panelHeight - 10;
            infoPanel.style.left = left + 'px';
            infoPanel.style.top = top + 'px';
        });
        yearDiv.addEventListener('mouseleave', () => { infoPanel.style.display = 'none'; });
    },
    beforeDestroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.timer) clearInterval(this.timer);
    },
    methods: {
        startSmoothSecond() {
            const updateSecond = () => {
                const now = new Date();
                const sec = now.getSeconds(), ms = now.getMilliseconds();
                const secAngle = -(sec * 6 + ms * 0.006);
                const secRot = document.getElementById('secondRotator');
                if (secRot) secRot.style.transform = `rotate(${secAngle}deg)`;
                this.highlightSecond = (ms >= 900) ? (sec + 1) % 60 : sec;
                this.rafId = requestAnimationFrame(updateSecond);
            };
            this.rafId = requestAnimationFrame(updateSecond);
        },
        startDiscreteUpdate() {
            const updateDiscrete = () => {
                const now = new Date();
                const sec = now.getSeconds(), min = now.getMinutes(), hour = now.getHours();
                const y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
                this.currentSecond = sec; this.currentMinute = min; this.currentHour = hour;
                this.currentYear = y; this.currentMonth = m; this.currentDay = d;
                this.currentAP = hour >= 12 ? 1 : 0;
                const newTime2hIdx = getCurrentTime2hIndex(hour);
                if (this.currentTime2hIndex !== newTime2hIdx) this.currentTime2hIndex = newTime2hIdx;
                
                // 计算当前节气索引
                const nowMonth = m + 1;
                const nowDay = d;
                let solarIdx = 0;
                for (let i = 0; i < this.solarDateRanges.length; i++) {
                    const sd = this.solarDateRanges[i];
                    if (nowMonth > sd.month || (nowMonth === sd.month && nowDay >= sd.day)) {
                        solarIdx = i;
                    } else {
                        break;
                    }
                }
                if (nowMonth < 2 || (nowMonth === 2 && nowDay < 4)) solarIdx = 23;
                this.currentSolarIndex = solarIdx;
                
                // 旋转节气环，使当前节气指向正右方
                const solarAngle = (solarIdx * 15) - 112.5;
                const solarDiv = document.getElementById('solar');
                if (solarDiv) {
                    solarDiv.style.transform = `translate(-50%, -50%) rotate(${-solarAngle}deg)`;
                }
                
                const minRot = document.getElementById('minuteRotator');
                if (minRot) minRot.style.transform = `rotate(${-min * 6}deg)`;
                const hourIdx = hour % 12 === 0 ? 11 : (hour % 12) - 1;
                const hourRot = document.getElementById('hourRotator');
                if (hourRot) hourRot.style.transform = `rotate(${-hourIdx * 30}deg)`;
                const time2hRot = document.getElementById('time2hRotator');
                if (time2hRot) time2hRot.style.transform = `rotate(${-this.currentTime2hIndex * 30}deg)`;
                const weekDiv = document.getElementById('week');
                if (weekDiv) weekDiv.style.transform = `translate(-50%, -50%) rotate(${-this.currentWeekdayIndex * (360/7)}deg)`;
                const mouthDiv = document.getElementById('mouth');
                if (mouthDiv) mouthDiv.style.transform = `translate(-50%, -50%) rotate(${-m * 30}deg)`;
                const dataDiv = document.getElementById('data');
                if (dataDiv) dataDiv.style.transform = `translate(-50%, -50%) rotate(${-(d-1) * (360/31)}deg)`;
                const apDiv = document.getElementById('AP');
                if (apDiv) apDiv.style.transform = `translate(-50%, -50%) rotate(${hour >= 12 ? -180 : 0}deg)`;
            };
            updateDiscrete();
            this.timer = setInterval(updateDiscrete, 1000);
        },
        // 节气提示框
        showSolarMsg(idx, event) {
            const tooltip = document.getElementById('solar-tooltip');
            if (tooltip) {
                const termName = this.solarTerms[idx];
                const desc = this.solarDesc[idx];
                tooltip.innerHTML = `<strong>${termName}</strong><br>${desc}`;
                tooltip.style.display = 'block';
                const x = event.clientX, y = event.clientY;
                const w = tooltip.offsetWidth, h = tooltip.offsetHeight;
                let left = x - w - 10, top = y - h / 2;
                if (left < 10) left = x + 20;
                if (top < 10) top = 10;
                if (top + h > window.innerHeight - 10) top = window.innerHeight - h - 10;
                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
            }
        },
        hideMsg() {
            const tooltip = document.getElementById('solar-tooltip');
            if (tooltip) tooltip.style.display = 'none';
        },
        // 星期提示框
        showWeekMsg(idx, event) {
            const tooltip = document.getElementById('week-tooltip');
            if (tooltip) {
                const weekName = this.weekNames[idx];
                const poem = this.weekPoems[idx];
                tooltip.innerHTML = `<strong>${weekName}</strong><br>${poem}`;
                tooltip.style.display = 'block';
                const x = event.clientX, y = event.clientY;
                const w = tooltip.offsetWidth, h = tooltip.offsetHeight;
                let left = x - w - 10, top = y - h / 2;
                if (left < 10) left = x + 20;
                if (top < 10) top = 10;
                if (top + h > window.innerHeight - 10) top = window.innerHeight - h - 10;
                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
            }
        },
        hideWeekMsg() {
            const tooltip = document.getElementById('week-tooltip');
            if (tooltip) tooltip.style.display = 'none';
        },
        // 时辰提示框
        showTime2hMsg(idx, event) {
            const tooltip = document.getElementById('time2h-tooltip');
            if (tooltip) {
                const timeName = this.time2hNames[idx];
                const range = this.time2hRanges[idx];
                tooltip.innerHTML = `<strong>${timeName}时</strong><br>${range}`;
                tooltip.style.display = 'block';
                const x = event.clientX, y = event.clientY;
                const w = tooltip.offsetWidth, h = tooltip.offsetHeight;
                let left = x - w - 10, top = y - h / 2;
                if (left < 10) left = x + 20;
                if (top < 10) top = 10;
                if (top + h > window.innerHeight - 10) top = window.innerHeight - h - 10;
                tooltip.style.left = left + 'px';
                tooltip.style.top = top + 'px';
            }
        },
        hideTime2hMsg() {
            const tooltip = document.getElementById('time2h-tooltip');
            if (tooltip) tooltip.style.display = 'none';
        }
    }
});