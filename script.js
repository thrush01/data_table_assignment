$(document).ready(function () {
    // Variables to keep track of pagination
    $('.pagination-buttons').hide();
    $('.search').hide();
    let currentPage = 1;
    const rowsPerPage = 10;

 

    // Call createTable function to create the table dynamically
    createTable();

    // On click event for button
    $('#file-upload-label').on('click', function () {
        $('.card').hide();
        $('.pagination-buttons').show();
        $('#page').text(currentPage);
        $('.search').show();
        // Input value
        let fileInput = $('#file-upload-input')[0].files[0];

        // Checking if the input is not empty
        if (fileInput) {
            // Getting file name and extension
            let fileName = fileInput.name;

            // Checking if the file is CSV or Excel
            if (fileName.endsWith('.csv')) {
                Papa.parse(fileInput, {
                    complete: function (results) {
                        csv_data(results.data);
                    },
                    header: true
                });
            } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    // Reading data as an array buffer
                    let data = new Uint8Array(event.target.result);
                    let data_book = XLSX.read(data, { type: 'array' });
                    let sheet = data_book.Sheets[data_book.SheetNames[0]];
                    let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    excel_data(jsonData);
                };
                // Reading the data and converting to array buffer
                reader.readAsArrayBuffer(fileInput);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File Type',
                    text: 'Please upload a CSV or Excel file.'
                });
            }
        } else {
            console.log("No file selected.");
            $('.pagination-buttons').hide();
            $('.search').hide();
        }
    });
// Function for handling CSV files
    function csv_data(data) {
        let tableHeaderRow = $('.table-header-row');
        let tableBody = $('.table-body');
        tableHeaderRow.empty();
        tableBody.empty();
        // Getting the first row and creating a header
        Object.keys(data[0]).forEach(header => {
            // Appending the results to the HTML table element
            tableHeaderRow.append(`<th>${header}</th>`);
        });
        // Looping through the data and appending the results to the HTML table element
        paginating_data(data).forEach(row => {
            let rowHtml = '<tr>';
            Object.values(row).forEach(cell => {
                rowHtml += `<td>${cell}</td>`;
            });
            rowHtml += '</tr>';
            tableBody.append(rowHtml);
        });
    }

    // Function for handling Excel files
    function excel_data(data) {
        let tableHeaderRow = $('.table-header-row');
        let tableBody = $('.table-body');
        tableHeaderRow.empty();
        tableBody.empty();

        data[0].forEach(header => {
            tableHeaderRow.append(`<th>${header}</th>`);
        });
        console.log('test: ',data[0])
        paginating_data(data).forEach(row =>{
            if(row !== data[0]){
                let rowHtml = '<tr>';
            row.forEach(cell => {
                rowHtml += `<td>${cell}</td>`;
            });
            rowHtml += '</tr>';
            tableBody.append(rowHtml);
            }
            
        });
    }

    // Function to search the table
    function searchTable() {
        let searchText = $('#rowSearch').val().toLowerCase();
        $('.table-body tr').each(function () {
            let rowData = $(this).text().toLowerCase();
            if (rowData.indexOf(searchText) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }

       // Function to handle pagination
       function paginating_data(data) {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, data.length); // Ensure endIndex doesn't exceed data length
        return data.slice(startIndex, endIndex);
    }

    // Function to create the table dynamically
    function createTable() {
        let tableDiv = $('#table');
        let table = $('<table>').addClass('data-table table-responsive ');
        let tableHeader = $('<thead>');
        let tableHeaderRow = $('<tr>').addClass('table-header-row');
        let tableBody = $('<tbody>').addClass('table-body justify-content-between');
        // Append table header row to table header
        tableHeader.append(tableHeaderRow);
        // Append table header to table
        table.append(tableHeader);
        // Append table body to table
        table.append(tableBody);
        // Append table to tableDiv
        tableDiv.append(table);
    }

    // Event listener for the search input
    $('#rowSearch').on('input', function () {
        searchTable();
    });

    // Next and Previous button click events
    $('#next-btn, #prev-btn').on('click', function () {
        if ($(this).attr('id') === 'next-btn') {
            currentPage++;
        } else {
            if (currentPage > 1) {
                currentPage--;
            }
        }
        $('#file-upload-label').click(); // Trigger file upload label click to reload data with new page
    });
});
