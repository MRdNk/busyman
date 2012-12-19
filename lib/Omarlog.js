/*
 * Omarlog => Catalog system for managing files.
 * => Named after Omar the Cat (RIP 2010)
 * => as in Catalog
 */

var fs = require('fs');
var Stream = require('stream');

function Omarlog (directory) {
  this.baseDirectory = directory;
  this.stream = new Stream();
}

Omarlog.prototype.exists = function (filename, cb) {
  fs.exists(this.baseDirectory + filename, function (exists) {
    cb(null, exists);
  });
};

Omarlog.prototype.getFile = function (filename) {
  var that = this;

  that.stream.readable = true;

  var fileReadStream = fs.createReadStream(this.baseDirectory + filename);

  fileReadStream.write = function (buffer) {
    var s = that.stream;
    s.emit('data', buffer);
  };

  fileReadStream.end = function (buffer) {
    var s = that.stream;
    this.write(buffer);
    s.emit('end');
  };

  fileReadStream.destroy = function () {
    that.stream.writable = false;
  };

  return that.stream;

};

Omarlog.prototype.Stream = function () {
  return that.stream;
};

Omarlog.prototype.createFile = function (filename) {
  var fileWriteStream = fs.createWriteStream(this.baseDirectory + filename);
  var that = this;

  var s = that.stream;
  s.write = function (buffer) {
    fileWriteStream.emit('data', buffer);
  };
  s.end = function (buffer) {
    s.write(buffer);
    fileWriteStream.writable = false;
  };
  s.destroy = function () {
    fileWriteStream.writable = false;
  };

  s.pipe(fileWriteStream);

};
