import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const chatbotId = params.id;
  const supabaseAdmin = createAdminClient();

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
          status: 403,
        }
      );

    return Response.json({ success: true, visibility: "public" });
  } catch (err) {
    const errorMessage = (err as Error).message;

    return Response.json(
      {
        success: false,
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
