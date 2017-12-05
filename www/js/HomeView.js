var HomeView = function (service) {
    var searchNameView;
    var searchTitleView;
    this.initialize = function () {
        this.$el = $('<div/>');
        this.$el.on('click', '.search-name-btn', this.searchName);
        this.$el.on('click', '.search-title-btn', this.searchTitle);
        searchNameView = new SearchNameView;
        searchTitleView = new SearchTitleView;
    };
    this.render = function () {
        this.$el.html(this.template());
        return this;
    };
    this.searchName = function (event) {
        //searchNameView.render();
        $('body').html(new SearchNameView(service).render().$el);
    };
    this.searchTitle = function (event) {
        //searchNameView.render();
        $('body').html(new SearchTitleView(service).render().$el);
    };
    this.initialize();
}