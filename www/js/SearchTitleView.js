var SearchTitleView = function (service) {
    var employeeListView;
    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-department', findByTitle);
        this.$el.on('keyup', '.search-title', findByTitle);
        employeeListView = new EmployeeListView();
    };
    this.initialize();
    this.render = function () {
        this.$el.html(this.template());
        $('.content', this.$el).html(employeeListView.$el);
        return this;
    };
    function findByTitle() {
        var trimmed_first = $('.search-department').val().trim();
        var trimmed_last = $('.search-title').val().trim();
        if (!((trimmed_first.indexOf(' ') >= 0) )) {
            if ((trimmed_first.length >= 1) || (trimmed_last.length >= 1)) {
                service.findByTitle(trimmed_first, trimmed_last).done(function (employees) {
                    employeeListView.setEmployees(employees);
                });
            }
            else {
                employeeListView.setEmployees(null);
            }
        }
        else {
            employeeListView.setEmployees(null);
        }
    }
}