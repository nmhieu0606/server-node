var acl = require('acl');
acl = new acl(new acl.memoryBackend(), {
    debug: (msg) => {
      console.log('-DEBUG-', msg);
    }
});
