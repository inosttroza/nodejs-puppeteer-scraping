const puppeteer = require('puppeteer');

/////////////////////////////////////////
///1-GENERA SCREENSHOT DE UNA PAGINA WEB//
/////////////////////////////////////////
// (async()=> {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://github.com/inosttroza');

//     page.setViewport({ width: 300, height: 2000 })
//     await page.screenshot({ path: `screenshot${Date.now()}.png` });

//     await browser.close();
// })();

///////////////////////////////////////////
///2-GENERA ARCHIVO PDF DE UNA PAGINA WEB///
/////////////////////////////////////////
 (async () => {
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto('https://github.com/inosttroza', {waitUntil: 'networkidle2'});
     await page.pdf({path: `file${Date.now()}.pdf`, format: 'A4'});
 
     await browser.close();
   })();


