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
        console.log("active button is:" + activeButton.attr("id"));

    }



    
    // 确保activeButton是之前定义的并且包含激活的tab元素
    const activeButton = $('.active');
    

    const findButtons = () => {

        $("[id='tabs'], [id='tabs2'], [id='tabs3']").children().each(function() {
            $(this).on("click", onTabClick);
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

    $('#carbon-fig-button').on('click', function () {
        $("#benchmark").removeClass("visible");
        $("#analysis").addClass("visible");

        $("#carbon-tab-button").removeClass("active");
        $("#carbon-fig-button").addClass("active");
        
    });

    $('#carbon-tab-button').on('click', function () {
        $("#analysis").removeClass("visible");
        $("#benchmark").addClass("visible");

        $("#carbon-fig-button").removeClass("active");
        $("#carbon-tab-button").addClass("active");
    });

    $('#energy-fig-button').on('click', function () {
        $("#benchmark2").removeClass("visible");
        $("#analysis2").addClass("visible");

        $("#energy-tab-button").removeClass("active");
        $("#energy-fig-button").addClass("active");
        
    });

    $('#energy-tab-button').on('click', function () {
        $("#analysis2").removeClass("visible");
        $("#benchmark2").addClass("visible");

        $("#energy-fig-button").removeClass("active");
        $("#energy-tab-button").addClass("active");
    });
    
    $('#socio-fig-button').on('click', function () {
        $("#benchmark3").removeClass("visible");
        $("#analysis3").addClass("visible");

        $("#socio-tab-button").removeClass("active");
        $("#socio-fig-button").addClass("active");
        
    });

    $('#socio-tab-button').on('click', function () {
        $("#analysis3").removeClass("visible");
        $("#benchmark3").addClass("visible");

        $("#socio-fig-button").removeClass("active");
        $("#socio-tab-button").addClass("active");
    });


    const main = () => {
        findButtons();
    };


    main();
});
