const imageUrl = null;
function bgImgLoaded() {
    if (!globals.headerBgImgLoaded) {
        globals.headerBgImgLoaded = new Date().getTime();
    } else {
        globals.headerBgImgLoaded();
    }
}
if (imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = bgImgLoaded;
    globals.headerBgImgExists = true;
} else {
    globals.headerBgImgExists = false;
}
