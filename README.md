# data_table_assignment

# Purpose:
The goal of this program is to allow users to upload either a CSV or Excel file and display its data in a table format.

# User Interface:
Designed the interface to be simple and easy to use. Using HTML and Bootstrap, we created a layout that looks good and works well on different devices. Users can upload their file using an input field and a button. The data from the file is then displayed in a table.Also added an input field for searching, and buttons for pagination.

# File Processing:
JavaScript helps handle the file input.Used the FileReader API to read files directly in the browser, making the process faster and more convenient. The program can detect whether the file is a CSV or Excel file and uses special libraries like PapaParse and SheetJS to parse the data accurately, no matter the format.

# Data Display:
Once the file is uploaded, JavaScript creates an HTML table to show the data. It reads the file and parses the data using the appropriate libraries. The table is organized and easy to read. Pagination is included to make it easier to navigate through large datasets.

# Styling:
CSS and Bootstrap were used to make the interface look good. We chose simple designs that are easy to understand. Borders, backgrounds, and font sizes were adjusted to make the data clear and easy to read. The layout is responsive, meaning it adjusts to different screen sizes for a better user experience.
