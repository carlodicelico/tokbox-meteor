Tokbox for Meteor
=================

#Integrate real-time communications into your website and mobile apps using the OpenTok WebRTC API

**opentok-npm v2.5.0** **opentok.min.js v2.10.0** **opentok-layout-js v0.1.0**

##### Important Notes:

**DEPRECATION NOTICE:**
It is no longer necessary to use this package in your Meteor apps! This package simply wraps the NPM package, which [Meteor supports directly as of 1.3](https://guide.meteor.com/atmosphere-vs-npm.html). This package is up-to-date as of December 29th, 2016, but will no longer be maintained!

Starting with version 2.2.8, this package is now fully compatible with the new Meteor 0.9.x package system.

If you are updating from a previous version of this SDK, see [Important changes in v2.2](https://github.com/opentok/opentok-node#important-changes-in-v22).

Archiving, createSession, and generateToken functions have changed.

##Installation

~~~shell
meteor add carlodicelico:tokbox
~~~

##Server-side usage

### Meteor API

#### Create Tokbox Server Client

To use the Meteor API, use the `OpenTokClient` namespace.

~~~ js
var openTokClient = new OpenTokClient('key', 'secret');
~~~

#### Generate a session

This can be used directly inside meteor without the use of `fibers`
~~~ js
var options = {
    mediaMode: 'routed' //Options are 'routed' (through openTok servers) and 'relayed' (Peer to Peer)
    location: '127.0.0.1' //An IP address that the OpenTok servers will use to situate the session in the global OpenTok network.
};

var session = openTokClient.createSession(options);
~~~

#### Generate a token

~~~ js
var sessionId = 'some-session-id';
var options = {
    role: 'publisher', //The role for the token. Each role defines a set of permissions granted to the token
    data: "userId:42",
    expireTime: Math.round(new Date().getTime() / 1000) + 86400 // (24 hours) The expiration time for the token, in seconds since the UNIX epoch. The maximum expiration time is 30 days after the creation time. The default expiration time of 24 hours after the token creation time.
};

var token = openTokClient.generateToken(sessionId, options);
~~~

#### Start an archive
Clients must be actively connected to the OpenTok session for you to successfully start recording an archive.
You can only record one archive at a time for a given session. You can only record archives of sessions that uses the OpenTok Media Router; you cannot archive peer-to-peer sessions.

~~~ js
var sessionId = 'some-session-id';
var options = {
    name: 'My archive name' //This is the name of the archive. You can use this name to identify the archive.
};

var archive = openTokClient.startArchive(sessionId, options);
~~~

#### Stop an archive
Archives automatically stop recording after 90 minutes or when all clients have disconnected from the session being archived.

~~~ js
var sessionId = 'some-session-id';

var archive = openTokClient.stopArchive(sessionId);
~~~

### Low-level NPM API

If you need access to the low level [NPM module API](https://github.com/opentok/opentok-node), use the `OpenTok` namespace.
See [further documentation on the node client here](http://tokbox.com/opentok/libraries/server/node/reference/OpenTok.html).

##Client-side usage

Use of the Flash version (v1.x) of Opentok is no longer supported. The 2.2.x version of the client-side library is now bundled in this package.

The `2.2.x` release of this package includes [aullman's](https://github.com/aullman) [opentok-layout-js](https://github.com/aullman/opentok-layout-js). For more information on how to use it to lay out
your streams, [see that project's README](https://github.com/aullman/opentok-layout-js/blob/master/README.md).

If you use the browser-policy package, be sure to include a server-side rule to allow all from opentok:

```javascript
BrowserPolicy.content.allowOriginForAll("http://*.opentok.com:*");
```

### Changelog

  + Update opentok.min.js to 2.10.0
  + Update opentok-npm to 2.5.0
  + Update opentok-layout-js to 0.1.0
  + Update package to be 0.9.x compatible
  + Update opentok.min.js to v2.2.9
  + Update opentok.min.js to v2.2.8
  + Update to opentok-npm 2.2.4
  + Update opentok.min.js to v2.2.7.1
  + Update opentok.min.js to v2.2.7
  + Bundle opentok.min.js v2.2.6
  + Added [aullman's](https://github.com/aullman) [opentok-layout-js](https://github.com/aullman/opentok-layout-js)
  + Updated to opentok-npm 2.2.3
  + Updated to opentok-npm 2.2.2
  + Updated minor version number to track NPM module version number
  + Updated to opentok-npm 1.0.2
  + Removed TB.min.js to provide the option to choose between Flash & WebRTC versions
  + Added native Meteor API
  + Updated to opentok-npm 0.3.4

