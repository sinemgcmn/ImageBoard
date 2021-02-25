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
    methods: {
        handleClick: function (city) {
            console.log("handleclick running", city);
            this.seen = !this.seen;
        },
    },
});
