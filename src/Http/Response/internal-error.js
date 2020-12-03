/**
 * Send an internal error
 * @param {any} res
 */
export default (res) => {
    res.status(500)
    res.send({ error: "internal error" });
}
