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



function HesapKontrol(){
    if(localStorage.getItem("username") == null){
        window.open("/index.html","_self");
        alert("Lutfen Giris Yapiniz..");
        return;
    }
    document.getElementById('HESAPADILABEL').innerHTML = localStorage.getItem("username");
    document.getElementById('SINIFLABEL').innerHTML = "Sınıf: " + localStorage.getItem("sinif");
    if(localStorage.getItem("admin").toLowerCase() != "true"){
        document.getElementById('EMAILABEL').innerHTML = "Email: " + localStorage.getItem("email");
    }else{
        document.getElementById('EMAILABEL').innerHTML = "Email: " + localStorage.getItem("email") + "\nADMIN HESABI";
    }
}

function CikisYapButtonClick(){
    if(localStorage.getItem("username") == null){
        window.open("/index.html","_self");
        alert("Zaten Giris Yapilmamis..");
        return;
    }

    if(confirm("Cikis Yapmak IStediginize Emin Misiniz?")){
        localStorage.clear();
        window.open("/index.html","_self");
    }
}

function AnaySafyaBtnClick(){
    window.open("/main.html","_self");
}

function FotolarimClick(){
    window.open("/fotograflarim.html","_self");
}

function AkisClick(){
    window.open("/akis.html","_self");

}

function SifreDegistirBtnClick(){
    var EskiSifretxt = document.getElementById('EskSfrInp');
    var YeniSifretxt = document.getElementById('YenSfrInp');

    if(EskiSifretxt.value == YeniSifretxt.value){
        if(confirm("Sifrenizi Degistirmek Istediginize emin misiniz?")){
            console.log("Hesap Yok");
            firebase.database().ref('users/' + localStorage.getItem("username").toLowerCase()).update({
                Sifre : document.getElementById('YenSfrInp').value,
            });
            localStorage.setItem("password", document.getElementById('YenSfrInp').value);
            alert("Basarili");
        }
    }else{
        alert("Sifreler Uyusmuyor..");
    }
}