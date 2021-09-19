const request = require('request-promise');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const url = 'https://www.kokiri.cl/presta17/index.php?id_product=376&id_product_attribute=200&rewrite=audifonos-rojos-havit-h2582bt&controller=product&id_lang=2#/10-color-rojo';

async function scrapping() {
    try {
        //const response = await request('https://www.kokiri.cl/presta17/index.php?id_category=88&controller=category&id_lang=2');
        //console.log(response);

        const $ = await request({
            uri: url,
            transform: body => cheerio.load(body)
        });
        const websiteTitle = $('title');
        console.log('Title: ', websiteTitle.html());

        const webSiteHeading = $('h1')
        console.log('Heading: ', webSiteHeading.text().trim());

        const quote = $('.current-price').find('span');
        let precio = quote.text().replace('$', '').split('.').join('');
        console.log('Precio: ', parseInt(precio));

        if (parseInt(precio) < parseInt(16000)) {
            console.log("COMPRAR!!!! " + precio);
            sendCorreo(precio);
        } else {
            console.log("NO COMPRAR :( " + precio);
        }
        console.log('LISTO!!!');

    } catch (e) {
        console.log(e);
    }
}

scrapping();


//HELPERS


async function sendCorreo(precio) {
    //////////////////////////////////////////
    ///// se usa el metodo 1 o 2 ////////////
    //////////////////////////////////////////

    //Metodo 1
    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: '******@gmail.com',
    //     pass: 'contraseña'
    //   }
    // });

    //Metodo 2
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "cfb4e4fe5c2fc4",
            pass: "e402944d5f5466"
        }
    });

    //esto queda igual para ambos metodos. Solo falta ingresar credenciales
    let textToSend = 'El precio bajo a ' + precio;
    let htmlText = plantillaCorreo;

    let info = await transporter.sendMail({
        from: '"Correo prueba" <****@gmail.com>',
        to: "****@gmail.com",
        subject: 'El precio bajo a  ' + precio,
        text: textToSend,
        html: htmlText
    });
    console.log("Correo enviado: %s", info.messageId);
}


const plantillaCorreo = ` <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr style="border-collapse:collapse"> 
 <td valign="top" align="center" style="padding:0;Margin:0;width:518px"> 
  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
    <tr style="border-collapse:collapse"> 
     <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:15px"><h2 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">EL PRODUCTO BAJO DE PRECIO</h2></td> 
    </tr> 
    <tr style="border-collapse:collapse"> 
     <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:23px;color:#555555;font-size:15px"><b>Hola,<br>no esperes mas. Te queremos contar que el producto que tanto estabas esperando. Bajo de precio... SI BAJO DE PRECIO!!!</b><br></p></td> 
    </tr> 
    <tr style="border-collapse:collapse"> 
     <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:23px;color:#555555;font-size:15px">
            Esta promoción esta disponible hasta agotar stock <br>
            Mas detalles a continuación: <a href=\"${url}\">Link</a>
         </p>
    </td> 
    </tr> 
    <tr style="border-collapse:collapse"> 
     <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:23px;color:#555555;font-size:15px">
          Atte, <br>
          Pablo Inostroza
        </p>
    </td> 
    </tr> 
  </table></td> 
</tr> 
</table>
<table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr style="border-collapse:collapse"> 
 <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:39px"> 
  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
    <tr style="border-collapse:collapse"> 
     <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://pgmxtj.stripocdn.email/content/guids/CABINET_e67aa9c09624150bb381fb585c61cc12/images/80981632021958364.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="39"></td> 
    </tr> 
  </table></td> 
</tr> 
</table> `;