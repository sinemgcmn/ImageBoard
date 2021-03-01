(function () {
    //  Almost everything you can pass to the Vue constructor you can also pass to Vue.component.
    // Two important exceptions are el and data.
    Vue.component("my-image-component", {
        template: "#my-image-template",
        data: function () {
            return {
                image: {},
            };
        },
        props: ["imageId"],
        mounted: function () {
            axios.get("/images/" + this.imageId).then((res) => {
                this.image = res.data[0];
            });
        },
        methods: {
            closeModalOnParent: function () {
                this.$emit("close");
            },
        },
    });

    new Vue({
        el: "#cards",
        data: {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            imageSelected: null,
        },

        mounted: function () {
            var vueInstanceData = this;
            axios
                .get("/images")
                .then((response) => {
                    this.images = response.data;
                })
                .catch(function (err) {
                    console.log("error in axios", err);
                });
        },
        methods: {
            selectImage: function (id) {
                this.imageSelected = id;
                console.log("user selected a image");
                console.log("mood id clicked in main vue instance:", id);
            },
            closeComponent: function () {
                this.imageSelected = null;
            },
            handleClick: function () {
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                formData.append("file", this.file);
                axios
                    .post("/upload", formData)
                    .then(function (response) {
                        // self.images.unshift(response.data.addImage);
                        console.log("response");
                        console.log("response from post req: ", response);
                    })
                    .catch(function (err) {
                        console.log("error from post req", err);
                    });
            },
            handleChange: function (e) {
                console.log("e.target.files[0]: ", e.target.files[0]);
                console.log("handle change is running!");
                this.file = e.target.files[0];
            },
        },
    });
})();
