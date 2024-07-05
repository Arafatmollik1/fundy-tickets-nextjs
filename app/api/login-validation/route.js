export default async function POST(req, res) {
  const { idToken } = req.body

  res.json(idToken)
}
