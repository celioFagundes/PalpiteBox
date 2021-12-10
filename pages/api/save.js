import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';
import { fromBase64 } from '../../utils/base64';
const doc = new GoogleSpreadsheet(
  process.env.SHEET_DOC_ID
);


const genCupom = () =>{
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
    return code.substring(0,4) + '-' + code.substring(4,8) + '-' + code.substring(8,12)
}
export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];

    const sheetConfig = doc.sheetsByIndex[2];
    await sheetConfig.loadCells('A3:B3');
    const promoAtivadaCell = sheetConfig.getCell(2, 0);
    const msgPromoCell = sheetConfig.getCell(2, 1);

    let Cupom = ''
    let Promo = ''
    if(promoAtivadaCell.value === 'VERDADEIRO'){
        Cupom = genCupom()
        Promo = msgPromoCell.value
    }
    const data = JSON.parse(req.body);

    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Cupom,
      Promo,
      Data: moment().format('DD/MM/YYYY  HH:mm:ss'),
      Nota: parseInt(data.Nota),
      Recomendaria: data.Recomendaria
    });
    res.end(JSON.stringify({
      showCupom: Cupom !== '',
      Cupom,
      Promo
    }));
  } catch (err) {
    res.end(err);
  }
};
