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

function CheckExistance(){
    if (localStorage.getItem("username") != null) {
        window.open("main.html","_self")
    }else{

    }
}

function GirisYapButtonClick(){
    if(document.getElementById('nameInp').value == "" ||
    document.getElementById('sifreInp').value == ""){
        alert("Lutfen Alanlari Doldurunuz...");
        return;
    }
    console.log('users/' + document.getElementById('nameInp').value);



    firebase.database().ref().child("users/").orderByChild("KullaniciAdiKucuk").equalTo(document.getElementById('nameInp').value.toLowerCase()).once("value",snapshot => {
        if (snapshot.exists()){
            const userData = snapshot.val();
            firebase.database().ref('/users/' + (document.getElementById('nameInp').value).toLowerCase()).once('value').then((snapshot1) => {
                console.log(snapshot1.val().Sifre);
                var SIFRE = snapshot1.val().Sifre;
                if(document.getElementById('sifreInp').value == SIFRE){
                    localStorage.setItem("username", document.getElementById('nameInp').value);
                    //alert(snapshot1.val().Sinif);
                    localStorage.setItem("sinif", snapshot1.val().Sinif);
                    localStorage.setItem("password", snapshot1.val().Sifre);
                    localStorage.setItem("email", snapshot1.val().Email);
                    localStorage.setItem("admin",snapshot1.val().Admin );
                    window.open("main.html","_self")
                }else{
                    alert("HATALI SIFRE");
                }
            });
            
        }else{
            console.log("Hesap Yok");
            alert("Hesap Bulunamadi");
        }
    });

    
}