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



var fileItem;
var fileName;
var SelectedImage = false;
var UPLOADING = false;

document.getElementsByClassName('akisclass').oncli


function getFile(e){
    if(UPLOADING) {
        alert("Sabirsiz Arkadas, Fotograf Zaten Gonderiliyor... BEKLE");
        return;
    }
    fileItem = e.target.files[0];
    const reader = new FileReader()

    let files = document.getElementById('fileInp').files
    reader.onload = async (event) => {
        document.getElementById('img').setAttribute('src', event.target.result)
    }
    reader.readAsDataURL(files[0])
    SelectedImage = true;
}

function uploadImage(){
    if(UPLOADING) {
        alert("Fotograf Zaten Gonderiliyor... bekle");
        return;
    }
    if (localStorage.getItem("username") === null) {
        //let input_username = localStorage.setItem("username", "onur");
        //let input_password = localStorage.setItem("password", "onur1234");
        //alert("Kullanıcı Adı Tanımlanmamış...");
        window.open("/index.html","_self");
        return;
    }else{
        if(SelectedImage){
            var YuzdelikLabel = document.getElementById('yuzdelikLabel');
            var now = new Date();
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = now - start;
            var oneDay = 1000 * 60 * 60 * 24;
            var day = Math.floor(diff / oneDay);
            var seconds = new Date().getTime() / 1000;
            fileName = localStorage.getItem("username") + day + "-" + Math.round(seconds);


            let storageRef = firebase.storage().ref("images/" + localStorage.getItem("username")  + '/' + day + '|' + Math.round(seconds));
            let uploadTask = storageRef.put(fileItem);

            let ISTEURL = "Bilinmiyor";

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                UPLOADING = true;
                console.log('Upload is ' + progress + '% done');
                YuzdelikLabel.innerHTML = "%" + Math.round(progress*100)/100;
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    YuzdelikLabel.innerHTML = "DURAKLATILDI";
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                UPLOADING = false;
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                YuzdelikLabel.innerHTML = "HATA";
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, 
            () => {
                console.log("Storage Yukleme Bitti...");
                YuzdelikLabel.innerHTML = "BITTI";
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                ISTEURL = downloadURL;
                    //Gonderdi
                    firebase.database().ref('fotolar/' + localStorage.getItem("username")  + '/' + day + '|' + Math.round(seconds)).set({
                        urliste: ISTEURL,
                        date: now.toDateString(),
                        KullaniciAdi: localStorage.getItem("username"),
                        FotoId: localStorage.getItem("username")  + '/' + day + '|' + Math.round(seconds)
                    });
                alert("YUKLEME TAMAMLANDI");
                UPLOADING = false;
                });
            }
            );
        }
    }
}

function FileAlButtonClick(){
    if(UPLOADING) {
        alert("Sabirsiz Arkadas, Fotograf Zaten Gonderiliyor... BEKLE");
        return;
    }
}

function AkisBtnClick(){
    window.open("/akis.html","_self");
}

function HesapBtnClick(){
    window.open("/account.html","_self");
}

function BgYukleme(){
    firebase.database().ref('/DEFAULTBG/').once('value').then((snapshot1) => {
        console.log(snapshot1.val().ICERIK);
        document.getElementById('img').setAttribute('src', snapshot1.val().ICERIK);
    });
}
function FotolarimBtnClick(){
    window.open("/fotograflarim.html","_self");
}
