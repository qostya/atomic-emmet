function creator(options) {
  setTimeout(() => {
    let file = '';

    ['width'].forEach(prop => {
      options[prop].blocks.forEach(({max = 100, min = 0, step = 5, type = 'px'}) => {
        for (let i = 0, l = max / step; l >= i; i++) {
          let stepCount = i * step;

          if (stepCount < min) {
            continue;
          }

          file += prop + ': ' + (stepCount) + type + '; ';
        }
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