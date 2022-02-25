// Call the dataTables jQuery plugin
$(document).ready(function() {
  $(".dils-table").DataTable(
    {
      searching: false,
      "lengthChange": false,
      "paging": true
      
    }
  );
});
