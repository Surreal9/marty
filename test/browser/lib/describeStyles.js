function describeStyles(description, cb, options = {}) {
  if (options.only) {
    describe.only(description, classicAndClass);
  } else if (options.skip) {
    describe.skip(description, classicAndClass);
  } else {
    classicAndClass();
  }

  function classicAndClass() {
    describe(description + ' (Classic)', function () {
      this.style = 'classic';
      this.factory = factory(this.style);
      cb.call(this);
    });

    describe(description + ' (ES6)', function () {
      this.style = 'es6';
      this.factory = factory(this.style);
      cb.call(this);
    });
  }

  function factory(type) {
    return function (options, context) {
      if (!options[type]) {
        throw new Error('Have not implemented factory for ' + type);
      }

      return options[type].call(context);
    };
  }
}

describeStyles.only = function (description, cb) {
  describeStyles(description, cb, {
    only: true
  });
};

describeStyles.skip = function (description, cb) {
  describeStyles(description, cb, {
    skip: true
  });
};

module.exports = describeStyles;