console.log("sanity check");

new Vue({
    el: "#main",
    data: {
        name: "Irn Bru",
        seen: true,
        cities: [
            {
                id: 1,
                name: "Berlin",
                country: "Germany",
            },
            {
                id: 2,
                name: "Amsterdam",
                country: "Netherland",
            },
            {
                id: 3,
                name: "Venice",
                country: "Italy",
            },
        ],
    },
    mounted: function () {
        console.log("my main vue instans has mounted!");
        //we will use axios to communicate with our server
        axios
            .get("/cities")
            .then(function (response) {
                console.log("response");
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
