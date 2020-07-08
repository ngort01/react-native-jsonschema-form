export const appScript = ({
  autoClear = false,
  imageType = '',
  dataURL = '',
}) => `
                 
    var autoClear = ${autoClear};
    var dataURL = '${dataURL}';
    var wrapper = document.getElementById("signature-pad");
    var canvas = wrapper.querySelector("canvas");
    var signaturePad;
    
    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    function resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var context = canvas.getContext("2d"); //context.getImageData(0,0,canvas.width,canvas.height)
        var imgData = signaturePad ? signaturePad.toData() : null;
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        context.scale(ratio, ratio);
        // context.putImageData(imgData,0,0);
        imgData && signaturePad.fromData(imgData);
    }
    
    window.onresize = resizeCanvas;
    resizeCanvas();
    
    signaturePad = new SignaturePad(canvas, {
        onBegin: () => window.ReactNativeWebView.postMessage("BEGIN"),
        onEnd: () => window.ReactNativeWebView.postMessage("END")
    });

    function clearSignature (event) {
        signaturePad.clear();
        window.ReactNativeWebView.postMessage("CLEAR");
    }

    if (dataURL) {
        signaturePad.fromDataURL(dataURL);
    }

    function readSignature()  {
        if (signaturePad.isEmpty()) {
            window.ReactNativeWebView.postMessage("EMPTY");
        } else {
            var url = signaturePad.toDataURL('${imageType}');
            window.ReactNativeWebView.postMessage(url);
            if (autoClear) {
                signaturePad.clear();
            }
        }
    }
`;
