import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const chatbotId = params.id;
  const supabaseAdmin = createAdminClient();

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const { data, error } = await supabaseAdmin
      .from("chatbots")
      .select("is_public")
      .match({ internal_id: chatbotId })
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data)
      return Response.json(
        {
          success: true,
        },
        {
          headers,
          status: 404,
        }
      );

    if (!data.is_public)
      return Response.json(
        {
          success: true,
          visibility: "private",
        },
        {
          headers,
          status: 403,
        }
      );

    return Response.json({ success: true, visibility: "public" }, { headers });
  } catch (err) {
    const errorMessage = (err as Error).message;

    return Response.json(
      {
        success: false,
        message: errorMessage,
      },
      {
        headers,
        status: 500,
      }
    );
  }
}
