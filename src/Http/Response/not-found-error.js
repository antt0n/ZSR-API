/**
 * Send a not found error
 * @param {any} res
 */
export default (res) => {
    res.status(404)
    res.send({ error: "not found" });
}
