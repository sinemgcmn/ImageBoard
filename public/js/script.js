console.log("sanity check");

new Vue({
    el: "#cards",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null,
    },
    mounted: function () {
        // console.log('my main vue instance has mounted!');
        // we will use axios to communicate with our server
        // console.log('this.cities: ', this.cities);
        // console.log('this: ', this);
        var self = this;
        axios
            .get("/images")
            .then(function (response) {
                // console.log("this.cities after axios: ", this.cities);
                // console.log('this after axios: ',this);
                // console.log('response', response.data);
                // console.log('self: ',self);
                self.images = response.data;
            })
            .catch(function (err) {
                console.log("error in axios", err);
            });
    },
    methods: {
        handleClick: function () {
            // e.preventDefault()
            var formData = new FormData();
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);
            // console.log("this.title: ", this.title);
            // console.log("this.description: ", this.description);
            // console.log("this.username: ", this.username);
            // console.log("this.file: ", this.file);
            axios
                .post("/upload", formData)
                .then(function (response) {
                    // self.images.unshift(response.data.addImage);
                    console.log("response alindi");
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
