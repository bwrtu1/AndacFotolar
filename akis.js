const firebaseConfig = {
    apiKey: "AIzaSyCBk-LY0AAXdhPeQnCio43O-SnqbanrpfE",
    authDomain: "andacfotolar.firebaseapp.com",
    projectId: "andacfotolar",
    storageBucket: "andacfotolar.appspot.com",
    messagingSenderId: "703076097871",
    appId: "1:703076097871:web:c2cee7cf95791f1e6e6f3a",
    measurementId: "G-JDYVPKTF2C",
    databaseURL: "https://andacfotolar-default-rtdb.europe-west1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);


function GetAll(){
    const KULLANICILAR = [];
    let INDEX = 0;
    var SINIFLAR = [];
    console.log("ADMIN:" + localStorage.getItem("admin"));
    firebase.database().ref('users/').once('value', function(snapshot){
        snapshot.forEach(
            function(child){
                var KULLANICI = child.val().KullaniciAdiKucuk;
                KULLANICILAR.unshift(KULLANICI);
                var SINIF = child.val().Sinif;
                SINIFLAR.unshift(SINIF);
            }
        );
        console.log(SINIFLAR);
        console.log(KULLANICILAR);
        KULLANICILAR.forEach(element => {
            console.log("ARANIYOR:" + element);
            var FINALSINIF = SINIFLAR[INDEX];
            console.log("FOTO BULUNDU:"+ SINIFLAR[INDEX] + "INDEX:"+INDEX);
            firebase.database().ref('fotolar/' + element).once('value', function(snapshot){
                snapshot.forEach(
                    function(child){
                        console.log(child.val().urliste)
                        if(localStorage.getItem("admin")== "true"){
                            let table = document.querySelector('table');
                            let template= `
                            <tr>
                                <td> <img src="${child.val().urliste}" width="360" object-fit="scale down";/></td>
                                <td>
                                    <h1 style="color: whitesmoke; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">${child.val().date }<br>${child.val().KullaniciAdi}<br>${FINALSINIF} </h1> 
                                    <button style="width: 60%; height: 50px;" onclick="KaldirBtnClick(this.id)" id="${child.val().FotoId}">Fotoğrafı Kaldır (ADMIN/KOMITE)</button>
                                </td>
                                
                                </tr>
                            `;
                            table.innerHTML += template;
                        }else{
                            let table = document.querySelector('table');
                            let template= `
                            <tr>
                                <td> <img src="${child.val().urliste}" width="360" object-fit="scale down";/></td>
                                <td>
                                    <h1 style="color: whitesmoke; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">${child.val().date }<br>${child.val().KullaniciAdi}</h1> 
                                </td>
                                
                                </tr>
                            `;
                            table.innerHTML += template;
                        }
                    }
                );
            });
            INDEX = INDEX+1;
            console.log("INDEX ARTTI:" + INDEX);
    });
    });
    
}
function KaldirBtnClick(clicked_id){
    Sil(clicked_id);
}
function Sil(PATH){
    if(confirm("Bu Fotografi Silmek uzeresiniz, Devam edicek misiniz?")){
        var desertRef = firebase.storage().ref('images/' + PATH);
        // Delete the file
        desertRef.delete().then(() => {
        // File deleted successfully
        console.log("BASARIYLA SILINDI SOTRAGE database bekleniyor");
        }).catch((error) => {
        // Uh-oh, an error occurred!
        alert("HATA STORAGE");
        });


        firebase.database().ref('fotolar/'+ PATH).set({
            urliste: null,
            date: null,
            KullaniciAdi: null,
            FotoId: null
        });
        location.reload();
    }
}

function FotolarimBtnClick(){
    window.open("/fotograflarim.html","_self");
}
function HesapBtnClick(){
    window.open("/account.html","_self");
}

function AnaySafyaBtnClick(){
    window.open("/main.html","_self");
}