/**
 * Main source file for LDLP Landing Page
 * Handles events such as clicks on tabs
 */

const STATE = {
    selectedTab: "test",
};

$(document).ready(function () {
    const onTabClick = (event) => {

        // const tabs = $(event.target).parents().closest('section').children();
        const tabs = $(event.target).parent().children();
        const activeButton = tabs.filter(".active");
        if ($(event.target).attr("id") === activeButton.attr("id")) {
            return;
        }

        activeButton.removeClass("active");
        $(event.target).addClass("active");

        STATE.selectedTab = $(event.target).attr("id");

        setActiveSlide(`${activeButton.attr("id")}-slide`, `${$(event.target).attr("id")}-slide`);
        // console.log("active button is:" + activeButton.attr("id"));

    }

    const onTableTabClick = (event) => {

        // const tabs = $(event.target).parents().closest('section').children();
        const tabs = $(event.target).parent().children();
        const activeButton = tabs.filter(".active");
        if ($(event.target).attr("id") === activeButton.attr("id")) {
            return;
        }

        activeButton.removeClass("active");
        $(event.target).addClass("active");

        STATE.selectedTab = $(event.target).attr("id");

        setActiveSlide(`${activeButton.attr("id")}-slide`, `${$(event.target).attr("id")}-slide`);
        // console.log("active button is:" + activeButton.attr("id"));

        

    }


    
    // 确保activeButton是之前定义的并且包含激活的tab元素
    const activeButton = $('.active');
    

    const findButtons = () => {

        $("[id='tabs'], [id='tabs2']").children().each(function() {
            $(this).on("click", onTabClick);
        });

        $("#tabs3").children().each(function() {
            $(this).on("click", onTableTabClick);
        });

        
        
    };

    const setActiveSlide = (previous, current) => {
        // const previousSlide = $("#slides-container").children().filter(`#${previous}`);
        // const currentSlide = $("#slides-container").children().filter(`#${current}`);


        const previousSlide = $(`#${previous}`);
        const currentSlide = $(`#${current}`);

        previousSlide.removeClass("visible");
        currentSlide.addClass("visible");
    };

    $('#analysis-button').on('click', function () {
        $("#benchmark").removeClass("visible");
        $("#analysis").addClass("visible");

        $("#benchmark-button").removeClass("active");
        $("#analysis-button").addClass("active");
        
    });

    $('#benchmark-button').on('click', function () {
        $("#analysis").removeClass("visible");
        $("#benchmark").addClass("visible");

        $("#analysis-button").removeClass("active");
        $("#benchmark-button").addClass("active");
    });


    const main = () => {
        findButtons();
    };


    main();
});
