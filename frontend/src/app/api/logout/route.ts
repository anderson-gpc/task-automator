import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (!res.ok) {
      console.error("Backend logout falhou:", await res.text());
      return NextResponse.json(
        { error: "Falha ao fazer logout no servidor" },
        { status: 500 }
      );
    }
    const cookie = cookies();
    (await cookie).delete("access_token");
    return NextResponse.json({status: 200});
  } catch (err) {
    console.error("Erro na rota /api/logout:", err);
    return NextResponse.json(
      { error: "Erro interno no Next.js" },
      { status: 500 }
    );
  }
}
