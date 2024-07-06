import admin from "@/app/utils/firebase-admin";


export const POST = async (req, { params }) => {
  const { uid } = params;
  const { idToken } = await req.json()

  try {

    const authUser = await admin.auth().verifyIdToken(idToken);
    if (authUser.uid !== uid) {
      return new Response(JSON.stringify({ error: "User not verified" }), {
        status: 403,
      })
    }

    return new Response(JSON.stringify(authUser.uid === uid), {
      status: 201,
    })

  } catch (error) {
    console.log(error)
  }

}