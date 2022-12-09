module.exports = {
    apps : [],
    // Deployment Configuration
    deploy : {
      production : {
         "user" : "root",
         "host" : ["my-remote-server.xyz", "...",],
         "ref"  : "origin/main",
         "repo" : "git@github.com:username/repository.git",
         "path" : "/var/www/my-repository",
         "post-setup" : "npm install"
      }
    }
  };