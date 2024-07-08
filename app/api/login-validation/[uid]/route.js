import admin from "@/app/utils/firebase-admin";

export const POST = async (req, { params }) => {

  const { uid } = params;
  const { idToken } = await req.json();

  try {

    const authUser = await admin.auth().verifyIdToken(idToken);

    if (authUser.uid === uid) {

      return new Response(JSON.stringify({ verified: true }), {
        status: 200,
      })

    }

    return new Response(JSON.stringify({ verified: false }), {
      status: 403,
    })

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ verified: false, error: error.message }), {
      status: 400,
    })
  }

}