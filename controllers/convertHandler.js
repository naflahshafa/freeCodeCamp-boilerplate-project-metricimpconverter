function ConvertHandler() {

  const units = {
    gal: { returnUnit: 'L',   spell: 'gallons' },
    L:   { returnUnit: 'gal', spell: 'liters' },
    mi:  { returnUnit: 'km',  spell: 'miles' },
    km:  { returnUnit: 'mi',  spell: 'kilometers' },
    lbs: { returnUnit: 'kg',  spell: 'pounds' },
    kg:  { returnUnit: 'lbs', spell: 'kilograms' }
  };

  this.getNum = function (input) {
    const idx = input.search(/[a-zA-Z]/);
    const numStr = idx === -1 ? input : input.slice(0, idx);

    // Tidak ada angka -> default 1
    if (numStr === '') return 1;

    // Hanya boleh: angka, desimal, atau satu pecahan (3, 2.5, 1/2, 2.5/6)
    const valid = /^(\d+\.?\d*|\.\d+)(\/(\d+\.?\d*|\.\d+))?$/;
    if (!valid.test(numStr)) return 'invalid number';

    const parts = numStr.split('/');
    const result = parts.length === 2
      ? parseFloat(parts[0]) / parseFloat(parts[1])
      : parseFloat(parts[0]);

    return Number.isFinite(result) ? result : 'invalid number';
  };

  this.getUnit = function (input) {
    const idx = input.search(/[a-zA-Z]/);
    if (idx === -1) return 'invalid unit';

    let unit = input.slice(idx).toLowerCase();
    if (unit === 'l') unit = 'L';

    return units[unit] ? unit : 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit] ? units[initUnit].returnUnit : undefined;
  };

  this.spellOutUnit = function (unit) {
    return units[unit] ? units[unit].spell : undefined;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L':   result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg':  result = initNum / lbsToKg; break;
      case 'mi':  result = initNum * miToKm; break;
      case 'km':  result = initNum / miToKm; break;
      default:    return undefined;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;