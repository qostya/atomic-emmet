function fE(trgt, cb) {
  let isArr = isArr(trgt);
  let iterCount = isArr ? trgt.length : trgt;

  for (let i = 0, l = iterCount; l > i; i++) {
    cb.apply(null, isArr ? [trgt[i], i] : [i]);
  }
}

function isArr(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

function getKeys(trg) {
  let keys = [];

  for (let p in trg) if (trg.hasOwnProperty(p)) keys.push(p);

  return keys;
}

function creator(options) {
  setTimeout(() => {
    let file = '';

    getKeys(options).forEach(prop => {
      fE(options[prop].blocks, ({max = 100, min = 0, step = 5, type = 'px'}) => {
        fE(max / step, i => {
          let stepCount = i * step;

          if (stepCount < min) {
            return;
          }

          file += prop + ': ' + (stepCount) + type + '; ';
        });
      });
    });
  }, 0);
}

creator({
  width: {
    property: 'width',
    blocks: [
      {
        max: 100,
        min: 1,
        step: 33.33,
        type: '%'
      },
      {
        max: 200,
        step: 5,
        type: 'px'
      }
    ]
  }
});