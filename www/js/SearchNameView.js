var SearchNameView = function (service) {
    var employeeListView;
    //var phoneListView;
    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-first', findByName);
        this.$el.on('keyup', '.search-last', findByName);
        employeeListView = new EmployeeListView();
    };
    this.initialize();
    this.render = function() {
        this.$el.html(this.template());
        $('.content', this.$el).html(employeeListView.$el);
        return this;
    };
    function findByName() {
        var trimmed_first = $('.search-first').val().trim();
        var trimmed_last = $('.search-last').val().trim();
        if (!((trimmed_first.indexOf(' ') >= 0) || (trimmed_last.indexOf(' ') >= 0))) {
            if ((trimmed_first.length >= 1) || (trimmed_last.length >= 1)) {
                service.findByName(trimmed_first, trimmed_last).done(function (employees) {
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