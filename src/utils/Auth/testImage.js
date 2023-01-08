export function testImage(url) {
    return new Promise((resolve, reject) => {
        var timer,
            img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject(null);
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve(url);
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doens't trigger new load
            img.src = '//!!!!/noexist.jpg';
            reject(null);
        }, 2000);
        img.src = url;
    });
}
