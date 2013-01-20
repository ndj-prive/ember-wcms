define([
    "TitleTextField"
], function (TitleTextField) {
    "use strict";

    return TitleTextField.extend({
        didInsertElement : function () {
            this._super();

            var $this = this.$();

            $this.attr("readonly", "true");

            $this.datepicker({
                changeMonth : true,
                changeYear : true,
                dateFormat : "dd/mm/yy",
                firstDay : 1,
                yearRange : "-120:+0"
            });
        }
    });
});
