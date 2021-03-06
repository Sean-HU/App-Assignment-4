// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    $('.search-first').on('keyup', findByName);
    $('.search-last').on('keyup', findByName);

    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        var trimmed_first = ($('.search-first').val()).trim();
        var trimmed_last = ($('.search-last').val()).trim();
        var IsLetters = false;
       // if ((Pattern.matches("[a-z]+", trimmed_first)) || (Pattern.matches("[a-z]+", trimmed_last))) {
            if (!((trimmed_first.indexOf(' ') >= 0) || (trimmed_last.indexOf(' ') >= 0))) {
                if ((trimmed_first.length >= 2) || (trimmed_last.length >= 2)) {
                    service.findByName($('.search-first').val(), $('.search-last').val()).done(function (employees) {
                        var l = employees.length;
                        var e;
                        $('.employee-list').empty();
                        for (var i = 0; i < l; i++) {
                            e = employees[i];
                            $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
                        }
                        if (($('.search-first').val().length == 0) && ($('.search-last').val().length == 0)) {
                            $('.employee-list').empty();
                        }
                    });
               // }
            }
        }
    }

}());