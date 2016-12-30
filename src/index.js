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

function rdc(arr, callback, currentValue) {
  var array = Object(arr),
    l = array.length >>> 0,
    i = 0;

  if (currentValue === undefined) {
    while (index < l && !i in array) {
      i++;
    }

    currentValue = array[index++];
  }

  for (; i < l; i++) {
    if (i in array) {
      currentValue = callback(currentValue, array[i], i, array);
    }
  }

  return currentValue;
}

function creator(options) {
  let file = '';

  fE(getKeys(options), prop => {
    const propertyBlock = options[prop];

    fE(propertyBlock.blocks, ({max = 100, min = 0, step = 5, type = 'px', classNamePrefix = ''}) => {
      let origPrefix = rdc(prop.split('-'), (p, c) => (p || '') + c[0], ''); // origPrefix === ["width" => "w", "margin" => "m", "padding-right" => "pr"]
      let clNmPrefix = (classNamePrefix || propertyBlock.classNamePrefix || '') + origPrefix;
      let signPostfix = type === '%' ? 'p' : '';

      fE(max / step, i => {
        let stepCount = i * step;

        if (stepCount < min) {
          return;
        }

        file += '.' + clNmPrefix + Math.floor(stepCount) + signPostfix + ' {';
        file += prop + ': ' + (stepCount ? (stepCount + type) : 0) + ' !important;';
        file += '} ';
      });
    });
  });

  console.log(file);

  return file;
}

creator({
  width: {
    blocks: [
      {
        classNamePrefix: 'u-',
        max: 100,
        step: 5
      },
      {
        max: 100,
        min: 1,
        step: 33.33,
        type: '%'
      }
    ]
  },
  'padding-right': {
    blocks: [
      {
        step: 5
      }
    ]
  }
});