$("#addbz").kendoButton({
    icon: "add",
});

addbz = $("#addbzwindow").kendoWindow({
    width: "500px",
    title: "Создать базу знаний",
    content: "/tpl/add_bz.html",
    visible: false,
    // draggable: false,
    modal: true,
    pinned: false,
    resizable: false,
    // position: {
    //     top: 100,
    //     left: 100
    // },
}).data("kendoWindow");

$("#addbz").click(function() {
    addbz.center().open();
    // setTimeout(() => {
    //     $("#namebaza")[0].focus();
    // }, 400);

})