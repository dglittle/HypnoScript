
require('fibers')

Fiber(function () {        
    fs = require('fs')
    url = require('url')
    querystring = require('querystring')
    exec = require('child_process').exec
    crypto = require('crypto')
    http = require('http')
    require('./myutil')
    require('./nodeutil')
    
    var s = "" + fs.readFileSync(process.argv[2])
    
    function wait(t) {
        var p = promise()
        setTimeout(function () {
            p.set()
        }, t * 1000)
        p.get()
    }
    
    function say(s) {
        var cmd = "say " + json(s)
        console.log(cmd)
        var p = promise()
        exec(cmd, function () {
            p.set()
        })
        p.get()
    }
    
    var defaultWait = 1
    
    foreach(lines(s), function (s) {
        if (s) {
            if (s.match(/^\/\//)) {
                //
            } else if (s.match(/^>/)) {
                eval(s.slice(1))
            } else {
                say(s)
                wait(defaultWait)
            }
        }
    })
    
}).run()

