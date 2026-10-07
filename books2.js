/* ===== كتب الموسوعات والمجلدات الجديدة =====
   لتعديل كتاب: غيّر السعر (رقم بالريال) أو اي حقل. وإذا حطيت 0 يطلع "السعر عند الاستفسار".
   لحذف كتاب: امسح السطر كامل. */
const extraProducts=[
 {cat:"tafsir",name:"روح المعاني في تفسير القرآن العظيم والسبع المثاني",price:1400,author:"الإمام الآلوسي",publisher:"مؤسسة الرسالة",volumes:"30 مجلداً",img:"images/roh-almaani.jpg"},
 {cat:"tafsir",name:"زاد المسير في علم التفسير",price:600,author:"الإمام جمال الدين أبو الفرج عبد الرحمن بن علي ابن الجوزي",publisher:"وزارة الأوقاف - قطر",volumes:"15 مجلداً",img:"images/zad-almasir.jpg"},
 {cat:"tafsir",name:"تفسير النابلسي: تدبر آيات الله في النفس والكون والحياة",price:550,author:"الدكتور محمد راتب النابلسي",publisher:"مؤسسة الفرسان للنشر والتوزيع",volumes:"14 مجلداً",img:"images/tafsir-nabulsi.jpg"},
 {cat:"tafsir",name:"الإعراب المفصل لكتاب الله المرتل",price:450,author:"بهجت عبد الواحد صالح",publisher:"دار الفكر",volumes:"6 مجلدات",img:"images/alerab-almofassal.jpg"},
 {cat:"hadith",name:"موسوعة المعجم المفهرس لألفاظ الحديث النبوي الشريف",price:700,author:"",publisher:"دار المعرفة",volumes:"",img:"images/almojam-almofahras.jpg"},
 {cat:"hadith",name:"نيل الأوطار من أسرار منتقى الأخبار",price:650,author:"الإمام محمد بن علي الشوكاني",publisher:"دار ابن الجوزي",volumes:"15 مجلداً",img:"images/nayl-alawtar.jpg"},
 {cat:"fiqh",name:"مجموعة الفتاوى لشيخ الإسلام ابن تيمية",price:1100,author:"شيخ الإسلام ابن تيمية",publisher:"دار ابن حزم",volumes:"20 مجلداً",img:"images/fatawa-ibn-taymiyyah.jpg"},
 {cat:"fiqh",name:"كتاب الأم",price:500,author:"الإمام الشافعي",publisher:"دار ابن حزم",volumes:"11 مجلداً",img:"images/kitab-alum.jpg"},
 {cat:"fiqh",name:"جامع المسائل",price:450,author:"شيخ الإسلام ابن تيمية، تحقيق محمد عزير شمس",publisher:"دار عطاءات العلم",volumes:"",img:"images/jami-almasail.jpg"},
 {cat:"fiqh",name:"حاشية ابن عابدين (رد المحتار على الدر المختار)",price:750,author:"ابن عابدين",publisher:"دار المعرفة",volumes:"12 مجلداً",img:"images/hashiyat-ibn-abidin.jpg"},
 {cat:"fiqh",name:"موسوعة الفقه الإسلامي والقضايا المعاصرة",price:700,author:"أ.د. وهبة الزحيلي",publisher:"دار الفكر",volumes:"14 مجلداً",img:"images/mawsuat-alfiqh-zuhayli.jpg"},
 {cat:"fiqh",name:"موسوعة القواعد الفقهية",price:600,author:"محمد صدقي البورنو",publisher:"مؤسسة الرسالة",volumes:"12 مجلداً",img:"images/alqawaid-alfiqhiyyah.jpg"},
 {cat:"general",name:"مجموع الشيخ صالح بن فوزان الفوزان في العقيدة",price:600,author:"الشيخ صالح بن فوزان الفوزان",publisher:"",volumes:"",img:"images/majmoo-alfawzan.jpg"},
 {cat:"general",name:"البداية والنهاية",price:700,author:"الحافظ ابن كثير",publisher:"دار عالم الكتب",volumes:"",img:"images/albidaya-wannihaya.jpg"},
 {cat:"general",name:"موسوعة أعمال عباس محمود العقاد",price:1200,author:"عباس محمود العقاد",publisher:"دار الكتاب اللبناني / دار الكتاب المصري",volumes:"",img:"images/mawsuat-alaqqad.jpg"},
 {cat:"general",name:"الموسوعة العربية العالمية",price:1800,author:"",publisher:"",volumes:"29 مجلداً",img:"images/almawsua-alarabiyya.jpg"}
];
