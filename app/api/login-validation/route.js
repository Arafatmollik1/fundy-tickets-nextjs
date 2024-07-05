export const POST = async (req) => {
  const { idToken } = await req.json()

  try {
  } catch (error) {
    console.error(error)
  }

  return new Response(JSON.stringify(idToken), {
    status: 201
  })
}
