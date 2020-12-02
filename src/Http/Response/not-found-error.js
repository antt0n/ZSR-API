/**
 * Send a bad content error
 * @param {any} res
 */
export default (res) => {
    res.status(404)
    res.send({ error: "not found" });
}