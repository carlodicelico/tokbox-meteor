OpenTok = Npm.require('opentok');
var Future = Npm.require('fibers/future');

OpenTokClient = function OpenTokClient(key, secret) {
  this._client = new OpenTok.OpenTokSDK(key, secret);
};

OpenTokClient.roles = OpenTok.RoleConstants;

OpenTokClient.prototype.createSession = function(location, options) {
  var self = this;
  location = location || '127.0.0.1';
  options = options || {};
  var sessionId = sync(function(done) {
    self._client.createSession(location, options, function(result) {
      done(null, result);
    });
  });

  return sessionId;
};

OpenTokClient.prototype.generateToken = function(sessionId, role, params) {
  params = _.clone(params) || {};
  params.session_id = sessionId;
  params.role = role;

  return this._client.generateToken(params);
};

OpenTokClient.prototype.getArchiveManifest = function(archiveId, token) {
  var self = this;
  var manifest = sync(function(done) {
    self._client.getArchiveManifest(archiveId, token, function(result) {
      done(null, result);
    })
  });

  return manifest;
};

function sync(asynFunction) {
  var future = new Future();
  var sent = false;
  var payload;

  setTimeout(function() {
    asynFunction(done);
    function done(err, result) {
      if(!sent) {
        payload = {
          result: result,
          error: err
        };

        if(future.ret) {
          //for 0.6.4.1 and older
          future.ret();
        } else {
          //for 0.6.5 and newer
          future.return();
        }
      }
    }
  }, 0);

  future.wait();
  sent = true;
  
  if(payload.error) {
    throw new Meteor.Error(500, payload.error.message);
  } else {
    return payload.result;
  }
};