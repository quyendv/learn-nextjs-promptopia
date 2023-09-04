export function removeVietnameseAccents(str: string) {
  // search claud, gpt for details...
  
  str = str.normalize('NFD');
  str = str.replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/Đ/g, 'D');

  return str;
}
