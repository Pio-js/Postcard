function createCard(){

    document.getElementById('frontPreview').innerHTML = localStorage.getItem('front');
    document.getElementById('backPreview').innerHTML = localStorage.getItem('back');
    document.getElementById('frontPreview').style.backgroundImage = localStorage.getItem('frontImage');
    document.getElementById('backPreview').style.backgroundImage = localStorage.getItem('backImage'); 
}