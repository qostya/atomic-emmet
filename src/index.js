function fE(trgt, cb) {
  let isArr = isArray(trgt);
  let iterCount = isArr ? trgt.length : trgt;

  for (let i = 0, l = iterCount; l > i; i++) {
    cb.apply(null, isArr ? [trgt[i], i] : [i]);
  }
}

function isArray(trgt) {
  return !!trgt && Array === trgt.constructor;
}

function getKeys(trgt) {
  let keys = [];

  for (let p in trgt) if (trgt.hasOwnProperty(p)) keys.push(p);

  return keys;
}

const cssPropsMap = {
  width: {
    prfx: 'w'
  },
  height: {
    prfx: 'h'
  },
  margin: {
    prfx: 'm'
  },
  padding: {
    prfx: 'p'
  }
};

function creator(options) {
  setTimeout(() => {
    let file = '';

    fE(getKeys(options), prop => {
      const propertyBlock = options[prop];

      fE(propertyBlock.blocks, ({max = 100, min = 0, step = 5, type = 'px', classNamePrefix = ''}) => {
        let cnPrefix = (classNamePrefix || propertyBlock.classNamePrefix || '') + cssPropsMap[prop].prfx;
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