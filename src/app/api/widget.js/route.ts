export async function GET(req: Request) {
  const dynamicScript = `console.log('Dynamic script loaded');
  `;

  return new Response(dynamicScript, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
