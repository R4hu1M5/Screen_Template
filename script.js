$(document).ready(function(){
    $(".change-userImage").on('click', function(){
        var newUserImage = "images/rose-blue-flower-rose-blooms-67636.jpeg";
        $(".user-image img").attr("src", newUserImage);
    });
    function controls() {
        console.log($('.container').height() * $(this).index());
      $(this).addClass('selected').siblings('button').removeClass('selected');
      $('.slideDiv').animate({
        top: -$('.container').height() * $(this).index()
      }, 200);
    }

    /***Event Listeners***/
    const runCode = () => {
      const button = document.querySelectorAll('.button');
      if ( button ) {
        for ( var i = 0; i < button.length; i++ ) {
          button[i].addEventListener('click', controls, false);
        }
      }
    }
    runCode();
});

// Code for Webcam
var image_count = 1;
const vid = document.querySelector('video');
navigator.mediaDevices.getUserMedia({video: true}) // request cam
    .then(stream => {
        vid.srcObject = stream; // don't use createObjectURL(MediaStream)
        return vid.play(); // returns a Promise
        })
        .then( () => { // enable the button
            const btn = document.querySelector('button');
            btn.disabled = false;
            btn.onclick = e => {
              takeASnap()
                .then(download);
              };
            })
              .catch(e => console.log('please use the fiddle instead'));

function takeASnap(){
    //const canvas = document.createElement('canvas'); // create a canvas
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d'); // get its context
    ctx.drawImage(vid, 0,0, canvas.width, canvas.height); // the video
    return new Promise( (res, rej) => {
        canvas.toBlob(res, 'image/png'); // request a Blob from the canvas
        });
    }
function download(blob){
    // uses the <a download> to download a Blob
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = image_count + '.png';
    document.body.appendChild(a);
    a.click();
    image_count++;
    }
