 document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const classifyButton = document.getElementById('classifyButton');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const categorySection = document.getElementById('categories');
  const colorSection = document.getElementById('colors');
  const resultSection = document.getElementById('result');
  const categoryButtons = document.getElementById('categoryButtons');
  const colorButtons = document.getElementById('colorButtons');
  const productList = document.getElementById('productList');

   const dataset = [
    {
      "name": "Black Coat 2",
      "category": "coats",
      "color": [[1, 1, 1], [15, 15, 15], [49, 44, 42], [36, 33, 30], [91, 88, 87]],
      "file": "matched_items/Black Coat 2.png",
      "link": "https://www.bershka.com/tr/c0p174997388.html?colorId=800"
    },
    {
    "name": "Black Coat 3",
      "category": "coats",
      "color": [[1, 1, 1], [15, 15, 15], [49, 44, 42], [36, 33, 30], [91, 88, 87]],
      "file": "matched_items/Black Coat 3.png",
      "link": "https://www.bershka.com/tr/soluk-efektli-suni-deri-ceket-c0p162282059.html?colorId=800"
    },
    {
      "name": "Black Coat",
      "category": "coats",
      "color": [[1, 1, 1], [15, 15, 15], [49, 44, 42], [36, 33, 30], [91, 88, 87]],
      "file": "matched_items/Black Coat.png",
      "link": "https://www.bershka.com/tr/c0p164324918.html?colorId=800"
    },
   {
  "name": "Black Male Boots", 
  "category": "boots", 
  "color": [[1, 1, 1], [22, 22, 22], [52, 52, 52], [14, 14, 14], [43, 43, 43]], 
  "file": "matched_items/Black Male Boots.png", 
  "link": "https://shop.mango.com/tr/tr/p/erkek/ayakkab%C4%B1/cizmeler-ve-botlar/bagc%C4%B1kl%C4%B1-deri-bot_77015981?c=99"
},
{
  "name": "Black Pants 2", 
  "category": "pants", 
  "color": [[1, 1, 1],[36, 44, 52],[36, 43, 50],[34, 39, 44],[34, 41, 49]], 
  "file": "matched_items/Black Pants 2.png", 
  "link": "https://www.zara.com/tr/tr/suni-deri-genis-paca-pantolon-zw-koleksiyonu-p03581041.html?v1=415395144&utm_campaign=productShare&utm_medium=mobile_sharing_iOS&utm_source=red_social_movil"
},
{   "name": "Black Pants 3", 
    "category": "pants", 
    "color": [[1, 1, 1],[30, 31, 33],[23, 23, 25],[34, 35, 37],[38, 43, 45]],
    "file": "matched_items/Black Pants 3.png", 
    "link": "https://www.zara.com/tr/tr/slim-fit-rahat-pantolon-p06861441.html?v1=410594756&v2=2432096"},
  { 
    "name": "Black Pants", 
    "category": "pants", 
    "color": [[1, 1, 1],[17, 16, 21],[23, 22, 27],[20, 20, 22],[21, 21, 23]],
    "file": "matched_items/Black Pants.png", 
    "link": "https://www.zara.com/share/zw-collection-waxed-mid-waist-straight-leg-jeans-p06840258.html?v1=384844674&v2=2419185&utm_campaign=productShare&utm_medium=mobile_sharing_Android&utm_source=red_social_movil\n"},
  { 
    "name": "Black Skirt 2", 
    "category": "skirts", 
    "color": [[1, 1, 1], [7, 5, 14],[19, 20, 24],[24, 28, 39],[2, 2, 2]],
    "file": "matched_items/Black Skirt 2.png", 
    "link": "https://www.defacto.com.tr/velur-maxi-etek-2995361"},
   { 
    "name": "Black Skirt", 
    "category": "skirts", 
    "color": [[1, 1, 1], [31, 30, 44],[25, 25, 37],[26, 27, 39],[39, 38, 57]],
    "file": "matched_items/Black Skirt.png", 
    "link": "https://www.defacto.com.tr/pilise-normal-bel-mini-etek-3156159" },
     { 
    "name": "Black Stripes Sweater", 
    "category": "sweaters", 
    "color": [[1, 1, 1], [220, 212, 190],[16, 14, 12],[47, 44, 32],[79, 76, 62]],
    "file": "matched_items/Black Stripes Sweater.png", 
    "link": "https://www.koton.com/cizgili-boxy-yarim-fermuarli-triko-kazak-3940835-1/"},
    { 
    "name": "Black Sweater", 
    "category": "sweaters", 
    "color": [[1, 1, 1], [13, 14, 12],[9, 9, 7],[11, 19, 9],[20, 17, 16]],
    "file": "matched_items/Black Sweater.png", 
    "link": "\nSiyah Erkek Basic Kazak Bisiklet Yaka 2KAM92005LT | Koton\n"},
  { 
    "name": "Black Woman Boots", 
    "category": "boots", 
    "color": [[1, 1, 1], [61, 61, 63],[43, 43, 45],[20, 20, 20],[40, 40, 42]],
    "file": "matched_items/Black Woman Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/kadin/ayakkab%C4%B1/cizme-ve-bot/ucu-sivri-deri-yar%C4%B1m-bot_77027120?c=99&utm_source=product-share&utm_medium=social"},
  { 
    "name": "Blue Pants 2", 
    "category": "pants", 
    "color": [[110, 142, 136],[85, 118, 144],[46, 67, 82],[119, 152, 171],[75, 110, 137] ],
    "file": "matched_items/Blue Pants 2.png", 
    "link": "https://www.zara.com/share/high-waist-trf-wide-leg-jeans-with-crossover-waistband-p08197232.html?v1=416230223&v2=2419185&utm_campaign=productShare&utm_medium=mobile_sharing_Android&utm_source=red_social_movil "},
   { 
    "name": "Blue Pants", 
    "category": "pants", 
    "color": [[126, 142, 156],[196, 204, 205],[123, 141, 155],[143, 161, 172],[153, 171, 181] ],
    "file": "matched_items/Blue Pants.png", 
    "link": " https://www.zara.com/share/baggy-fit-jeans-p08062380.html?v1=410773439&v2=2432131&utm_campaign=productShare&utm_medium=mobile_sharing_Android&utm_source=red_social_movil\n"},
   { 
    "name": "Blue Sweater 2", 
    "category": "sweaters", 
    "color": [[68, 84, 107],[67, 83, 106],[77, 96, 118],[123,133,142],[63, 79, 101]],
    "file": "matched_items/Blue Sweater 2.png", 
    "link": "\nMavi Erkek Oversize Sweatshirt Kolej Baskılı Yarım Fermuarlı Renk Bloklu Şardonlu Pamuk Karışımlı 5WAM70029MK | Koton\n"},
   { 
    "name": "Blue Sweater", 
    "category": "sweaters", 
    "color": [[22, 35, 54],[25, 38, 69],[114, 150, 155],[24, 32, 59],[38, 47, 72] ],
    "file": "matched_items/Blue Sweater.png", 
    "link": "https://www.koton.com/cep-detayli-dugmeli-bisiklet-yaka-tuvit-hirka-4014733-1/"},
  { 
    "name": "Brown Coat 2", 
    "category": "coats", 
    "color":[[116, 64, 26], [183, 125, 79],[75, 36, 9],[188, 129, 81],[99, 54, 20]],
    "file": "matched_items/Brown Coat 2.png", 
    "link": "https://www.bershka.com/tr/c0p164324663.html?colorId=700"},
     { 
    "name": "Brown Coat ", 
    "category": "coats", 
    "color": [[35, 23, 18], [72, 49, 29],[45, 29, 22],[70, 42, 29],[75, 54, 37]],
    "file": "matched_items/Brown Coat.png", 
    "link": "https://www.bershka.com/tr/c0p164734203.html?colorId=700"},
        { 
    "name": "Brown Line Boots", 
    "category": "boots", 
    "color": [[92, 71, 54], [90, 68, 52],[83, 65, 50],[66, 49, 35],[29, 17, 7]],
    "file": "matched_items/Brown Line Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/kadin/ayakkab%C4%B1/cizme-ve-bot/puskullu-topuklu-deri-bilekte-bot_87030257?c=37&utm_source=product-share&utm_medium=social"},
      { 
    "name": "Brown Long Coat ", 
    "category": "coats", 
    "color": [[74, 54, 31], [75, 58, 38],[82, 59, 39],[64, 47, 27],[95, 77, 53]],
    "file": "matched_items/Brown Long Coat.png", 
    "link": "https://www.bershka.com/tr/c0p165251114.html?colorId=746"},
     { 
    "name": "Brown Long Skirt ", 
    "category": "skirts", 
    "color": [[80, 55, 42], [60, 43, 48],[53, 41, 34],[34, 36, 39]],
    "file": "matched_items/Brown Long Skirt.png", 
    "link": "https://www.defacto.com.tr/straight-fit-etek-3175633"},
  { 
    "name": "Brown Male Boots", 
    "category": "boots", 
    "color": [[50, 34, 31], [45, 35, 34],[81, 70, 72],[49, 40, 39],[71, 61, 62]],
    "file": "matched_items/Brown Male Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/erkek/ayakkab%C4%B1/cizmeler-ve-botlar/cilal%C4%B1-deri-chelsea-bot_7704597\n6?c=30&utm_source=product-share&utm_medium=socia\n"},   
  { 
    "name": "Brown Pants", 
    "category": "pants", 
    "color": [[58, 46, 34], [80, 64, 49],[90, 75, 55],[95, 78, 62],[62, 47, 32]],
    "file": "matched_items/Brown Pants.png", 
    "link": "https://www.zara.com/tr/tr/fitilli-kadife-carrot-fit-pantolon-p01538360.html?v1=379015447&v2=2432096"},
   { 
    "name": "Brown Skirt ", 
    "category": "skirts", 
    "color": [[181, 146, 116], [181, 146, 116],[162, 130, 103],[171, 139, 112],[184, 149, 119]],
    "file": "matched_items/Brown Skirt.png", 
    "link": "https://www.defacto.com.tr/pilise-normal-bel-mini-etek-2993501 "},
    { 
    "name": "Brown Sweater 2", 
    "category": "sweaters", 
    "color": [[163, 129, 104], [160, 127, 100],[146, 112, 87],[156, 121, 95],[166, 130, 102]],
    "file": "matched_items/Brown Sweater 2.png", 
    "link": "https://www.koton.com/sardonlu-pamuklu-basic-kapsonlu-sweatshirt-3939916/"},
     { 
    "name": "Brown Sweater 3", 
    "category": "sweaters", 
    "color": [[183, 161, 129], [196, 175, 144],[194, 167, 137],[202, 179, 147],[182, 162, 129]],
    "file": "matched_items/Brown Sweater 3.png", 
    "link": "https://www.koton.com/bisiklet-yaka-dokulu-triko-kazak-3977974-1/"},
     { 
    "name": "Brown Sweater", 
    "category": "sweaters", 
    "color": [[61, 41, 32], [66, 45, 34],[61, 41, 32],[63, 42, 31],[67, 45, 34]],
    "file": "matched_items/Brown Sweater.png", 
    "link": "https://www.koton.com/koton-x-sahika-ercumen-viskon-kumas-karisimli-uzun-kollu-polo-yaka-tisort-4021668-1/"},
          { 
    "name": "Brown woman Boots", 
    "category": "boots", 
    "color": [[107, 75, 50], [83, 55, 29],[124, 86, 54],[66, 44, 29],[114, 81, 51]],
    "file": "matched_items/Brown woman Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/kadin/ayakkab%C4%B1/cizme-ve-bot/blok-topuklu-suet-bilekte-bot_77056753?c=31&utm_source=product-share&utm_medium=social"},
  { 
    "name": "Camo Coat", 
    "category": "coats", 
    "color": [[77, 74, 71],[79, 74, 74],[24, 21, 24],[168, 168, 167],[85, 83, 98]],
    "file": "matched_items/Camo Coat.png", 
    "link": "https://www.bershka.com/tr/desenli-suni-y%C3%BCnl%C3%BC-ceket-c0p167311560.html?colorId=800" },
   { 
    "name": "Dark Blue Sweater", 
    "category": "sweaters", 
    "color": [[21, 30, 49], [16, 27, 43],[24, 37, 54],[22, 34, 60],[20, 29, 46]],
    "file": "matched_items/Dark Blue Sweater.png", 
    "link": "https://www.koton.com/balikci-yaka-dikis-detayli-uzun-kollu-triko-kazak-4023936-1/"},
 { 
    "name": "Dark Red Boots", 
    "category": "boots", 
    "color": [[66, 51, 54], [56, 42, 46],[57, 41, 41],[35, 21, 20],[82, 66, 65]],
    "file": "matched_items/Dark Red Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/kadin/ayakkab%C4%B1/cizme-ve-bot/kare-uclu-deri-yar%C4%B1m-bot_87020250?c=32&utm_source=product-share&utm_medium=social"}, 

  { 
    "name": "Dark Red Pants", 
    "category": "pants", 
    "color": [[90, 53, 60],[77, 38, 43],[54, 21, 26],[74, 37, 45],[21, 76, 225] ],
    "file": "matched_items/Dark Red Pants.png", 
    "link": "https://www.zara.com/share/cift-pilili-pantolon-p01255556.html?v1=423952432&utm_campaign=productShare&utm_medium=mobile_sharing_iOS&utm_source=red_social_movil"},
  { 
    "name": "Green Pants", 
    "category": "pants", 
    "color": [[68, 68, 54], [76, 77, 63],[60, 61, 46],[90, 91, 74],[72, 73, 59]],
    "file": "matched_items/Green Pants.png", 
    "link": "https://www.zara.com/share/wide-leg-jeans-x-nanushka-p09942301.html?v1=387155978&v2=2432131&utm_campaign=productShare&utm_medium=mobile_sharing_Android&utm_source=red_social_movil"},
   { 
    "name": "Grey Coat", 
    "category": "coats", 
    "color": [[160, 158, 159], [160, 159, 160],[104, 102, 101],[144, 144, 144],[156, 154, 154]],
    "file": "matched_items/Grey Coat.png", 
    "link":"https://www.bershka.com/tr/c0p164328764.html?colorId=200"},
   { 
    "name": "Grey Long Skirt", 
    "category": "skirt", 
    "color": [[84, 82, 95], [68, 66, 79],[78, 76, 89],[92, 89, 104],[78, 76, 88]],
    "file": "matched_items/Grey Long Skirt.png", 
    "link":"https://www.defacto.com.tr/a-kesim-normal-bel-maxi-etek-3194726"},
   { 
    "name": "Grey Skirt 2", 
    "category": "skirt", 
    "color": [[75, 75, 79],[74, 74, 74],[79, 78, 82],[87, 86, 91],[75, 75, 79] ],
    "file": "matched_items/Grey Skirt 2.png", 
    "link":
    "https://www.defacto.com.tr/sort-etek-yuksek-bel-pamuk-astarli-mini-etek-3159589"},
   { 
    "name": "Grey Skirt", 
    "category": "skirt", 
    "color": [[90, 89, 94],[94, 92, 96],[85, 84, 89],[76, 76, 80],[96, 96, 98] ],
    "file": "matched_items/Grey Skirt.png", 
    "link":"https://www.defacto.com.tr/coool-pilise-etek-3172317"},
   { 
    "name": "Grey Sweater", 
    "category": "sweaters", 
    "color": [[146, 152, 152], [182, 186, 186],[178, 183, 185],[86, 88, 85],[148, 155, 154]],
    "file": "matched_items/Grey Sweater.png", 
    "link": "https://www.koton.com/kisa-kollu-triko-kazak-dik-yaka-yumusak-dokulu-3935263-3/"},
   { 
    "name": "High White Boots", 
    "category": "boots", 
    "color": [[194, 175, 161], [186, 167, 151],[201, 182, 166],[196, 177, 161],[188, 170, 156]],
    "file": "matched_items/High White Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/kadin/ayakkab%C4%B1/cizme-ve-bot/fermuarl%C4%B1-uzun-cizme_77067118?c=08&utm_source=product-share&utm_medium=social"},
     { 
    "name": "Pink Skirt", 
    "category": "skirts", 
    "color": [[188, 131, 137], [195, 137, 141],[167, 106, 111],[195, 137, 147],[188, 131, 137] ],
    "file": "matched_items/Pink Skirt.png", 
    "link": "https://www.defacto.com.tr/a-kesim-normal-bel-saten-midi-etek-3204297"},
   { 
    "name": "Red Coat", 
    "category": "coats", 
    "color": [[38, 10, 16],[50, 12, 21],[44, 6, 17], [39, 6 ,13],[49, 7, 17]],
    "file": "matched_items/Red Coat.png", 
    "link": "https://www.bershka.com/tr/c0p167582954.html?colorId=605"},
       { 
    "name": "Red Skirt", 
    "category": "skirts", 
    "color": [[147, 5, 33], [154, 3, 34],[191, 21, 48],[145, 11, 33],[203, 25, 53]],
    "file": "matched_items/Red Skirt.png", 
    "link": "https://www.defacto.com.tr/pilise-normal-bel-mini-etek-2993501   "},
  { 
    "name": "Shiny Pants", 
    "category": "pants", 
    "color": [[136, 125, 111], [182, 169, 159],[146, 131, 112],[162, 151, 135],[178, 168, 155]],
    "file": "matched_items/Shiny Pants.png", 
    "link": "https://www.zara.com/share/trf-loose-foil-mid-waist-jeans-p05520212.html?v1=413764386&v2=2419185&utm_campaign=productShare&utm_medium=mobile_sharing_Android&utm_source=red_social_movil"},
   { 
    "name": "Snake Boots", 
    "category": "boots", 
    "color": [[143, 113, 90], [174, 149, 123],[101, 66, 34],[94, 60, 33],[148, 119, 90]],
    "file": "matched_items/Snake Boots.png", 
    "link": "https://shop.mango.com/tr/tr/p/kadin/ayakkab%C4%B1/cizme-ve-bot/yuksek-y%C4%B1lan-desenli-derisi-cizme_77064067?c=08&utm_source=product-share&utm_medium=social"},
  { 
    "name": "White Coat 2", 
    "category": "coats", 
    "color": [[227, 227, 227],[218, 218, 218],[220, 218, 219],[230, 230, 230],[203, 203, 203]],
    "file": "matched_items/White Coat 2.png", 
    "link": "https://www.bershka.com/tr/c0p165175307.html?colorId=805" },
  { 
    "name": "White Coat 3", 
    "category": "coats", 
    "color": [[236, 226, 222], [227, 216, 208],[218, 202, 190],[172, 154, 140],[242, 233, 228]],
    "file": "matched_items/White Coat 3.png", 
    "link": "https://www.bershka.com/tr/kap%C3%BC%C5%9Fonlu-suni-k%C3%BCrk-ceket-c0p177325745.html?colorId=712" },
{ 
    "name": "White Coat", 
    "category": "coats", 
    "color": [[203, 182, 159],[218, 201, 183],[198, 179, 161],[175, 156, 130],[200, 183, 165]],
    "file": "matched_items/White Coat.png", 
    "link": "https://www.bershka.com/tr/c0p164319546.html?colorId=746" },
{ 
    "name": "White Pants 2", 
    "category": "pants", 
    "color": [[186, 176, 164],[207, 197, 188],[195, 183, 169],[200, 190, 177],[209, 197, 188]],
    "file": "matched_items/White Pants 2.png", 
    "link": "https://www.zara.com/tr/tr/fitilli-kadife-carrot-fit-pantolon-p01538360.html?v1=379015448&v2=2432096"},
{ 
    "name": "White Pants 3", 
    "category": "pants", 
    "color": [[220, 211, 196],[227, 218, 201],[208, 197, 181],[219, 210, 195],[231, 222, 207]],
    "file": "matched_items/White Pants 3.png", 
    "link": "https://www.zara.com/share/rustik-high-waist-pantolon-p01478162.html?v1=374921107&utm_campaign=productShare&utm_medium=mobile_sharing_iOS&utm_source=red_social_movil"},
{ 
    "name": "White Pants", 
    "category": "pants", 
    "color": [[202, 193, 172],[200, 189, 169],[191, 182, 160],[195, 187, 165],[208, 199, 180] ],
    "file": "matched_items/White Pants.png", 
    "link": "https://www.zara.com/share/regular-fit-jeans-p08062315.html?v1=391619855&v2=2432131&utm_campaign=productShare&utm_medium=mobile_sharing_Android&utm_source=red_social_movil"},
    { 
    "name": "White Sweater", 
    "category": "sweaters", 
    "color": [[232, 230, 215],[236, 233, 226],[232, 231, 223],[242, 239, 232],[224, 221, 211] ],
    "file": "matched_items/White Sweater.png", 
    "link": "https://www.koton.com/bisiklet-yaka-uzun-kollu-pamuk-karisimli-islemeli-triko-kazak-4034446/"},
    { 
    "name": "White Sweater 2", 
    "category": "sweaters", 
    "color": [[237, 234, 227],[241,238,226],[206, 203, 190],[225, 223, 203],[238, 235, 220] ],
    "file": "matched_items/White Sweater 2.png", 
    "link": "Ekru Kadın Dik Yaka Kazak Uzun Kollu Saç Örgü Desenli 5WAK90087HT | Koton"},
  ];

  const categories = ["coats", "sweaters", "boots", "pants", "skirts"];
  let selectedCategory = null;
  let selectedColor = null;

  classifyButton.addEventListener('click', () => {
    loadingSpinner.style.display = 'block';

    const file = imageInput.files[0];
    if (!file) {
      alert('Please upload an image first.');
      loadingSpinner.style.display = 'none';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const dominantColors = extractDominantColors(img, 6);
        loadingSpinner.style.display = 'none';

        console.log('Dominant Colors:', dominantColors);
        showCategories();
        setupColorButtons(dominantColors);
      };
    };
    reader.readAsDataURL(file);
  });

  function extractDominantColors(img, numColors) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const regionWidth = img.width * 0.5;
    const regionHeight = img.height * 0.5;
    const startX = (img.width - regionWidth) / 2;
    const startY = (img.height - regionHeight) / 2;

    canvas.width = regionWidth;
    canvas.height = regionHeight;
    ctx.drawImage(img, startX, startY, regionWidth, regionHeight, 0, 0, regionWidth, regionHeight);

    const imageData = ctx.getImageData(0, 0, regionWidth, regionHeight);
    const pixels = imageData.data;

    return calculateDominantColors(pixels, numColors);
  }

 function calculateDominantColors(pixels, numColors) {
    const colorCounts = {};
    for (let i = 0; i < pixels.length; i += 4) {
      const r = Math.round(pixels[i] / 10) * 10;
      const g = Math.round(pixels[i + 1] / 10) * 10;
      const b = Math.round(pixels[i + 2] / 10) * 10;
      const rgb = `${r},${g},${b}`;
      colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
    }

    return Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, numColors)
      .map(([rgb]) => rgb.split(',').map(Number));
  }

 function mapColorToBasicName(rgb) {
  const [r, g, b] = rgb;
  const distance = Math.sqrt(r ** 2 + g ** 2 + b ** 2);

  if (distance < 30) return "Black";  // Very dark colors
  if (r > 200 && g > 200 && b > 200) return "White";
  if (r > 200 && g < 100 && b < 100) return "Red";
  if (r > 150 && r < 200 && g < 50 && b < 50) return "Dark Red";  // New Category
  if (r > 200 && g > 180 && b < 120) return "Beige";
  if (r < 100 && g > 200 && b < 100) return "Green";
  if (r < 100 && g < 100 && b > 200) return "Blue";
  if (r > 150 && g > 100 && b < 50) return "Brown";
  if (r > 180 && g > 150 && b < 100) return "Light Brown";  // New Category
  if (r < 50 && g < 50 && b > 150) return "Dark Blue";
  if (r > 180 && g > 180 && b > 180 && distance < 250) return "Light Grey";
  if (r > 150 && g < 100 && b > 150) return "Pink";
  if (r > 100 && g > 100 && b > 100) return "Grey"; 
   return "Other";
  }

  function showCategories() {
    categoryButtons.innerHTML = '';
    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category;
      button.className = 'category-button';
      button.addEventListener('click', () => {
        selectedCategory = category;
        colorSection.style.display = 'block';
        categorySection.style.display = 'none';
      });
      categoryButtons.appendChild(button);
    });
    categorySection.style.display = 'block';
  }

  function setupColorButtons(colors) {
    colorButtons.innerHTML = '';

    const range = 50;
    const consolidatedColors = consolidateColors(colors, range);

    consolidatedColors.forEach((rgb) => {
      const colorName = mapColorToBasicName(rgb);
      const [r, g, b] = rgb;
      const button = document.createElement('button');
      button.textContent = colorName;
      button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      button.style.border = '2px solid black';
      button.className = 'color-button';
      button.addEventListener('click', () => {
        selectedColor = colorName === "Other" ? null : rgb;
        colorSection.style.display = 'none';
        showResults();
      });
      colorButtons.appendChild(button);
    });
  }

  function consolidateColors(colors, range) {
    const consolidated = [];

    colors.forEach((color) => {
      const isSimilar = consolidated.some((existingColor) =>
        Math.abs(color[0] - existingColor[0]) <= range &&
        Math.abs(color[1] - existingColor[1]) <= range &&
        Math.abs(color[2] - existingColor[2]) <= range
      );

      if (!isSimilar) {
        consolidated.push(color);
      }
    });

    return consolidated;
  }

  function showResults() {
    productList.innerHTML = '';
    const range = 50;
    const matches = dataset.filter(item => {
      if (!selectedColor) return item.category === selectedCategory;
      const itemColors = Array.isArray(item.color) ? item.color : [];
      return item.category === selectedCategory &&
        itemColors.some(color =>
          Math.abs(color[0] - selectedColor[0]) <= range &&
          Math.abs(color[1] - selectedColor[1]) <= range &&
          Math.abs(color[2] - selectedColor[2]) <= range
        );
    });

    if (matches.length === 0) {
      productList.innerHTML = '<li>No matches found. Try another image or category.</li>';
    } else {
      matches.forEach(match => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${match.file}" alt="${match.name}" class="result-thumbnail">
          <p>${match.name}</p>
          <a href="${match.link}" target="_blank">View Product</a>
        `;
        productList.appendChild(listItem);
      });
    }
    resultSection.style.display = 'block';
  }

  // Show categories when the page loads
  showCategories();
});
