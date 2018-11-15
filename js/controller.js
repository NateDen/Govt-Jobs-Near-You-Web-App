/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

var view = new ShoppingView();

function getIP() {
    $.getJSON("http://ip-api.com/json", function (ip_api_response) {
        var ip = ip_api_response;
        var zip_code = ip.zip;
        window.localStorage.setItem('zip_code', zip_code);
    });
}

function getState() {
    var zip_code_lookup_api = 'http://geocoder.ca/?postal=' + (localStorage.getItem('zip_code')) + '&json=1'
    $.getJSON(zip_code_lookup_api, function (zip_code_lookup_api_response) {
        var lookup_response = zip_code_lookup_api_response;
        var state = zip_code_lookup_api_response.standard['prov'];
        window.localStorage.setItem('state', state);
    });
}


async function getData(url) {
    return fetch(url)
        .then(response => response.json())
        // .then(json => console.log(json))
        .catch(error => console.log(error));
}

function getJobsByLocation(location) {
    var jobs_dict;

    $.getJSON('https://jobs.search.gov/jobs/search.json?query=jobs+in+' + location, function (jobs_json) {
        window.localStorage.setItem('jobs', JSON.stringify(jobs_json));
    });

}

function pageLoad() {
    getIP();
    getState();
    var location = localStorage.getItem('state');

    getJobsByLocation(location);

    var jobs_string = localStorage.getItem('jobs');
    var jobs_object = JSON.parse(jobs_string);

    view.generate_page_data(jobs_object);
}
