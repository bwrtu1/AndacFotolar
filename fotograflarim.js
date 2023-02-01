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

function AkisClick(){
    window.open("/akis.html","_self");

}
function HesapBtnClick(){
    window.open("/account.html","_self");
}


function GETALL(){
    firebase.database().ref('fotolar/' + localStorage.getItem('username')+ '/').once('value', function(TumKayitlar){
        TumKayitlar.forEach(
            function(suanki){
                console.log(suanki.val());
                console.log("TumKayit:" + TumKayitlar.toString());
                //var img = document.createElement("img");
                //img.style.width = "10%";
                //img.style.height = "10%";
                //img.src = suanki.val().urliste;
                //var src = document.getElementById("FotografContainer");
                //src.appendChild(img);

                if(localStorage.getItem("admin").toLowerCase() == "true"){
                    let table = document.querySelector('table');
                    let template= `
                    <tr>
                        <td> <img src="${suanki.val().urliste}" width="360" object-fit="scale down";/></td>
                        <td>
                            <h1 style="color: whitesmoke; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">${suanki.val().date }<br>${suanki.val().KullaniciAdi}</h1> 
                            <button style="width: 60%; height: 50px;" onclick="KaldirBtnClick(this.id)" id="${suanki.val().FotoId}">Fotoğrafı Kaldır!</button>
                        </td>
                        
                        </tr>
                    `;
                    table.innerHTML += template;
                }else{
                    let table = document.querySelector('table');
                    let template= `
                    <tr>
                        <td> <img src="${suanki.val().urliste}" width="360" object-fit="scale down";/></td>
                        <td>
                            <h1 style="color: whitesmoke; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">${suanki.val().date }<br>${suanki.val().KullaniciAdi}</h1> 
                        </td>
                        
                        </tr>
                    `;
                    table.innerHTML += template;
                }
            }
        )
    });
}

function AnaySafyaBtnClick(){
    window.open("/main.html","_self");
}

function FotolarimClick(){
    window.open("/fotograflarim.html","_self");
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
