function fE(trgt, cb, cnxt) {
  let isArr = isArray(trgt);
  let l = isArr ? trgt.length : +trgt;

  if (!l) return [];

  for (let i = 0; l > i; i++) {
    cb.apply(cnxt, isArr ? [trgt[i], i] : [i]);
  }

  return trgt;
}

function isArray(trgt) {
  return !!trgt && Array === trgt.constructor;
}

function getKeys(trgt) {
  let keys = [];

  for (let p in trgt) if (trgt.hasOwnProperty(p)) keys.push(p);

  return keys;
}

function creator(options) {
  setTimeout(() => {
    let file = '';

    fE(getKeys(options), prop => {
      const propertyBlock = options[prop];

      fE(propertyBlock.blocks, ({max = 100, min = 0, step = 5, type = 'px', classNamePrefix = ''}) => {
        let cnPrefix = (classNamePrefix || propertyBlock.classNamePrefix || '') + prop[0]; // prop[0] === ["width" => "w", "margin" => "m"]
        let signPostfix = type === '%' ? 'p' : '';

        fE(max / step, i => {
          let stepCount = i * step;

          if (stepCount < min) {
            return;
          }

          file += '.' + cnPrefix + Math.floor(stepCount) + signPostfix + ' {';
          file += prop + ': ' + (stepCount) + type + ';';
          file += '} ';
        });
      });
    });

    console.log(file);
  }, 0);
}

creator({
  width: {
    classNamePrefix: 'u-',
    blocks: [
      {
        max: 100,
        step: 5,
        classNamePrefix: 'u-'
      },
      {
        max: 100,
        min: 1,
        step: 33.33,
        type: '%',
        classNamePrefix: 'u-'
      }
    ]
  }
});