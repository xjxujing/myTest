$(".navbar a").on("click", function (e) {
    e.preventDefault();
    console.log(this.hash);
    const hash = this.hash;

    $("html,body").animate({
        scrollTop: $(hash).offset().top,
    }, 800);
})