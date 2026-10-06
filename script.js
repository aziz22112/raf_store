/* ===== هنا تعدّل الكتب: الاسم، السعر، المؤلف، الدار، عدد المجلدات ===== */
const products=[
 {cat:"tafsir",name:"عون الرحمن في تفسير القرآن",price:"السعر عند الاستفسار",author:"أ.د. سليمان بن إبراهيم بن عبدالله اللاحم",publisher:"دار ابن الجوزي",volumes:"24 مجلداً",img:"images/awn.jpg"},
 {cat:"hadith",name:"فتح ذي الجلال والإكرام بشرح بلوغ المرام",price:"السعر عند الاستفسار",author:"الشيخ العلامة محمد بن صالح العثيمين",publisher:"دار الوطن للنشر",volumes:"15 مجلداً",img:"images/fath.jpg"},
 {cat:"fiqh",name:"دروس وفتاوى من الحرمين الشريفين",price:"السعر عند الاستفسار",author:"الشيخ العلامة محمد بن صالح العثيمين",publisher:"",volumes:"18 مجلداً",img:"images/doroos.jpg"},
 {cat:"fiqh",name:"تسهيل الفقه: الجامع لمسائل الفقه القديمة والمعاصرة",price:"السعر عند الاستفسار",author:"أ.د. عبدالله بن عبدالعزيز الجبرين",publisher:"دار ابن الجوزي",volumes:"",img:"images/tasheel.jpg"}
];
function render(){
  const q=document.getElementById("q").value.trim();
  for(const c of ["tafsir","hadith","fiqh"]){
    const el=document.getElementById("g-"+c);el.innerHTML="";
    products.forEach((p,i)=>{
      if(p.cat!==c||(q&&!p.name.includes(q)))return;
      el.insertAdjacentHTML("beforeend",
       `<div class="card" onclick="openItem(${i})"><div class="imgbox"><img class="photo" src="${p.img}" alt=""></div><h3>${p.name}</h3><p class="price">${p.price}</p></div>`);
    });
  }
}
function openItem(i){
  const p=products[i];
  pImg.src=p.img;pImg.className="photo";
  pName.textContent=p.name;pPrice.textContent=p.price;
  let l="";
  if(p.author)l+=`<li>المؤلف: ${p.author}</li>`;
  if(p.publisher)l+=`<li>الدار: ${p.publisher}</li>`;
  if(p.volumes)l+=`<li>عدد المجلدات: ${p.volumes}</li>`;
  pList.innerHTML=l||"<li>المواصفات قريباً</li>";
  popup.style.display="flex";
}
function closeItem(){popup.style.display="none"}
render();
