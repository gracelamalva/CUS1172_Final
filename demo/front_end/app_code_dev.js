var updateView = async (button) => {
    if (button.dataset.querytype == "by_instructor") {
        let queryvalue = document.querySelector('#nameQuery').value; 
        api = `api/by_instructor/${queryvalue}`;

    } else if (button.dataset.querytype == "by_course_code") {
        let queryvalue = document.querySelector('#numberQuery').value;
        api = `api/by_course_code/${queryvalue}`;
    } 
     else if (button.dataset.querytype == "by_title") {
        let queryvalue = document.querySelector('#titleQuery').value; 
        api = `api/by_title/${queryvalue}`;

    }  else if (button.dataset.querytype == "by_level") {
        let queryvalue = document.querySelector('#levelQuery').value; 
        api = `api/by_level/${queryvalue}`;
    }  
     else  if (button.dataset.querytype == "combined_query") {
        let queryvalue1 = document.querySelector('#instructorQuery').value;
        let queryvalue2 = document.querySelector('#combined_levelQuery').value;
        console.log(queryvalue1,queryvalue2);
        api = `api/combined_query/${queryvalue1}/${queryvalue2}`;
    }

    const data = await fetch(api);
    const model = await data.json();
    render_view(model);
}

var render_view = (model) => {
    var source = document.querySelector('#show_results_view').innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model);

    document.querySelector("#results").innerHTML = html;
}