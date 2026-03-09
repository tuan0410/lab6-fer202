import ChatInterface from "@/components/ChatInterface"
import { supabase } from "@/lib/supabaseClient"

export default async function ChatPage() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <p>Please login first</p>
  }

  return <ChatInterface user={user} />
}