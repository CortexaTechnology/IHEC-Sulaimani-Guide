document.addEventListener('DOMContentLoaded', () => {
    // --- Luminous Interactive UI Logic ---
    const cursorGlow = document.getElementById('cursor-glow');
    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    });

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Dark Mode / Light Mode Logic ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggleButton.addEventListener('click', () => {
        body.classList.contains('dark-mode') ? setTheme('light') : setTheme('dark');
    });

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    // --- Data and App Logic ---
    const centersData = [
        { district: "ناوەندی سلێمانی", number: "2262", name: "سەنتەری شار - 2 - 2", address_kurdish: "قوتابخانەی کوێزەی بنەڕەتی - بەرامبەر ئامادەیی سلێمانی کچان", address_arabic: "مدرسة كويزة الاساسية - مقابل اعدادية السليمانية للبنات" },
        { district: "ناوەندی سلێمانی", number: "1263", name: "سەنتەری شار - 3", address_kurdish: "قوتابخانەی ئەمین زەکی سەرەتایی - گەڕەکی مەجید بەگ، بەرامبەر زانکۆی سلێمانی", address_arabic: "مدرسة أمين زكي الابتدائية محلة مجيد بك مقابل جامعة السليمانية" },
        { district: "ناوەندی سلێمانی", number: "2263", name: "سەنتەری شار - 3 - 2", address_kurdish: "ناوەندی توی مەلیک بۆ کچان - توی مەلیک نزیک چاتۆڵەکەی ناشتی", address_arabic: "متوسطة توي مليك للبنات توي مليك بالقرب من تقاطع ناشتى" },
        { district: "ناوەندی سلێمانی", number: "1264", name: "سەنتەری شار - 4", address_kurdish: "قوتابخانەی موقفی بنەڕەتی - نزیک پردی دیابان", address_arabic: "مدرسة موقفي الاساسية - قرب جسر ديابان" },
        { district: "ناوەندی سلێمانی", number: "2264", name: "سەنتەری شار - 4 - 2", address_kurdish: "پەیمانگای کۆمپیوتەری کارێزە وشک - بەرامبەر کۆلێژی سەڵاحەدین", address_arabic: "معهد كومبيوتر كاردزة وشك مقابل كلية صلاح الدين" },
        { district: "ناوەندی سلێمانی", number: "1265", name: "سەنتەری شار - 5", address_kurdish: "قوتابخانەی زەرگەتەی سەرەتایی - شەقامی زەرگەتە، تەنیشت ناوەندی بەختیاری کچان", address_arabic: "مدرسة زركته الابتدائية شارع زركتة جنب متوسطة بختياري للبنات" },
        { district: "ناوەندی سلێمانی", number: "2265", name: "سەنتەری شار - 5 - 2", address_kurdish: "ئامادەیی ڕازاوە بۆ کچان - نزیک کۆمەڵگای ئەلتون", address_arabic: "اعدادية رازاوة للبنات قرب مجمع التون التجاري" },
        { district: "ناوەندی سلێمانی", number: "1266", name: "سەنتەری شار - 6", address_kurdish: "ئامادەیی پیشەسازی سلێمانی بۆ کوڕان - سەر شەقامی سالم، مۆزەخانەی سلێمانی", address_arabic: "اعدادية صناعة السليمانية للبنين - على شارع سالم - متحف السليمانية" },
        { district: "ناوەندی سلێمانی", number: "2266", name: "سەنتەری شار - 6 - 2", address_kurdish: "بینای کۆنی سەرۆکایەتی زانکۆی سلێمانی - تەنیشت قائیمقامیەت", address_arabic: "بيناية قديم لرئاسة جامعة السليمانية - بجانب قائمقام السليمانية" },
        { district: "ناوەندی سلێمانی", number: "3266", name: "سەنتەری شار - 6 - 3", address_kurdish: "قوتابخانەی نەورۆزی بنەڕەتی - نزیک فەرمانگەی ڤێتێرنەری سلێمانی", address_arabic: "مدرسة نةوروز الاساسية قرب دائرة بيطرة السليمانية" },
        { district: "ناوەندی سلێمانی", number: "1267", name: "سەنتەری شار - 7", address_kurdish: "قوتابخانەی سەرشقاری نمونەیی - فلکەی خەبات، نزیک نەخۆشخانەی پێست", address_arabic: "مدرسة سرشقار النموذجية - فلكة خبات - قرب مستشفى الجلدية" },
        { district: "ناوەندی سلێمانی", number: "2267", name: "سەنتەری شار - 7 - 2", address_kurdish: "ناوەندی ڕێژنە بۆ کچان - کۆتایی وێستگەی پاسەکانی خەبات", address_arabic: "متوسطة ريزن للبنات نهاية موقف باصات خبات" },
        { district: "ناوەندی سلێمانی", number: "1268", name: "سەنتەری شار - 8", address_kurdish: "ناوەندی سیروان بۆ کوڕان - گەڕەکی چوارباخ، بەرامبەر بانکی عێراقی بازرگانی، نزیک فلکەی مامە ڕیشە", address_arabic: "متوسطة سيروان للبنين - محلة جوارباخ مقابل المصرف العراقي للتجارة - قرب فلكة مامة ريشة" },
        { district: "ناوەندی سلێمانی", number: "2268", name: "سەنتەری شار - 8 - 2", address_kurdish: "ئامادەیی بەهار بۆ کچان", address_arabic: "اعدادية به هار للبنات" },
        { district: "ناوەندی سلێمانی", number: "1261", name: "سەنتەری شار - 1", address_kurdish: "ناوەندی مەهاباد بۆ کچان - شەهیدانی ئازادی، شەقامی ٣٠م", address_arabic: "متوسطة مهابات للبنات شهيداني ئازادي شارع 30م" },
        { district: "ناوەندی سلێمانی", number: "2261", name: "سەنتەری شار - 1 - 2", address_kurdish: "قوتابخانەی دلداری بنەڕەتی - بەرامبەر هۆتێل تایتانیک", address_arabic: "مدرسة دلدار الاساسية - مقابل فندق تايتانك" },
        { district: "ناوەندی سلێمانی", number: "1262", name: "سەنتەری شار - 2", address_kurdish: "پەیمانگای پیشەیی - سەر شەقامی ئیبراهیم پاشا، بەرامبەر نەخۆشخانەی شەریکە", address_arabic: "المعهد المهني - على شارع ابراهيم باشا مقابل مستشفى شركة" },
        { district: "ناوەندی سلێمانی", number: "2269", name: "سەنتەری شار - 9", address_kurdish: "قوتابخانەی ئەحمەد هەردی بنەڕەتی لە گەڕەکی هەندرێن", address_arabic: "مدرسة احمد هردي الاساسية في محلة هندرين" },
        { district: "ناوەندی سلێمانی", number: "1269", name: "سەنتەری شار - 9 - 2", address_kurdish: "قوتابخانەی محەمەد قودسی - پشت چێشتخانەی مەتبەخ", address_arabic: "مدرسة محمد قودسي خلف مطعم مطبخ" },
        { district: "ناوەندی سلێمانی", number: "1270", name: "سەنتەری شار - 10", address_kurdish: "قوتابخانەی سەرکەوتنی سەرەتایی - سەرچنار، گردەبڕاوکە", address_arabic: "مدرسة سركوتن الابتدائية سرجنار - كردة براوكة" },
        { district: "ناوەندی سلێمانی", number: "2270", name: "سەنتەری شار - 10 - 2", address_kurdish: "ئامادەیی زاگرۆس - بەکرەجۆ", address_arabic: "اعدادية زاكرة بكرة جو" },
        { district: "ناوەندی سلێمانی", number: "3270", name: "سەنتەری شار - 10 - 3", address_kurdish: "قوتابخانەی کوردستانی نوێی بنەڕەتی - کۆتایی شەقامی قەیوان سیتی، نزیک مارکێت پاکۆ", address_arabic: "مدرسة كوردستان الجديدة الاساسية - نهاية شارع قيوان ستي قرب ماركيت باكو" },
        { district: "ناوەندی سلێمانی", number: "1291", name: "سەنتەری شار - 11", address_kurdish: "ئامادەیی ئیشک بۆ کوڕان", address_arabic: "اعدادية ئيشك للبنين" },
        { district: "قەرەداغ", number: "1271", name: "قەرەداغ", address_kurdish: "کتێبخانەی گشتیی عەربەت - سەر شەقامی گشتی", address_arabic: "مكتبة عربت على شارع عام" },
        { district: "قەرەداغ", number: "1293", name: "قەرەداغ (نوێ)", address_kurdish: "باخچەی ساوایانی قەرەداغ - لەسەر شەقامی گشتی قەرەداغ", address_arabic: "روضة اطفال قرداغ على شارع عام قرداغ" },
        { district: "وارماوا", number: "1272", name: "وارماوا", address_kurdish: "قوتابخانەی قەرەگوڵی بنەڕەتی - قەرەگوڵ، پشت وێستگەی سووتەمەنی نەورانوس", address_arabic: "مدرسة قةرةكول الاساسية - قةرةكول - خلف محطة تعبئة الوقود نورانوس" },
        { district: "هەڵەبجەی نوێ", number: "1273", name: "هەڵەبجەی نوێ", address_kurdish: "بەشی ڕۆشنبیری و هونەر", address_arabic: "دائرة الثقافة والفنون" },
        { district: "هەڵەبجەی نوێ", number: "2273", name: "هەڵەبجەی نوێ - 2", address_kurdish: "بەشی ڕۆشنبیری و هونەر لە وارماوا", address_arabic: "دائرة ثقافة والفن في وارماوة" },
        { district: "دەربەندیخان", number: "1274", name: "دەربەندیخان", address_kurdish: "فەرمانگەی ئاوی کۆن - بەرامبەر خوانی ئاو", address_arabic: "دائرة الري القديم - مقابل خوان ماء" },
        { district: "دەربەندیخان", number: "2274", name: "دەربەندیخان - 2", address_kurdish: "نەخۆشخانەی شەهید مەلا ئەحمەد کلاری - بەرامبەر فەرمانگەی کشتوکاڵی بیباز", address_arabic: "مستشفى شهيد ملا احمد كلاري - مقابل دائرة زراعة بيباز" },
        { district: "دەربەندیخان", number: "3274", name: "دەربەندیخان - 3", address_kurdish: "کۆمەڵگەی فەرمانگەکان لەسەر ڕێگای گشتی دەربەندیخان - مەیدان", address_arabic: "مجمع دوائر على طريق عام دربندخان ميدان" },
        { district: "کەلار", number: "1275", name: "کەلار", address_kurdish: "بەڕێوەبەرایەتی گشتی چاودێری و گەشەپێدانی کۆمەڵایەتی گەرمیان - گەڕەکی شەهیدان، تەنیشت قوتابخانەی هاوکاری تێکەڵاو", address_arabic: "المديرية العامة للرعاية والتنمية الاجتماعية كرميان - محلة شهيدان - بجانب مدرسة هاوكاري المختلطة" },
        { district: "کەلار", number: "2275", name: "کەلار - 2", address_kurdish: "بەڕێوەبەرایەتی باجی دەرامەتی گەرمیان لە سەنتەری قەزای کەلار", address_arabic: "مديرية ضريبة دخل كرميان في مركز قضاء كلار" },
        { district: "ڕزگاری", number: "1276", name: "صمود", address_kurdish: "کتێبخانەی گشتیی ڕزگاری - ناحیەی ڕزگاری", address_arabic: "المكتبة العامة رزكاري ناحية رزكاري" },
        { district: "کفری", number: "1277", name: "کفری", address_kurdish: "سەنتەری لاوان و وەرزشی کفری", address_arabic: "مركز شباب و رياضة كفري" },
        { district: "کفری", number: "2277", name: "کفری - 2", address_kurdish: "کۆمەڵگەی فەرمانگەکان لەسەر ڕێگای سەرەقەڵا - کفری", address_arabic: "مجمع دوائر على طريق عام سرقلا كفري" },
        { district: "بازیان", number: "1278", name: "بازیان", address_kurdish: "کتێبخانەی گشتیی بازیان - بەرامبەر نەخۆشخانەی بازیان", address_arabic: "مكتبة عامة بازيان مقابل مستشفى بازيان" },
        { district: "بازیان", number: "2278", name: "بازیان - 2", address_kurdish: "قوتابخانەی هەڵگوردی بنەڕەتی", address_arabic: "مدرسة هلكورد الاساسية" },
        { district: "جەمجەماڵ", number: "1279", name: "جەمجەماڵ", address_kurdish: "بەڕێوەبەرایەتی کتێبخانەی گشتی - ناو کتێبخانەی گشتی جەمجەماڵ", address_arabic: "مديرية المكتبة العامة داخل مكتبة عامة جمجمال" },
        { district: "جەمجەماڵ", number: "2279", name: "جەمجەماڵ - 2", address_kurdish: "بەڕێوەبەرایەتی کتێبخانەی گشتی - ناو کتێبخانەی گشتی جەمجەماڵ", address_arabic: "مديرية المكتبة العامة - داخل مكتبة عامة جمجمال" },
        { district: "جەمجەماڵ", number: "1294", name: "جەمجەماڵ (نوێ)", address_kurdish: "نووسینگەی پۆستە و گەیاندنی تەکێ - نزیک باڵەخانەی سەنتەری لاوان", address_arabic: "مكتب بريد والاتصالات تكية قرب بناية مركز الشباب" },
        { district: "جەمجەماڵ", number: "2294", name: "جەمجەماڵ (نوێ) - 2", address_kurdish: "فەرمانگەی کشتوکاڵی ئاغجەلەر", address_arabic: "دائرة زراعة اغجلر" },
        { district: "шۆڕш/سەنگاو", number: "1280", name: "шۆڕш / سەنگاو", address_kurdish: "سەنتەری وەرزش و لاوانی шۆڕш - بەرامبەر وێستگەی بەنزینی шۆڕш", address_arabic: "مركز رياضة و شباب شورش مقابل محطة وقود شورش" },
        { district: "шۆڕш/سەنگاو", number: "2280", name: "шۆڕш / سەنگاو - 2", address_kurdish: "بەڕێوەبەرایەتی ناحیەی سەنگاو", address_arabic: "مديرية ناحية سنكاوة" },
        { district: "سەید سادق", number: "1281", name: "سەید سادق", address_kurdish: "سەنتەری ڕاهێنانی ژنان - بەرامبەر نەخۆشخانەی حصار", address_arabic: "مركز تدريب النساء - مقابل مستشفى حصار" },
        { district: "سەید سادق", number: "2281", name: "سەید سادق - 2", address_kurdish: "نەخۆشخانەی گشتیی هەورامان", address_arabic: "مستشفى عام هةورامان" },
        { district: "سەید سادق", number: "3281", name: "سەید سادق - 3", address_kurdish: "کتێبخانەی گشتیی خورماڵ - لەسەر ڕێگای خورماڵ / بیارە", address_arabic: "مكتبة عامة خورمال على طريق خورمال / بياره" },
        { district: "سەید سادق", number: "4281", name: "سەید سادق - 4", address_kurdish: "کتێبخانەی گشتیی سەید سادق - دەروازەی سەید سادق، بەرامبەر گوندی قەویلە", address_arabic: "مكتبة عامة سيد صادق بوابة سيد صادق مقابل قرية قلرخ" },
        { district: "هەڵەبجەی شەهید", number: "1282", name: "هەڵەبجەی شەهید", address_kurdish: "باڵەخانەی کارتی زانیاری - شوقەکانی عەنەب، بەرامبەر سەنتەری پۆلیسی شەهید سەرکار", address_arabic: "بناية بطاقة معلومات - شقق عنب - مقابل مركز الشرطة شهيد سةركار" },
        { district: "هەڵەبجەی شەهید", number: "2282", name: "هەڵەبجەی شەهید - 2", address_kurdish: "بەڕێوەبەرایەتی ناحیەی سیروان - نزیک مزگەوتی مام", address_arabic: "مديرية ناحية سيروان - قريب من مسجدی مام" },
        { district: "هەڵەبجەی شەهید", number: "3282", name: "هەڵەبجەی شەهید - 3", address_kurdish: "قائیمقامیەتی قەزای ناوەندی هەڵەبجەی شەهید", address_arabic: "قائمقامية قضاء مركز حلبجة الشهيد" },
        { district: "پێنجوێن", number: "1283", name: "پێنجوێن", address_kurdish: "قائیمقامیەتی قەزای پێنجوێن - شوێنی فەرمانگەی نفوسی کۆن", address_arabic: "قائمقامية قضاء بنجوين - مكان دائرة النفوس القديم" },
        { district: "پێنجوێن", number: "2283", name: "پێنجوێن - 2", address_kurdish: "قوتابخانەی ئاریارێز - نزیک پردی ناڵپارێز", address_arabic: "مدرسة ئارياريز بالقرب من جسر نالباريز" },
        { district: "پێنجوێن", number: "3283", name: "پێنجوێن - 3", address_kurdish: "قوتابخانەی کەرەمی بنەڕەتی - نزیک کۆمەڵگەی فەرمانگەکان", address_arabic: "مدرسة كرمك الاساسية قرب مجمع الدوائر" },
        { district: "دوکان", number: "1284", name: "دوکان", address_kurdish: "قوتابخانەی سەرچناری بنەڕەتی - بەرامبەر ئامادەیی سارای تێکەڵاو", address_arabic: "مدرسة سةرجنار الاساسية - مقابل اعدادية سارا المختلطة" },
        { district: "دوکان", number: "2284", name: "دوکان - 2", address_kurdish: "کۆمەڵگەی فەرمانگەکانی ناحیەی بنگرد - نزیک نەخۆشخانەی بنگرد", address_arabic: "مجمع دوائر ناحية بنكرد - قريب من مستشفى بنكرد" },
        { district: "دوکان", number: "3284", name: "دوکان - 3", address_kurdish: "کۆمەڵگەی فەرمانگەکان - ناحیەی خەلەکان", address_arabic: "مجمع دوائر - ناحية خلكان" },
        { district: "دوکان", number: "1295", name: "دوکان (نوێ)", address_kurdish: "سەنتەری بەرگری شارستانی پیرەمەگرون - بەرامبەر نەخۆشخانەی پیرەمەگرون", address_arabic: "مركز دفاع مدني بيرةمكرون مقابل مستشفى بيرةمكرون" },
        { district: "دوکان", number: "2295", name: "دوکان (نوێ) - 2", address_kurdish: "بەڕێوەبەرایەتی ناحیەی سورداш", address_arabic: "مديرية ناحية سورداش" },
        { district: "چوارقوڕنە", number: "1285", name: "چوارقوڕنە", address_kurdish: "کۆمەڵگەی فەرمانگەکان لە چوارقوڕنە - ناو کۆمەڵگەی فەرمانگەکانی چوارقوڕنە", address_arabic: "مجمع الدوائر في جوارقورنة داخل مجمع دوائر جوارقورنة" },
        { district: "چوارقوڕنە", number: "2285", name: "چوارقوڕنə - 2", address_kurdish: "باڵەخانەی فەرمانبەران - تەنیشت سەنتەری ئاسایشی خدران", address_arabic: "بناء الموظفين - بجانب مركز اسايش خدران" },
        { district: "حاجی ئاوا", number: "1286", name: "حاجی ئاوا", address_kurdish: "سەرۆکایەتی شارەوانی حاجیاوا لە حاجیاوا", address_arabic: "رئاسة بلدية حاجياوا في حاجياوا" },
        { district: "ڕانیە", number: "1287", name: "ڕانیە - 1", address_kurdish: "سەنتەری چاککردنەوەی کارەبای ڕانیە - بەرامبەر پزیشکی دادی ڕانیە", address_arabic: "مركز صيانة كهرباء رانية مقابل طب عدلي في رانية" },
        { district: "ڕانیە", number: "2287", name: "ڕانیە - 1 - 2", address_kurdish: "ناو باڵەخانەی ناحیەی سەرکەپکان", address_arabic: "داخل بناية ناحية سركيكان" },
        { district: "ڕانیە", number: "3287", name: "ڕانیە - 1 - 3", address_kurdish: "قوتابخانەی ئاوری بنەڕەتی - سەر شەقامی سەید عەلی", address_arabic: "مدرسة ئاوري الاساسية على شارع سيد علي" },
        { district: "ڕانیە", number: "1292", name: "ڕانیە - 2", address_kurdish: "بەڕێوەبەرایەتی گشتیی پەروەردە لە ڕاپەڕین", address_arabic: "مديرية تربية العامة في رابةرين" },
        { district: "بێتواتە", number: "1288", name: "بێتواتە", address_kurdish: "سەرۆکایەتی شارەوانی شکارتە لە شکارتە", address_arabic: "رئاسة بلدية شكارتة في شكارتة" },
        { district: "بێتواتە", number: "1296", name: "بێتواتە (نوێ)", address_kurdish: "فەرمانگەی کشتوکاڵی سەنگەسەر - بەرامبەر فەرمانگەی کارەبای سەنگەسەر", address_arabic: "دائرة زراعة سنكسر - مقابل دائرة الكهرباء سنكسر" },
        { district: "بێتواتە", number: "2296", name: "بێتواتە (نوێ) - 2", address_kurdish: "کۆمەڵگەی فەرمانگەکانی زاراوە - ڕێگای خێرای زاراوە، بەرامبەر باخچەی ژنێویان", address_arabic: "مجمع دوائر زاراوة - طريق زاراوة السريع مقابل حديقة زنيويان" },
        { district: "قەڵادزێ", number: "1289", name: "قەڵادزێ", address_kurdish: "قوتابخانەی بناری بنەڕەتی - نزیک نەخۆشخانەی ڕاپەڕین", address_arabic: "مدرسة بنار الابتدائية قرب مستشفى raberin" },
        { district: "قەڵادزێ", number: "2289", name: "قەڵادزێ - 2", address_kurdish: "کتێبخانەی گشتیی قەڵادزێ", address_arabic: "المكتبة العامة في قلعة دزة" },
        { district: "قەڵادزێ", number: "3289", name: "قەڵادزێ - 3", address_kurdish: "ماڵی فەرمانبەران - بەرامبەر کۆمەڵگەی فەرمانگەکان", address_arabic: "دار الموظفين مقابل مجمع الدوائر" },
        { district: "قەڵادزێ", number: "4289", name: "قەڵادزێ - 4", address_kurdish: "هۆڵی بۆنەکان - نزیک کۆمەڵگەی فەرمانگەکانی هەشیو", address_arabic: "قاعة مناسبات قرب مجمع دوائر هشو" },
        { district: "قەڵادزێ", number: "5289", name: "قەڵادزێ - 5", address_kurdish: "هۆڵی بۆنەکان - نزیک کۆمەڵگەی فەرمانگەکانی نیسێوە", address_arabic: "قاعة مناسبات قرب مجمع دوائر نيسيوة" },
        { district: "شارباژێڕ", number: "1290", name: "شارباژێڕ", address_kurdish: "هۆڵی بۆنەکان - بەرامبەر شارەوانی", address_arabic: "قاعة المناسبات مقابل بلدية" },
        { district: "شارباژێڕ", number: "2290", name: "شارباژێڕ - 2", address_kurdish: "کۆمەڵگەی نیشتەجێبوون، سەربە بەڕێوەبەرایەتی ناحیەی بەرزنجە", address_arabic: "مجمع سكني التابع لمديرية ناحية برزنجة" },
        { district: "شارباژێڕ", number: "1297", name: "شارباژێڕ (نوێ)", address_kurdish: "کتێبخانەی گشتیی ماوەت - لەسەر ڕێگای ماوەت / سلێمانی", address_arabic: "مكتبة عامة ماوت على طريق ماوت / سليمانية" },
        { district: "شارباژێڕ", number: "2297", name: "شارباژێڕ (نوێ) - 2", address_kurdish: "قوتابخانەی سوورەقەڵاتی بنەڕەتی - ناو گوندی سوورەقەڵات", address_arabic: "مدرسة سورة قة لات الابتدائية داخل قرية سورة قلات" },
        { district: "شارباژێڕ", number: "3297", name: "شارباژێڕ (نوێ) - 3", address_kurdish: "سەنتەری ناحیەی گاپیلۆن - سەنتەری ئاسایشی گاپیلۆن", address_arabic: "مركز ناحية كابيلون - مركز اسايش كابيلون" }
    ];
    
    // --- DOM Elements ---
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results-container');
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const totalCentersStat = document.getElementById('total-centers-stat');
    const filteredCentersStat = document.getElementById('filtered-centers-stat');
    const totalDistrictsStat = document.getElementById('total-districts-stat');
    const dropdownWrapper = document.querySelector('.custom-dropdown-wrapper');
    const dropdownToggle = document.getElementById('custom-dropdown-toggle');
    const selectedDistrictText = document.getElementById('selected-district-text');
    const dropdownOptionsContainer = document.getElementById('custom-dropdown-options');
    
    let selectedDistrict = 'all';

    const normalizeNumerals = (str) => {
        if (typeof str !== 'string') return '';
        return str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    };

    const getUniqueDistricts = (data) => [...new Set(data.map(c => c.district))].sort((a, b) => a.localeCompare(b, 'ku'));

    const populateDistrictFilter = (districts) => {
        dropdownOptionsContainer.innerHTML = `<div class="custom-dropdown-option selected" data-value="all">هەموو ناوچەکان</div>`;
        districts.forEach(district => {
            dropdownOptionsContainer.innerHTML += `<div class="custom-dropdown-option" data-value="${district}">${district}</div>`;
        });
    };

    const renderResults = (results) => {
        resultsContainer.innerHTML = '';
        resultsPlaceholder.textContent = results.length === 0 ? 'هیچ ئەنجامێک نەدۆزرایەوە.' : '';
        results.forEach((center, index) => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.style.animationDelay = `${index * 60}ms`;
            card.innerHTML = `
                <div class="result-card-header">
                    <h3>${center.name}</h3>
                    <span class="number-badge">${center.number}</span>
                </div>
                <div class="result-card-body">
                    <div class="info-block">
                        <strong>ناونیشان (کوردی)</strong>
                        <span>${center.address_kurdish}</span>
                    </div>
                    <div class="info-block">
                        <strong>العنوان (عربي)</strong>
                        <span>${center.address_arabic}</span>
                    </div>
                </div>`;
            resultsContainer.appendChild(card);
        });
    };

    const applyFilters = () => {
        const searchTerm = normalizeNumerals(searchInput.value.toLowerCase().trim());
        let filtered = centersData;

        if (selectedDistrict !== 'all') {
            filtered = filtered.filter(c => c.district === selectedDistrict);
        }

        if (searchTerm) {
            filtered = filtered.filter(c => 
                c.name.toLowerCase().includes(searchTerm) ||
                normalizeNumerals(c.number).includes(searchTerm) ||
                c.address_kurdish.toLowerCase().includes(searchTerm) ||
                c.address_arabic.toLowerCase().includes(searchTerm)
            );
        }
        
        renderResults(filtered);
        filteredCentersStat.textContent = filtered.length;
    };
    
    dropdownToggle.addEventListener('click', () => dropdownWrapper.classList.toggle('active'));
    
    dropdownOptionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('custom-dropdown-option')) {
            selectedDistrict = e.target.dataset.value;
            selectedDistrictText.textContent = e.target.textContent;
            dropdownOptionsContainer.querySelector('.selected')?.classList.remove('selected');
            e.target.classList.add('selected');
            dropdownWrapper.classList.remove('active');
            applyFilters();
        }
    });

    window.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) dropdownWrapper.classList.remove('active');
    });

    const initializeApp = () => {
        centersData.forEach(center => {
            center.district = center.district.replace(/ш/g, 'ش');
            center.name = center.name.replace(/ш/g, 'ش');
            center.address_kurdish = center.address_kurdish.replace(/ш/g, 'ش');
        });

        const uniqueDistricts = getUniqueDistricts(centersData);
        populateDistrictFilter(uniqueDistricts);
        totalCentersStat.textContent = centersData.length;
        totalDistrictsStat.textContent = uniqueDistricts.length;
        applyFilters();
    };

    searchInput.addEventListener('input', applyFilters);
    initializeApp();
});