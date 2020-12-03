//npm install express in terminal
var express = require ('express');
var app = express();

app.set('views', __dirname + '/demo/front_end');
app.engine('html', require('ejs').renderFile);

const fs = require('fs')
let rawdata = fs.readFileSync('./courses.json');
let course = JSON.parse(rawdata);

app.get('/', (req, res) => {
    res.send('<h1> rest api main page </h1>');
})

app.get('/api', (req,res) => {
    let outJSON = {
        courses : course["courses"]
    }

    res.json(outJSON);
})

app.get('/api/by_course_code/:qcode', (req,res) => {
    let query = req.params['qcode']
    filtered_courses = course["courses"].filter(q => q.course_code.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

app.get('/api/by_title/:qtitle', (req,res) => {
    let query = req.params['qtitle']
    filtered_courses = course["courses"].filter(q => q.title.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

app.get('/api/by_instructor/:qname', (req,res) => {
    let query = req.params['qname']
    filtered_courses = course["courses"].filter(q => q.instructor.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

app.get('/api/by_level/:qlevel', (req,res) => {
    let query = req.params['qlevel']
    filtered_courses = course["courses"].filter(q => q.course_level.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

app.get('/api/combined_query/:qname/:qlevel', (req,res) => {
    let qname = req.params['qname']
    let qlevel = req.params['qlevel']

    filtered_courses = course["courses"].filter( 
        q => {
            if ((q.instructor.includes(qname)) && (q.course_level.includes(qlevel))) {
                
                return true;
            }
            return false;
        }
     );

    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

app.get('/demo/index_dev', (req,res) => {
    res.render('index_dev.html')
})


app.use('/demo', express.static('front_end'));

app.listen(3000, function() {
    console.log('Server is running on port 3000');
    console.log(course);
})
