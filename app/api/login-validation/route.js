import admin from "@/app/utils/firebase-admin";


export const POST = async (req) => {
  const { idToken } = await req.json()

  try {

    const authUser = await admin.auth().verifyIdToken(idToken);

    return new Response(JSON.stringify(authUser), {
      status: 201,
    })

  } catch (error) {
    console.log(error)
  }

}