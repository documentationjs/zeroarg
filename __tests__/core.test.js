var core = require("../core");

test("core", () =>
  core(() => {
    /**
     * Add two
     */
    function add(a, b) {
      return a + b;
    }
  }).then(yargsConfig => {
    expect(yargsConfig).toMatchSnapshot();
  }));

test("string types", () =>
  core(() => {
    /**
     * Add two
     * @param {string} a
     * @param {string} b
     */
    function add(a, b) {
      return a + b;
    }
  }).then(yargsConfig => {
    expect(yargsConfig).toMatchSnapshot();
  }));

test("non-nullable types", () =>
  core(() => {
    /**
     * Add two
     * @param {string!} a
     * @param {string!} b
     */
    function add(a, b) {
      return a + b;
    }
  }).then(yargsConfig => {
    expect(yargsConfig).toMatchSnapshot();
  }));

test("options", () =>
  core(() => {
    /**
     * Add two
     * @param {string!} a
     * @param {string!} b
     * @param {Object} options
     * @param {string} options.how
     */
    function add(a, b, { how }) {
      return a + b;
    }
  }).then(yargsConfig => {
    expect(yargsConfig).toMatchSnapshot();
  }));

test("options with choices", () =>
  core(() => {
    /**
     * Add two
     * @param {string!} a
     * @param {string!} b
     * @param {Object} options
     * @param {add|divide|multiply} options.how
     */
    function add(a, b, { how }) {
      return a + b;
    }
  }).then(yargsConfig => {
    expect(yargsConfig).toMatchSnapshot();
  }));

test("fail with option in middle", () =>
  core(() => {
    /**
     * Add two
     * @param {string!} a
     * @param {Object} options
     * @param {add|divide|multiply} options.how
     * @param {string!} b
     */
    function add(a, b, { how }) {
      return a + b;
    }
  }).catch(err => {
    expect(err).toMatchSnapshot();
  }));

test("variadic in middle", () =>
  core(() => {
    /**
     * Add two
     * @param {string!} a
     * @param {Array<string>} b
     * @param {string!} c
     */
    function add(a, b, c) {
      return a + b;
    }
  }).catch(err => {
    expect(err).toMatchSnapshot();
  }));
