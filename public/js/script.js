console.log("sanity check");

new Vue({
    el: "#cards",
    data: {
        images: [],
        // title: "",
        // description: "",
        // username: "",
        // file: null,
    },
    mounted: function () {
        var self = this;
        axios
            .get("/images")
            .then(function (response) {
                self.images = response.data;
            })
            .catch(function (err) {
                console.log("error in axios", err);
            });
    },
    // methods: {
    //     handleClick: function () {
    //         console.log("this.title:", this.title);
    //         console.log("this.desciption:", this.desciption);
    //     },
    //     handleChange: function (e) {
    //         console.log("e.target.files[0]:", e.target.files);
    //         console.log("e.target.files[0]:", e.target.files);
    //     },
    // },
});
