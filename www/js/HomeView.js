var HomeView = function (service) {
    var employeeListView;
    //var phoneListView;
    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-key', findByName);
        employeeListView = new EmployeeListView();
        //phoneListView = new PhoneListView();
    };
    this.initialize();
    this.render = function() {
        this.$el.html(this.template());
        $('.content', this.$el).html(employeeListView.$el);
       // $('.content', this.$el).html(phoneListView.$el);
        return this;
    };
    function findByName() {
        service.findByName($('.search-key').val()).done(function(employees) {
            employeeListView.setEmployees(employees);
            //phoneListView.setEmployees(employees);
        });
    };
}