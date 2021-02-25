console.log("sanity check");

new Vue({
    el: "#main",
    data: {
        name: "Irn Bru",
        seen: true,
        cities: [],
    },
    mounted: function () {
        console.log("my main vue instans has mounted!");
        //we will use axios to communicate with our server
        axios
            .get("/cities")
            .then(function (response) {
                console.log(response.data);
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
