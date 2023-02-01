function GUVENLIKKONTROL(){
    firebase.database().ref('/users/' + localStorage.getItem("username")).once('value').then((snapshot1) => {
        if(snapshot1.val().Sifre == localStorage.getItem("password")){
            console.log('Sifre Ek Kontrolu Dogru');
        }else{
            console.log("Sifre Degismis");
            alert("Sifreniz Degimis. Lutfen Yeniden Giris Yapiniz");
            localStorage.clear();
            window.open("index.html","_self")
        }
    });

    
}