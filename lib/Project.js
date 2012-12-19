var Installation = require('./installation.js');

function Application () {
  this.name = null;
  this.version = null;
  this.developer = null;
  this.github = null;

  this.installations = [];

  return this;
}

Application.prototype.setName = function (name, cb) {
  this.name = name;
  cb(null, true);
};

Application.prototype.setVersion = function (version, cb) {

  var versionArray = version.split('.');
  for(var i; i<versionArray; i++) {
    var intVal = parseInt(versionArray[i],10);
    if(intVal !== versionArray[i]) {
      cb('version not contains a non-integer value');
    }
  }

  this.version = version;
  cb(null, true);

};

Application.prototype.setDeveloper = function (developer, cb) {
  this.developer = developer;
  cb(null, true);
};

Application.prototype.setGithub = function (github, cb) {
  this.github = github;
  cb(null, true);
};

Application.prototype.addInstallation = function (installation, cb) {
  if (!(installation instanceof Installation)) {
    cb('installation is not an instanceof Installation');
  } else {
    this.installations.push (installation);
    cb(null, true);
  }
};

