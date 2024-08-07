alter table "public"."chatbots" add column "temperature" numeric;

alter table "public"."vectors" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_chat_logs_by_chatbot(chatbot_id uuid)
 RETURNS TABLE(conversation_id text, messages jsonb)
 LANGUAGE sql
AS $function$
  SELECT 
    conversation_id,
    json_agg(
      json_build_object(
        'id', id,
        'created_at', created_at,
        'message', message,
        'role', role,
        'internal_id', internal_id
      ) ORDER BY created_at ASC
    ) AS messages
  FROM 
    public.chat_logs
  WHERE
    chatbot_internal_id = chatbot_id
  GROUP BY 
    conversation_id
  ORDER BY 
    MAX(created_at) DESC;
$function$
;


