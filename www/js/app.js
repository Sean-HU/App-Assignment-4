// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
    function renderHomeView() {
        $('body').html(homeTpl());
        $('.search-first').on('keyup', findByName);
        $('.search-last').on('keyup', findByName);
    }

    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    var num = 0;
    $('.search-first').on('keyup', findByName);
    $('.search-last').on('keyup', findByName);
    $('.nums').html("No employees are found");
    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        var trimmed_first = $('.search-first').val().trim();
        var trimmed_last = $('.search-last').val().trim();
        if (!((trimmed_first.indexOf(' ') >= 0) || (trimmed_last.indexOf(' ') >= 0))) {
            if ((trimmed_first.length >= 2) || (trimmed_last.length >= 2)) {
                service.findByName(trimmed_first, trimmed_last).done(function (employees) {
                    num = employees.length;
                    if (num == 1)
                        $('.nums').html(num + " employee is found");
                    else if (num > 1) 
                        $('.nums').html(num + " employees are found");
                    $('.content').html(employeeListTpl(employees));
                });
            }
            else {
                $('.nums').html("No employees are found");
                $('.content').html(null);
            }
        }
        else {
            $('.nums').html("No employees are found");
            $('.content').html(null);
        }
    }
}());