export function sortByName(data) {
    data.sort((a, b) => {
        a = a.name.split(" ").pop();
        b = b.name.split(" ").pop();
        return new Number(a) - new Number(b);
    })
};