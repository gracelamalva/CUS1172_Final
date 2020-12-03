const express = require('express')
const router = express.Router();

const fs = require('fs')
let rawdata = fs.readFileSync('./courses.json');
let course = JSON.parse(rawdata);

router.get('/', (req, res) => {
    res.send('<h1> rest api main page </h1>');
})

router.get('/api', (req,res) => {
    let outJSON = {
        courses : course["courses"]
    }

    res.json(outJSON);
})

router.get('/by_course_code/:qcode', (req,res) => {
    let query = req.params['qcode']
    filtered_courses = course["courses"].filter(q => q.course_code.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

router.get('/by_title/:qtitle', (req,res) => {
    let query = req.params['qtitle']
    filtered_courses = course["courses"].filter(q => q.title.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

router.get('/by_instructor/:qname', (req,res) => {
    let query = req.params['qname']
    filtered_courses = course["courses"].filter(q => q.instructor.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

router.get('/by_level/:qlevel', (req,res) => {
    let query = req.params['qlevel']
    filtered_courses = course["courses"].filter(q => q.course_level.includes(query) )
    let outJSON = {
        courses: filtered_courses
    }

    res.json(outJSON);
})

router.get('/combined_query/:qname/:qlevel', (req,res) => {
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

router.get('/demo/index_dev', (req,res) => {
    res.render('index_dev.html')
})

module.exports = router;

