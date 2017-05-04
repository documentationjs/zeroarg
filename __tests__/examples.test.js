var exec = require("child_process").exec;
var path = require("path");

test("add --help", done => {
  exec(
    path.join(__dirname, "..", "examples", "add.js") + " --help",
    (error, stdout, stderr) => {
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("add run", done => {
  exec(
    path.join(__dirname, "..", "examples", "add.js") + " run 1 2",
    (error, stdout, stderr) => {
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("options --help", done => {
  exec(
    path.join(__dirname, "..", "examples", "options.js") + " --help",
    (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("options run", done => {
  exec(
    path.join(__dirname, "..", "examples", "options.js") + " run 1 -b 2",
    (error, stdout, stderr) => {
      expect(stderr).toBeFalsy();
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("options bad option", done => {
  exec(
    path.join(__dirname, "..", "examples", "options.js") + " run 1 -c unknown",
    (error, stdout, stderr) => {
      expect(stderr).toBeTruthy();
      expect(stderr).toMatchSnapshot();
      done();
    }
  );
});

test("options good options", done => {
  exec(
    path.join(__dirname, "..", "examples", "options.js") +
      " run 1 -a 1 -b 2 -c waffles",
    (error, stdout, stderr) => {
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("hello --help", done => {
  exec(
    path.join(__dirname, "..", "examples", "default.js") + " run",
    (error, stdout, stderr) => {
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("hello default", done => {
  exec(
    path.join(__dirname, "..", "examples", "default.js") + " run",
    (error, stdout, stderr) => {
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});

test("hello --name", done => {
  exec(
    path.join(__dirname, "..", "examples", "default.js") + " run --name=Bill",
    (error, stdout, stderr) => {
      expect(stdout).toMatchSnapshot();
      done();
    }
  );
});
