console.log("sanity check");

new Vue({
    el: "#main",
    data: {
        name: "Irn Bru",
        seen: true,
        cities: [],
    },
    mounted: function () {
        console.log("my main vue instance has mounted!");
        // we will use axios to communicate with our server
        console.log("this.cities: ", this.cities);
        console.log("this: ", this);
        var self = this;
        axios
            .get("/cities")
            .then(function (response) {
                console.log("this.cities after axios: ", this.cities);
                console.log("this after axios: ", this);
                console.log("response", response.data);
                console.log("self: ", self);
                self.cities = response.data;
            })
            .catch(function (err) {
                console.log("error in axios", err);
            });
    },
    methods: {
        handleClick: function (city) {
            console.log("handleclick running", city);
            this.seen = !this.seen;
        },
    },
});
