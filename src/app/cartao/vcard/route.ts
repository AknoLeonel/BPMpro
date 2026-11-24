import { buildVCard } from "@/features/card/vcard";

export const dynamic = "force-static";

/** Contato da BPM em vCard 3.0 para o botão "Salvar contato" do cartão digital. */
export function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="bpm-pro.vcf"',
    },
  });
}
