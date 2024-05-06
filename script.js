document.addEventListener('DOMContentLoaded', function() {
    // Get the file input element
    let fileInput = $('#file-upload-input');
    let upload=$('#file-upload-label')

    upload.on('click',function(){

        let file = fileInput[0].files[0];
        let fileName = file.name;
        if(file) {
            // Do something with the file, like reading its contents or processing it.
            if(fileName.endsWith('.csv') || fileName.endsWith('.xls')){
                let reader = new FileReader();
                reader.onload = function(event) {
                    let csvData = event.target.result;
                    // Parse CSV data
                    let rows = csvData.split('\n');
                    let tableHeaderRow = $('.table-header-row');
                    let tableBody = $('.table-body');
                    
                    // Clear previous data
                
                    // Add headers
                    let headers = rows[0].split(',');
                    headers.forEach(header => {
                        tableHeaderRow.append(`<th>${header}</th>`);
                    });

                    // Add rows
                    for (let i = 1; i < rows.length; i++) {
                        let cells = rows[i].split(',');
                        let rowHtml = '<tr>';
                        cells.forEach(cell => {
                            rowHtml += `<td>${cell}</td>`;
                        });
                        rowHtml += '</tr>';
                        tableBody.append(rowHtml);
                    }
                };

                // Read the file as text
                reader.readAsText(file);
            } else {
                // Invalid file type
                alert('Please upload a CSV or Excel file.');
            }
        } else {
            // No file selected
            console.log("No file selected.");
        }
    });
});
