(function () {
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

    Vue.component("my-comment-component", {
        template: "#my-comment-template",
        data: function () {
            return {
                comments: [],
                username: "",
                comment: "",
            };
        },
        props: ["imageId"],
        mounted: function () {
            var vueComponentData = this;
            // console.log(this);
            axios.get("/get-comments/" + this.imageId).then((res) => {
                console.log(res.data);
                vueComponentData.comments = res.data;
                console.log(res.data);
            });
        },
        methods: {
            writeComment: function () {
                var vueComponentData = this;
                console.log(this);
                var data = {
                    comment: this.comment,
                    username: this.username,
                    imageId: this.imageId,
                };
                axios
                    .post("/comment", data)
                    .then(function (res) {
                        vueComponentData.comments.unshift(res.data);
                        console.log(res.data);
                    })
                    .catch(function (err) {
                        console.log("error from post req", err);
                    });
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
            // var vueInstanceData = this;
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
                // console.log("user selected a image");
                // console.log("mood id clicked in main vue instance:", id);
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
            getFurtherImages: function () {
                // console.log("upload more");
                const lowestId = this.images[this.images.length - 1].id;
                // console.log(lowestId);
                var vueInstanceData = this;
                // console.log(vueInstanceData);
                axios
                    .get("/more/" + lowestId)
                    .then(function (res) {
                        // console.log("res", res.data);
                        // console.log("vueInstanceData: ", vueInstanceData);
                        var furtherDataFromImages = [
                            ...vueInstanceData.images,
                            ...res.data,
                        ];

                        vueInstanceData.images = furtherDataFromImages;
                        // console.log(furtherDataFromImages);
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
