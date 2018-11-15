/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

class ShoppingView {

    generate_page_data(jobs_json) {

        var title = document.querySelector('#page_title');
        //Could mention location later
        title.innerHTML = "Government Jobs in " + localStorage.getItem('state');

        for (var job of jobs_json) {
            this.addRow(job);
        }

    }

    //The row is ordered as follows: 
    //Position title, Organization name, Salary Info (if exists), Start Date, End Date, Locations
    addRow(job) {
        let my_table = document.querySelector('#results_body');

        let row = document.createElement('tr');

        // Creates the position title cell and appends it to the row
        let cell = document.createElement('td');
        cell.innerHTML = job.position_title;
        row.appendChild(cell);

        // Creates the organization name cell and appends it to the row
        cell = document.createElement('td');
        cell.innerHTML = job.organization_name;
        row.appendChild(cell);

        // Checks if salary information exists for the position. If it does, creates the salary cells and appends it to the row
        if (job.minimum > 0) {
            cell = document.createElement('td');
            var salaryString = "$" + job.minimum + "-" + job.maximum;
            if (job.maximum < 100) {
                salaryString = salaryString + " per hour";
            }
            cell.innerHTML = salaryString;
            row.appendChild(cell);
        } else {
            cell = document.createElement('td');
            cell.innerHTML = "";
            row.appendChild(cell);
        }

        // Creates the start date cell and appends it to the row
        cell = document.createElement('td');
        cell.innerHTML = job.start_date;
        row.appendChild(cell);

        // Creates the end date cell and appends it to the row
        cell = document.createElement('td');
        cell.innerHTML = job.end_date;
        row.appendChild(cell);

        // Creates the locations cell and appends it to the row
        cell = document.createElement('td');
        var locationString = "";
        for (var location of job.locations) {
            locationString = locationString + location + "<br />";
        }
        cell.innerHTML = locationString;
        row.appendChild(cell);

        // Adds the row to the bottom of the table.
        my_table.appendChild(row);

    }

}