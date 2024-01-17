export const config = {
  runtime: 'edge',
};

export function get(request: Request) {
  return new Response(`hello`)

}