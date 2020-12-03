var updateView = async (button) => {
    if (button.dataset.querytype == "by_instructor") {
        let queryvalue = document.querySelector('#nameQuery').value; 
        api = `http://127.0.0.1:3000/api/by_instructor/${queryvalue}`;

    } else if (button.dataset.querytype == "by_title") {
        let queryvalue = document.querySelector('#titleQuery').value; 
        api = `http://127.0.0.1:3000/api/by_title/${queryvalue}`;

    }  else if (button.dataset.querytype == "by_level") {
        let queryvalue = document.querySelector('#levelQuery').value; 
        api = `http://127.0.0.1:3000/api/by_level/${queryvalue}`;
    }  
     if (button.dataset.querytype == "combined_query") {
        let queryvalue1 = document.querySelector('#instructorQuery').value;
        let queryvalue2 = document.querySelector('#levelQuery').value;
        api = `http://127.0.0.1:3000/api/combined_query/${queryvalue1}/${queryvalue2}`;
    }

    const data = await fetch (api)
    const model = await data.json();
    render_view(model)
}

var render_view = (model) => {
    var source = document.querySelector('#show_results_view').innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model);

    document.querySelector("#results").innerHTML = html;
}