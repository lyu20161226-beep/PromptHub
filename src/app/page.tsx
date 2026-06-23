import { PromptOSHome } from "@/components/PromptOSHome";
import { prompts } from "../../data/prompts";

export default function HomePage() {
  return (
    <main>
      <PromptOSHome prompts={prompts} />
    </main>
  );
}
