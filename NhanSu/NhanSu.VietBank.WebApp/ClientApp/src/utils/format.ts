import moment from 'moment';

export const capitalizeFirstLetter = (string: string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};
export const capitalize = (string: string) => {
  const lower = string.toLowerCase();
  return lower.split(' ').map(capitalizeFirstLetter).join(' ');
};

export const formatNumber = (value: string | number | undefined) => {
  if (value === undefined) return '';

  // value = ('' + value).replace(/,/g, '');
  // value = parseFloat(value).toLocaleString('en-US', {
  //   style: 'decimal',
  // });
  // return value;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  });
  return formatter.format(Number(value));
};

export const removeAccent = (str = '') => {
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/A|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  str = str.split(' ').join('_');
  str = str.split('-').join('_');
  str = str.split(' - ').join('_');
  return str;
};

const DocSo3ChuSo = (baso: any) => {
  var ChuSo = [
    ' không ',
    ' một ',
    ' hai ',
    ' ba ',
    ' bốn ',
    ' năm ',
    ' sáu ',
    ' bảy ',
    ' tám ',
    ' chín ',
  ];
  var tram;
  var chuc;
  var donvi;
  var KetQua = '';
  tram = parseInt((baso / 100).toString());
  chuc = parseInt(((baso % 100) / 10).toString());
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return '';
  if (tram != 0) {
    KetQua += ChuSo[tram] + ' trăm ';
    if (chuc == 0 && donvi != 0) KetQua += ' linh ';
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + ' mươi ';
    if (chuc == 0 && donvi != 0) KetQua = KetQua + ' linh ';
  }
  if (chuc == 1) KetQua += ' mười ';
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += ' mốt ';
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += ' lăm ';
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
};

export const formatDatetimeHHmmDDMMYYYY = (data: string) => {
  var date = moment(data).format('HH:mm DD/MM/YYYY');
  return date;
};
export const formatDatetimeDDMMYYYY = (data: string) => {
  var date = moment(data).format('DD/MM/YYYY');
  return date;
};
