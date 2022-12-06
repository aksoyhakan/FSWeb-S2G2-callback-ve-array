const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(gelenListe) {
	let finalMac = gelenListe.filter((array)=>{return array.Stage==="Final";});
    return finalMac;
}



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(gelenListe, callback) {
	let finalYillari = callback(gelenListe).map((array)=>{return array.Year});
	return finalYillari;
}


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

/*function Kazananlar(gelenVeri, callbackFinaller){
	let finalVeri = callbackFinaller(gelenVeri);
	let kazananlarListe=[];
		for (let i = 0; i< finalVeri.length; i++){
		if (finalVeri[i]["Home Team Goals"]>finalVeri[i]["Away Team Goals"]){
			kazananlarListe.push(finalVeri[i]["Home Team Name"]);

		} else if(finalVeri[i]["Home Team Goals"]<finalVeri[i]["Away Team Goals"]){
			kazananlarListe.push(finalVeri[i]["Away Team Name"]);
		} else {
			let winArray= finalVeri[i]["Win conditions"].split(" win");
			kazananlarListe.push(winArray[0]);
		}
	}
	return kazananlarListe;
}

console.log(Kazananlar(fifaData,Finaller));*/






function Kazananlar(gelenListe, callback) {
let finalKazananlar = callback(gelenListe).map((array)=>{ 
		if(array["Home Team Goals"] > array["Away Team Goals"]){
			return array["Home Team Name"];
		} else if(array["Away Team Goals"]> array["Home Team Goals"]){
			return array["Away Team Name"];
		} else{
			let newItem = array["Win conditions"];
			let newArray = newItem.split(" win");
			if(newArray[0]===array["Home Team Name"]){
				return array["Home Team Name"];
			} else return array["Away Team Name"];
		}
	});
	return finalKazananlar;
}



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(gelenListe, callbackFinaller, callbackYillar, callbackKazananlar) {
	let metinList = [];
	let yilListesi = callbackYillar(gelenListe, callbackFinaller(gelenListe));
	let kazananUlkeler = callbackKazananlar(gelenListe, callbackFinaller(gelenListe));
	let metin="";
	for (let i = 0; i<yilListesi.length; i++){
		metin = `${yilListesi[i]} yılında, ${kazananUlkeler[i]} dünya kupasını kazandı!`;
		metinList.push(metin);
	}
	return metinList;
}


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(callback)
{
	let finalList = callback;
	let evSahibiVeKonukGol= finalList.map((array)=> {return array["Home Team Goals"]+array["Away Team Goals"]});
	let ortalama = evSahibiVeKonukGol.reduce((sum, array)=>{return sum = sum + array})/evSahibiVeKonukGol.length
    return ortalama.toFixed(2);
}
console.log.clear;
console.log(OrtalamaGolSayisi(Finaller(fifaData)));



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

/*function UlkelerinKazanmaSayilari(data) {
	let finalMacları = data.filter((array)=>{return array.Stage==="Final";});
	let sonucListe=[];
	let newList={};
	let kupaKazananlar = finalMacları.map((array)=>{ 
		if(array["Home Team Goals"] > array["Away Team Goals"]){
			return {"Initials":array["Home Team Initials"], "worldCup":1};
		} else if(array["Away Team Goals"]> array["Home Team Goals"]){
			return {"Initials":array["Away Team Initials"], "worldCup":1} ;
		} else{
			let newItem = array["Win conditions"];
			let newArray = newItem.split(" win");
			if(newArray[0]===array["Home Team Name"]){
				return {"Initials":array["Home Team Initials"], "worldCup":1};
			} else return {"Initials":array["Away Team Initials"], "worldCup":1};
		}
	});
	console.log(kupaKazananlar);
	for (let i=0;i<kupaKazananlar.length;i++){
		if (i===0){
			newList["Initials"]=kupaKazananlar[0]["Initials"];
			newList["worldCup"]= 1;
			sonucListe.push(newList);
			console.log(newList);
		}
		for(let j = 0; j<sonucListe.length;j++){
			if(sonucListe[j]["Initials"]===kupaKazananlar[i]["Initials"]){
				sonucListe[j]["worldCup"]=sonucListe[j]["worldCup"]+1;
				console.log(newList);
				break;
			}else{
				newList["Initials"]=kupaKazananlar[i]["Initials"];
				newList["worldCup"]=1;
				sonucListe.push(newList);
				console.log(newList);
				break;
			}
		}
	} 
	return sonucListe;
}
console.clear();

console.log(UlkelerinKazanmaSayilari(fifaData));*/

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
