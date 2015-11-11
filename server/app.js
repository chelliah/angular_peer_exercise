/**
 * Created by aronthomas on 11/11/15.
 */
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/angular_peer_challenge';

app.set('port', process.env.PORT || '5000');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

app.get('/data', function(req,res){
    var results = [];

    pg.connect(connectionString, function(err,client){
        var query = client.query('SELECT * FROM people');

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if (err){
            console.log(err);
        }
    });
});

app.post('/data', function(req,res){
   console.log(req.body);
    var addedPerson = {
        name: req.body.name,
        number: req.body.number,
        location: req.body.location
    };

    pg.connect(connectionString,function(err,client){
        client.query("INSERT INTO people (name, number, location) VALUES ($1,$2,$3) RETURNING id",
            [addedPerson.name,addedPerson.number,addedPerson.location],
            function(err,result){
                if(err){
                    console.log(err);
                    res.send(false);
                }
                res.send(true);
            });
    })

});

app.delete('/data',function(req,res){
    console.log(req.query);
    var deletedID = req.query.id;
    pg.connect(connectionString,function(err,client){
        client.query('DELETE FROM people WHERE id=$1', [deletedID], function(err,result){
            if(err){
                console.log(err);
                res.send(false);
            }
            res.send(true);
        })
    })
});


app.get('/*', function(req,res){
        var file = req.params[0] || 'assets/views/index.html';
        res.sendFile(path.join(__dirname,'./public/',file));
    });

app.listen(app.get('port'), function(){
    console.log('listening on port ', app.get('port'));
});