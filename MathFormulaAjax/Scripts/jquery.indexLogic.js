/**
 * Copyright (c) 2018 Kamil Ushurbakiyev
 **/

(function ($) {
    var selectionStart = -1;
    var selectionEnd = -1;
    var secondClick = true;
    var selectorType = 1;

    $(document).ready(function () {

        $("#IV").click(function () {
            getValueByIdFromServer($(this));
        });
        $("#R").click(function () {
            getValueByIdFromServer($(this));
        });
        $("#MF").click(function () {
            getValueByIdFromServer($(this));
        });

        $("#input").click(function () {
            selectionStart = this.selectionStart;
            selectionEnd = this.selectionEnd;

            console.log("click selectionStart: " + selectionStart);
            console.log("click selectionEnd: " + selectionEnd);
        }).change(function () {
            selectionStart = this.selectionStart;
            selectionEnd = this.selectionEnd;

            console.log("click selectionStart: " + selectionStart);
            console.log("click selectionEnd: " + selectionEnd);
        });

        $("#btnToggleSelectorType").click(function () {
            toggleSelectorType($(this), [$("#IV"), $("#R"), $("#MF")]);
        });

    });

    function toggleSelectorType(button, selectors) {

        var size;
        if (selectorType === 1) { selectorType++; size = 10; }
        else if (selectorType === 2) { selectorType--; size = 0; }

        toggleButtonName(button, "списки", "выпадашки");

        $.each(selectors, function (index, element) {
            element.attr("size", size);
        });
    }

    function toggleButtonName(button, optionOne, optionTwo) {
        button.text() === optionOne ? button.text(optionTwo) : button.text(optionOne);
    }

    function isSecondClick() {
        return secondClick = !secondClick;
    }

    function getValueByIdFromServer(element) {

        if (selectorType === 1 && !isSecondClick()) return;

        var type = element.attr("id");
        var id = element.children("option").filter(":selected").val();

        $.ajax({
            url: "/Home/GetValueById",
            data: { "Type": type, "Id": id },
            method: "POST",
            success: function (response) { applyTextToInput(response); }
        });
    }

    function applyTextToInput(text) {

        var input = $("#input");

        if (selectionStart > -1) {
            text = input.val().substring(0, selectionStart) +
                text +
                input.val().substring(selectionEnd);
        }

        input.empty();
        input.val(text);
    }
}(jQuery));