export function sumPrice(items){
    return items.reduce((acc, cur) => {
        return acc + (cur.price * cur.qty)
    }, 0);
}