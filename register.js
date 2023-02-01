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
var ZATENKAYITLI;

function KayitOlButtonClick(){
    if(document.getElementById('nameInp').value == "" ||
    document.getElementById('emailInp').value == "" ||
    document.getElementById('passInp').value == ""){
        alert("Lutfen Alanlari Doldurunuz...");
        return;
    }

    firebase.database().ref().child("users/").orderByChild("KullaniciAdiKucuk").equalTo(document.getElementById('nameInp').value.toLowerCase()).once("value",snapshot => {
        if (snapshot.exists()){
            const userData = snapshot.val();
            console.log("exists!", userData);
            alert("Email Zaten Kayitli...");
            return;
        }else{
            console.log("Hesap Yok");
            firebase.database().ref('users/' + document.getElementById('nameInp').value.toLowerCase()).set({
                KullaniciAdi: document.getElementById('nameInp').value,
                Sinif: document.getElementById('Sınıflar').value,
                Email: document.getElementById('emailInp').value,
                Sifre : document.getElementById('passInp').value,
                KullaniciAdiKucuk : document.getElementById('nameInp').value.toLowerCase(),
                Admin: false
            });
            console.log("Hesap Olusturuldu");
            alert("Kayit Olma Basarili...");
        }
    });
}