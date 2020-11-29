/**
 * Send a bad content error
 * @param {any} res
 */
export default (res) => {
    res.status(400)
    res.send({ error: "bad content" });
}