$(document).ready(function() {

    // Variables to keep track of pagination
    let currentPage = 1;
    const rowsPerPage = 11;

    // Function to handle pagination
    function paginateData(data) {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return data.slice(startIndex, endIndex);
    }

    // On click event for button
    $('#file-upload-label').on('click', function() {
        $('.card').hide();
        // Input value
        let fileInput = $('#file-upload-input')[0].files[0];

        // Checking if the input is not empty
        console.log(fileInput);
        if (fileInput) {
            // Getting file name and extension
            let fileName = fileInput.name;

            // Checking if the file is CSV or Excel
            if (fileName.endsWith('.csv')) {

                Papa.parse(fileInput, {
                    complete: function(results) {
                        csv_data(results.data);
                    },
                    header: true
                });

            } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {

                let reader = new FileReader();
                reader.onload = function(event) {
                    // Reading data as an array
                    let data = new Uint8Array(event.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    let sheet = workbook.Sheets[workbook.SheetNames[0]];
                    let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    excel_data(jsonData);
                };
                // Reading the data and converting to array
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
        paginateData(data).forEach(row => {
            let rowHtml = '<tr>';
            Object.values(row).forEach(cell => {
                rowHtml += `<td>${cell}</td>`;
            });
            rowHtml += '</tr>';
            tableBody.append(rowHtml);
        });

        // Initializing DataTable with pagination
        $('.data-table').DataTable({
            paging: true,
            pageLength: rowsPerPage
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
        paginateData(data).forEach(row => {
            let rowHtml = '<tr>';
            row.forEach(cell => {
                rowHtml += `<td>${cell}</td>`;
            });
            rowHtml += '</tr>';
            tableBody.append(rowHtml);
        });

        // Initializing DataTable with pagination
        $('.data-table').DataTable({
            paging: true,
            pageLength: rowsPerPage
        });
    }

    // Next button click event
    $('#next-btn').on('click', function() {
        currentPage++;
        // Reload data with new page
        $('#file-upload-label').click();
    });

    // Previous button click event
    $('#prev-btn').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            // Reload data with new page
            $('#file-upload-label').click();
        }
    });

});